import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  constructor(
    private paymentService : PaymentService,
    private serviceService : ServiceService,
    private authService : AuthService
  ) { }

  payments : any = {};
  filteredPayment : string = 'all';
  loading : boolean = false;
  page  : number = 1;

  async ngOnInit() {
    await this.getPayments();
  }

  async loadMore(ev){
    const payments : any = await this.paymentService.getPaymentsByUserId(
      this.authService.getAuth().user_id, 
      {
        status: this.filteredPayment,
        page: this.page
      }
    );
    payments.data.map((payment, i)=>{
      this.payments.data.push(payment);
    });
    this.page++;
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  async doRefresh(ev){
    await this.getPayments();
    ev.target.complete();
  }


  async getPayments(){ 
    this.loading = true;
    this.page = 1;
    this.payments = await this.paymentService.getPaymentsByUserId(
      this.authService.getAuth().user_id, 
      {
        status: this.filteredPayment,
        page: this.page
      }
    );
    this.page++;
    this.loading = false;
  }

}
