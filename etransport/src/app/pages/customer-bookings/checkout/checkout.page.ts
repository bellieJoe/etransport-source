import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(
    private router : Router,
    public paymentService : PaymentService
  ) { }

  navState : any;
  transport_booking: any;

  async ngOnInit() {
    if(!this.router.getCurrentNavigation().extras.state){
      location.href = "/customer-bookings";
    }
    this.navState = this.router.getCurrentNavigation().extras.state;
    console.log(this.navState);
    this.transport_booking = this.navState.transport_booking;
    if(typeof(this.transport_booking.payment.payment_data) == typeof('string')){
      this.transport_booking.payment.payment_data =  JSON.parse(this.transport_booking.payment.payment_data);
    }
    if(typeof(this.transport_booking.payment.breakdown ) == typeof('string')){
      this.transport_booking.payment.breakdown = JSON.parse(this.transport_booking.payment.breakdown);
    }
    
  }

  ionViewDidLeave(){
    this.navState = {};
    this.transport_booking = {};
  }

  async pay(transport_booking){
    this.router.navigate(['/customer-bookings/pay'], {
      state : {
        transport_booking
      }
    })
  }

}
