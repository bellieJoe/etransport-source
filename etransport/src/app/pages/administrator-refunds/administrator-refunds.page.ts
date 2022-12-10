import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RefundsService } from 'src/app/services/refunds.service';

@Component({
  selector: 'app-administrator-refunds',
  templateUrl: './administrator-refunds.page.html',
  styleUrls: ['./administrator-refunds.page.scss'],
})
export class AdministratorRefundsPage implements OnInit {

  constructor(
    private refundsService : RefundsService,
    private authService : AuthService,
    private alertController : AlertController
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
    const res = await this.refundsService.getRefundsByUserAdministratorId(user_id);
    this.refunds = [];
    res.map((refund) => {
      refund.payment.payment_data = JSON.parse( refund.payment.payment_data);
      refund.payment.breakdown = JSON.parse( refund.payment.breakdown);
      console.log(refund);
      this.refunds.push(refund);
    })
    this.loading = false;
  }

  async approverefund(refund){
    const alert = await this.alertController.create({
      header: 'Confirm action',
      message: 'Approve this refund request?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Approve',
          handler: async () => {
            const res = await this.refundsService.approveRefund(refund);
            if(res){
              this.refunds.map((refund, i) => {
                if(refund.refund_id == res.refund_id){
                  res.payment.payment_data = JSON.parse(res.payment.payment_data)
                  res.payment.breakdown = JSON.parse(res.payment.breakdown)
                  this.refunds[i] = res;
                }
              })
            }
          }
        }
      ]
    })
    await alert.present();
    
  }

  async disapproverefund(refund){
    const alert = await this.alertController.create({
      header: 'Confirm action',
      message: 'Disapprove this refund request?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Disapprove',
          handler: async () => {
            const res = await this.refundsService.disapproveRefund(refund);
            if(res){
              this.refunds.map((refund, i) => {
                if(refund.refund_id == res.refund_id){
                  res.payment.payment_data = JSON.parse(res.payment.payment_data)
                  res.payment.breakdown = JSON.parse(res.payment.breakdown)
                  this.refunds[i] = res;
                }
              })
            }
          }
        }
      ]
    })
    await alert.present();
    
  }

}
