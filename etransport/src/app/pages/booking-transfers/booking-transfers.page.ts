import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-booking-transfers',
  templateUrl: './booking-transfers.page.html',
  styleUrls: ['./booking-transfers.page.scss'],
})
export class BookingTransfersPage implements OnInit {

  constructor(
    private serviceService : ServiceService
  ) { }

  transferedBookings : any[] = [];
  filteredTransfer : string = 'request';
  loading : boolean = false;

  ngOnInit() {
    this.serviceService.fetchServiceByUserId();
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
}
