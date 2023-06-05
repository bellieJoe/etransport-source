import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/helpers/error-handler.service';
import { AdministratorService } from 'src/app/services/administrator.service';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  constructor(
    private administratorService : AdministratorService,
    private paymentService : PaymentService,
    private authService : AuthService,
    private errorHandler : ErrorHandlerService
  ) { }

  reservationCounts : any = {};
  incomes : any = {};
  income: any = 0;
  reviews : any = {};

  loading : boolean = false;
  years : any[] = [];
  months : any[] = [
    {
      value : 1,
      name : "January"
    },
    {
      value : 2,
      name : "February"
    },
    {
      value : 3,
      name : "March"
    },
    {
      value : 4,
      name : "April"
    },
    {
      value : 5,
      name : "May"
    },
    {
      value : 6,
      name : "June"
    },
    {
      value : 7,
      name : "July"
    },
    {
      value : 8,
      name : "August"
    },
    {
      value : 9,
      name : "September"
    },
    {
      value : 10,
      name : "October"
    },
    {
      value : 11,
      name : "November"
    },
    {
      value : 12,
      name : "December"
    },
  ]
  year : any = 2023;
  month : any = '01';


  async ngOnInit() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.years = [];
    for(let i = 2022; i<=this.year; i++){
      this.years.push(i);
    }
    this.loading = true;
    try {
      let res = await this.administratorService.getReservationCounts();
      this.reservationCounts = res.data;
      res = await this.administratorService.getIncomeReport(this.month, this.year);
      this.incomes = res.data
      console.log(this.incomes)
      res = await this.paymentService.computeIncome(this.authService.getAuth().user_id, this.month, this.year);
      this.income = res;
      console.log(this.income)
      res = await this.administratorService.getReviews();
      this.reviews = res.data;
      console.log(this.reviews);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.errorHandler.handleError(error);
    }
  }

}
