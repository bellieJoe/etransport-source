import { AfterViewChecked, AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServiceService } from 'src/app/services/service.service';
import { TransportBookingService, UpdateStatusData } from '../../services/transport-booking.service';

@Component({
  selector: 'app-service-bookings',
  templateUrl: './service-bookings.page.html',
  styleUrls: ['./service-bookings.page.scss'],
})
export class ServiceBookingsPage implements OnInit {

  constructor(
    public transportBookingService : TransportBookingService,
    private authService : AuthService,
    private alertController : AlertController,
    public serviceService : ServiceService,
    private loadingController : LoadingController,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private notificationService : NotificationService
  ) { }

  @ViewChildren(IonModal) ionModals : QueryList<IonModal>;

  filteredBooking : string = 'all';
  isLoading : boolean = false;
  transport = [];
  msg_from_admin: null;

  async ngOnInit() {
    this.isLoading = true;
    await this.serviceService.fetchServiceByUserId();
    await this.fetchBookings();
    this.isLoading = false;
    this.transport = this.transportBookingService.transport_bookings;
    const fragment : string = await new Promise((resolve, reject) =>{
      this.activatedRoute.fragment.subscribe(fragment => {
        resolve(fragment);
      })
    });
    location.hash = ""
     setTimeout((fr = fragment) => {
      location.hash = fr
    }, 1000);
    
  
  }

  closeModals(){
    this.ionModals.map(async (ionModal : IonModal) => {
      await ionModal.dismiss();
    });
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

  async fetchBookings(){
    const res = await this.transportBookingService.getByServiceId(this.serviceService.service.service_id)
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

  async acceptBooking(transport_booking_id: any){
    
    const confirmHandler = async () => {
      const loader = await this.loadingController.create({
        backdropDismiss: false,
        message: "Accepting booking.",
        spinner: "circular"
      });
      await loader.present();
      const data : UpdateStatusData = {
        booking_status: 'to pay',
        message: 'Service booking has been approved.',
        transport_booking_id: transport_booking_id,
        msg_frm_customer: null,
        msg_frm_admin: this.msg_from_admin,
      };
      const res = await this.transportBookingService.updateStatus(data);
      
      if(res.status != 200){
        const alert = await this.alertController.create({
          header: `Unexpected Error`,
          message: `${ res.status } | ${ res.data.message }`,
          buttons: ["Ok"]
        });
        await loader.dismiss();
        await alert.present();
        this.msg_from_admin = null;
        return;
      }
      this.transportBookingService.transport_bookings.every((val, i)=>{
        if(val.transport_booking_id == res.data.transport_booking_id){
          this.transportBookingService.transport_bookings[i] = res.data;
          return false;
        }
        return true;
      });
      await this.notificationService.addNotification({
        link : `/customer-bookings`,
        link_fragment : `booking-${res.data.transport_booking_id}`,
        notification_message : 'Your booking has been approved.',
        notification_title : 'Booking Update',
        user_id : res.data.user_customer_id
      });
      this.msg_from_admin = null;
      await loader.dismiss();
      this.msg_from_admin = null;
    }

    const alert = await this.alertController.create({
      header: 'Confirm action',
      message: 'Are you sure you want to accept this booking?',
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

  async declineBooking(transport_booking_id: any){
    this.msg_from_admin = null;
    const confirmHandler = async () => {
      const loader = await this.loadingController.create({
        backdropDismiss: false,
        message: "Declining booking.",
        spinner: "circular"
      });
      await loader.present();

      const data : UpdateStatusData = {
        booking_status: 'declined',
        message: 'Service booking has been declined.',
        transport_booking_id: transport_booking_id,
        msg_frm_admin: this.msg_from_admin,
        msg_frm_customer: null
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
        this.msg_from_admin = null;
        return;
      }

      this.transportBookingService.transport_bookings.every((val, i)=>{
        if(val.transport_booking_id == res.data.transport_booking_id){
          this.transportBookingService.transport_bookings[i] = res.data;
          return false;
        }
        return true;
      })
      await this.notificationService.addNotification({
        link : `/customer-bookings`,
        link_fragment : `booking-${res.data.transport_booking_id}`,
        notification_message : 'Your booking has been declined.',
        notification_title : 'Booking Update',
        user_id : res.data.user_customer_id
      });
      await loader.dismiss();
      this.msg_from_admin = null;
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

  async finishBooking(transport_booking_id : any){
    const confirmHandler = async () => {
      const loader = await this.loadingController.create({
        backdropDismiss: false,
        message: "Updating booking status.",
        spinner: "circular"
      });
      await loader.present();
      const data : UpdateStatusData = {
        booking_status: 'finished',
        message: 'Service booking has been marked as finished.',
        transport_booking_id: transport_booking_id,
        msg_frm_admin: null,
        msg_frm_customer: null
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
        this.msg_from_admin = null;
        return;
      }
      this.transportBookingService.transport_bookings.every((val, i)=>{
        if(val.transport_booking_id == res.data.transport_booking_id){
          this.transportBookingService.transport_bookings[i] = res.data;
          return false;
        }
        return true;
      })
      await this.notificationService.addNotification({
        link : `/customer-bookings`,
        link_fragment : `booking-${res.data.transport_booking_id}`,
        notification_message : 'Your booking has been completed.',
        notification_title : 'Booking Update',
        user_id : res.data.user_customer_id
      });
      await loader.dismiss();
      this.msg_from_admin = null;
    }

    const alert = await this.alertController.create({
      header: "Confirm action",
      message: "This booking will now be mark as finished. Please make sure that you have already received the remaining payment for this booking.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: "Proceed",
          role: 'ok',
          handler: confirmHandler
        }
      ]
    })
    await alert.present();
  }

  async cancelBooking(transport_booking_id: any){
    this.msg_from_admin = null;
    const confirmHandler = async () => {
      const loader = await this.loadingController.create({
        backdropDismiss: false,
        message: "Cancelling booking.",
        spinner: "circular"
      });
      await loader.present();
      const data : UpdateStatusData = {
        booking_status: 'canceled',
        message: 'Service booking has been canceled by the administrator.',
        transport_booking_id: transport_booking_id,
        msg_frm_admin: this.msg_from_admin,
        msg_frm_customer: null
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
        this.msg_from_admin = null;
        return;
      }
      this.transportBookingService.transport_bookings.every((val, i)=>{
        if(val.transport_booking_id == res.data.transport_booking_id){
          this.transportBookingService.transport_bookings[i] = res.data;
          return false;
        }
        return true;
      });
      await this.notificationService.addNotification({
        link : `/customer-bookings`,
        link_fragment : `booking-${res.data.transport_booking_id}`,
        notification_message : 'Your booking has been canceled.',
        notification_title : 'Booking Update',
        user_id : res.data.user_customer_id
      });
      await loader.dismiss();
      this.msg_from_admin = null;
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

  async viewMessages(serviceBooking){
    this.router.navigate(['/messages'], {
      state : {
        serviceBooking,
        receiver : serviceBooking.user_customer_id
      }
    })
  }
}
