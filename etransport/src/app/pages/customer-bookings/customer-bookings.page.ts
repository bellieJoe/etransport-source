import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
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
  ) { }

  @ViewChildren(IonModal) ionModals: QueryList<IonModal>;

  filteredBooking : string = 'all'
  isLoading : boolean = false;
  transport = [];
  msg_from_customer = null;


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
    // console.log(this.transportBookingService.transport_bookings[0].service.service_name)
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.fetchBookings();
    this.isLoading = false;
    this.transport = this.transportBookingService.transport_bookings
    console.log(this.transportBookingService.transport_bookings)
  }

}
