import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, IonItemOptions, IonItemSliding, ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-booking-transfers',
  templateUrl: './booking-transfers.page.html',
  styleUrls: ['./booking-transfers.page.scss'],
})
export class BookingTransfersPage implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private alertController : AlertController
  ) { }

  @ViewChildren('ionItemSliding') ionItemSliding : IonItemSliding[];
  transferedBookings : any[] = [];
  filteredTransfer : string = 'request';
  loading : boolean = false;

  async ngOnInit() {
    await this.serviceService.fetchServiceByUserId();
    this.filter();
  }

  async filter(){
    this.loading = true;
    console.log(this.filteredTransfer);
    if(this.filteredTransfer == 'request'){
      this.transferedBookings = await this.serviceService.getBookingTransferRequest(this.serviceService.service.service_id);
    }
    else {
      this.transferedBookings = await this.serviceService.getBookingTransfersByService(this.serviceService.service.service_id);
    }
    console.log(this.transferedBookings);    
    this.loading = false;
  }

  openOptions(ionItemSliding : string){
    this.ionItemSliding.map((item : any) => {
      // item.closeOpened();
      console.log(item.el.id)
      if(item.el.id == ionItemSliding){
        item.open('end')
      }
    })
    console.log(ionItemSliding);
    
  }

  async acceptTransfer(transfered_booking){
    console.log(transfered_booking);
    const alert = await this.alertController.create({
      header: 'Confirm Action',
      message: 'Are you sure you want to accept this transfer?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Accept',
          handler : async ()=> {
            await this.serviceService.acceptTransfer(
              transfered_booking.transfered_booking_id, 
              transfered_booking.from_service.administrator.user_id, 
              transfered_booking.transport_booking_id, 
              transfered_booking.transport_booking.user_customer_id
            );
          }
        }
      ]
    });

    await alert.present();
    
  }

  async declineTransfer(transfered_booking){
    console.log(transfered_booking);
    const alert = await this.alertController.create({
      header: 'Confirm Action',
      message: 'Are you sure you want to decline this transfer?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Decline',
          handler : async ()=> {
            await this.serviceService.declineTransfer(
              transfered_booking.transfered_booking_id, 
              transfered_booking.from_service.administrator.user_id, 
              transfered_booking.transport_booking_id
            );
          }
        }
      ]
    });

    await alert.present();
    
  }
}
