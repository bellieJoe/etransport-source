import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

  constructor(
    private router : Router,
    private serviceService : ServiceService,
    private loadingController : LoadingController
  ) { }

  navState : any;
  booking: any;
  serviceKey : any = '';
  transferToService : any;

  ngOnInit() {
    if(!this.router.getCurrentNavigation().extras.state ){
      location.href = "/service-bookings";
    }
    this.navState = this.router.getCurrentNavigation().extras.state;
    this.booking = this.navState.booking;
    console.log(this.navState.booking);
    
  }

  async setService(){
    const loader = await this.loadingController.create({
      spinner: 'circular',
      message: 'Searching for service.',
      backdropDismiss: false
    });
    await loader.present();
    const service = await this.serviceService.getServiceByServiceKey(this.serviceKey);
    await loader.dismiss();
    if(service) {
      this.transferToService = service;
    }
    console.log(service);
    
  }

 async transfer(){
  await this.serviceService.transfer({
    from_service_id : this.serviceService.service.service_id,
    service_id: this.transferToService.service_id,
    transport_booking_id: this.booking.transport_booking_id,
    user_administrator_id: this.transferToService.administrator.user.user_id
  });
  location.href = '/service-bookings';
 }

}
