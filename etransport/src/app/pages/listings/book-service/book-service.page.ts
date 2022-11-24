import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AlertController, IonModal, IonSelectOption, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServiceService } from 'src/app/services/service.service';
import { TransportBookingService } from '../../../services/transport-booking.service';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.page.html',
  styleUrls: ['./book-service.page.scss'],
})

export class BookServicePage implements OnInit {

  constructor(
    private modalController : ModalController,
    private authService : AuthService,
    public serviceService : ServiceService,
    private transporBookingService : TransportBookingService,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private toastController : ToastController,
    private notificationService : NotificationService
  ) { }

  @ViewChild(IonModal) modal: IonModal;

  routeInterfaceOptions = {
    header: 'Routes', 
    subHeader: 'These are all the available routes provided by the service owner.',
    cssClass: 'route-select',
  };

  book_service_form : any = {
    user_customer_id : this.authService.getAuth().user_id,
    service_id: this.serviceService.to_book.service_id,
    passenger_count: null,
    pickup_time: null,
    pickup_location: null,
    dropoff_location: null,
    service_type: [],
    animal_count : null,
    route: null,
    small: null,
    medium : null,
    large: null,
    extra_large: null,
    errors: {},
    submit : async () => {
      console.log(this.book_service_form);
      this.book_service_form.errors = {};
      const loader = await this.loadingController.create({
        message: 'Saving transport booking, please wait.',
        spinner : 'circular',
        backdropDismiss: false
      });
      await loader.present();

      const res = await this.transporBookingService.addBooking(this.book_service_form);

      if(res.status == 422){
        await loader.dismiss();
        this.book_service_form.errors = res.data.errors;
        return;
      }
      if(res.status < 200 || res.status > 299){
        await loader.dismiss();
        const alert = await this.alertController.create({
          header: 'Error saving data',
          message: `${res.status} | ${res.data.message}`,
          buttons: ['Cancel']
        })
        await alert.present();
        return;
      }

      const alert = await this.alertController.create({
        message: "Service booking successfully save, Please wait for the approval or response of the service owner",
        header: 'Booking Successful',
        buttons: ['Ok']
      });

      // send notification
      console.log(res.data);
      
      this.notificationService.addNotification({
        link : `/service-bookings`,
        link_fragment : `booking-${res.data.transport_booking_id}`,
        notification_message : 'Your Door to door service has new booking.',
        notification_title : 'Booking',
        user_id : res.data.user.user_id
      });

      await alert.present();
      await loader.dismiss();
      await alert.onDidDismiss();
      await this.close();
    }
  }

  async confirmLuggageSpecModal(){
    await this.modal.dismiss();
  }

  async closeLuggageSpecModal(){
    await this.modal.dismiss();
  }

  async close(){
    await this.modalController.dismiss();
  }

  ionViewWillEnter(){
    console.log(this.serviceService.to_book);
  }
  
  ngOnInit() {
  }

}
