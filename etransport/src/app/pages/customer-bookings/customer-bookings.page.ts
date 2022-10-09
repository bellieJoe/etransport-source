import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { TransportBookingService, UpdateStatusData } from '../../services/transport-booking.service';

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.page.html',
  styleUrls: ['./customer-bookings.page.scss'],
})
export class CustomerBookingsPage implements OnInit {

  constructor(
    public transportBookingService : TransportBookingService,
    private authService : AuthService,
    private alertController : AlertController,
    private loadingController : LoadingController,
    private reviewService : ReviewService
  ) { }

  @ViewChildren(IonModal) ionModals: QueryList<IonModal>;

  filteredBooking : string = 'all'
  isLoading : boolean = false;
  transport = [];
  msg_from_customer = null;
  ratings : any = {
    rate: 0,
    content: null,
    user_customer_id : this.authService.getAuth().user_id,
    service_id: null,
    errors : {},
    setRating: (value : number) => {
      this.ratings.rate = value;
    },
    clearInputs : () => {
      this.ratings.content = null;
      this.ratings.rate = 0;
    },
    submit : async(service_id : any) => {
      this.ratings.errors = {};
      this.ratings.service_id = service_id;
      const loader = await this.loadingController.create({
        message: "Submitting ratings & reviews.",
        spinner : 'circular',
        backdropDismiss: false
      });
      this.closeModals();
      await loader.present();

      const res = await this.reviewService.addReview(this.ratings)
      if(res.status == 422){
        this.ratings.errors = res.data.errors;
        await loader.dismiss();
        return;
      }
      if(res.status != 200){
        const alert = await this.alertController.create({
          header: "Unexpected Error",
          message: `${ res.status } | ${ res.data.message }`,
          buttons: ['Ok']
        });
        await alert.present();
        await loader.dismiss();
        return;
      }
      await loader.dismiss();
      this.ratings.clearInputs();
    },
    init : (booking) => {
      this.ratings.clearInputs();
      booking.service.reviews.map(review => {
        if(review.user_customer_id == this.authService.getAuth().user_id){
          this.ratings.rate = review.rate;
          this.ratings.content = review.content;
        }
      })
    }
  }

  setBookingStatusColor(status : string){
    if(status == 'accepted' || status == 'finished'){
      return "success";
    }
    if(status == "declined"){
      return "danger"
    }
    return "medium";
  }

  closeModals(){
    this.ionModals.map(async (ionModal : IonModal) => {
      await ionModal.dismiss();
    });
  }

  async cancelBooking(transport_booking_id: any){
    const confirmHandler = async () => {
      const loader = await this.loadingController.create({
        backdropDismiss: false,
        message: "Accepting booking.",
        spinner: "circular"
      });
      await loader.present();
      const data : UpdateStatusData = {
        booking_status: 'canceled',
        message: 'Service booking has been canceled by the customer.',
        transport_booking_id: transport_booking_id,
        msg_frm_admin: null,
        msg_frm_customer: this.msg_from_customer
      };
      const res = await this.transportBookingService.updateStatus(data)
      if(res.status != 200){
        const alert = await this.alertController.create({
          header: `Unexpected Error`,
          message: `${ res.status } | ${ res.data.message }`,
          buttons: ["Ok"]
        });
        await loader.dismiss();
        await alert.present();
        this.msg_from_customer = null;
        return;
      }
      this.transportBookingService.transport_bookings.every((val, i)=>{
        if(val.transport_booking_id == res.data.transport_booking_id){
          this.transportBookingService.transport_bookings[i] = res.data;
          return false;
        }
        return true;
      })
      await loader.dismiss();
      this.msg_from_customer = null;
  }

    const alert = await this.alertController.create({
      header: 'Confirm action',
      message: 'Are you sure you want to decline this booking?',
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Ok",
          role: 'ok',
          handler: confirmHandler
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
    this.closeModals();
  }

  async fetchBookings(){
    const res = await this.transportBookingService.getByUserCustomerId(this.authService.getAuth().user_id)
    if(res.status != 200){
      const alert = await this.alertController.create({
        header: `Unable to fetch bookings`,
        message: `${res.status} | ${res.data.message}`,
        buttons: ['Ok']
      })
      alert.present();
      return;
    }
    this.transportBookingService.transport_bookings = res.data;
  }

  hasReviewed(transport_booking : any) : boolean{
    let user_id = this.authService.getAuth().user_id;
    for(let i = 0; i<transport_booking.service.reviews.length; i++){
      if (transport_booking.service.reviews[i].user_customer_id == user_id) {
        return true;
      }
    }
    return false;
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.fetchBookings();
    this.isLoading = false;
    this.transport = this.transportBookingService.transport_bookings;
    console.log(this.transportBookingService.transport_bookings)
  }

}
