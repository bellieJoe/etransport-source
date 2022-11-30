import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-payment-monitoring',
  templateUrl: './payment-monitoring.page.html',
  styleUrls: ['./payment-monitoring.page.scss'],
})
export class PaymentMonitoringPage implements OnInit {

  constructor(
    private paymentService : PaymentService,
    private serviceService : ServiceService,
    private authService : AuthService
  ) { }

  payments : any = {};
  filteredPayment : string = 'all';
  loading : boolean = false;

  async ngOnInit() {
    await this.getPayments();
  }


  async getPayments(){
    console.log(this.filteredPayment);   
    this.loading = true;
    await this.serviceService.fetchServiceByUserId();
    this.payments = await this.paymentService.getPaymentsByServiceId(
      this.serviceService.service.service_id, 
      {
        status: this.filteredPayment
      }
    );
    console.log(this.payments);
    this.loading = false;
  }


}
