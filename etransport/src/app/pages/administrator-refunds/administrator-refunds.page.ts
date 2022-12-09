import { Component, OnInit } from '@angular/core';
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
    private authService : AuthService
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
    this.refunds = await this.refundsService.getRefundsByUserAdministratorId(user_id);
    this.loading = false;
  }

}
