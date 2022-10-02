import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { TransportBookingService } from '../services/transport-booking.service';

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
    public serviceService : ServiceService
  ) { }

  filteredBooking : string = 'all'
  isLoading : boolean = false;
  transport = [];

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
    console.log(this.transportBookingService.transport_bookings[0].service.service_name)
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.serviceService.fetchServiceByUserId();
    await this.fetchBookings();
    this.isLoading = false;
    this.transport = this.transportBookingService.transport_bookings
    console.log(this.transportBookingService.transport_bookings)
  }

}
