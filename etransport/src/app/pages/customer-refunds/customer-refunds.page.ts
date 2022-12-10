import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RefundsService } from 'src/app/services/refunds.service';

@Component({
  selector: 'app-customer-refunds',
  templateUrl: './customer-refunds.page.html',
  styleUrls: ['./customer-refunds.page.scss'],
})
export class CustomerRefundsPage implements OnInit {

  constructor(
    private authService : AuthService,
    private refundsService : RefundsService
  ) { }

  loading : boolean = false;
  refunds : any[] = [];  

  async ngOnInit() {
    await this.getRefunds();
    console.log(this.refunds);
  }

  async getRefunds(){
    this.loading = true;
    const user_id = await this.authService.getAuth().user_id;
    const res = await this.refundsService.getRefundsByUserCustomerId(user_id);
    this.refunds = [];
    res.map((refund) => {
      refund.payment.payment_data = JSON.parse( refund.payment.payment_data);
      refund.payment.breakdown = JSON.parse( refund.payment.breakdown);
      console.log(refund);
      this.refunds.push(refund);
    })
    this.loading = false;
  }
}
