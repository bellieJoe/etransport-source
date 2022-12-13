import { Component, OnInit } from '@angular/core';
import { TransportBookingService } from 'src/app/services/transport-booking.service';

@Component({
  selector: 'app-customer-schedule',
  templateUrl: './customer-schedule.page.html',
  styleUrls: ['./customer-schedule.page.scss'],
})
export class CustomerSchedulePage implements OnInit {

  constructor(
    public transportBookingService : TransportBookingService
  ) { }

  ngOnInit() {
    this.transportBookingService.getCustomerSchedule();
  }

}
