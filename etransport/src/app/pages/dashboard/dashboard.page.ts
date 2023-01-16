import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/helpers/error-handler.service';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  constructor(
    private administratorService : AdministratorService,
    private errorHandler : ErrorHandlerService
  ) { }

  loading : boolean = false;
  reservationCounts : any = {};


  async ngOnInit() {
    this.loading = true;
    try {
      let res = await this.administratorService.getReservationCounts();
      console.log(res.data)
      this.reservationCounts = res.data;
    } catch (error) {
      this.loading = false;
      this.errorHandler.handleError(error);
    }
  }

}
