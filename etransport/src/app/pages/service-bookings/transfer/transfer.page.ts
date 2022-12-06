import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

  constructor(
    private router : Router
  ) { }

  navState : any;
  booking: any;

  ngOnInit() {
    if(!this.router.getCurrentNavigation().extras.state ){
      location.href = "/service-bookings";
    }
    this.navState = this.router.getCurrentNavigation().extras.state;
    this.booking = this.navState.booking;
    console.log(this.navState.booking);
    
  }

}
