import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { TransportBookingService } from './transport-booking.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private errorHandlerService : ErrorHandlerService,
    private loadingController : LoadingController,
    private router : Router,
    private transportBookingService : TransportBookingService
  ) { }

  async checkPayment(payment_id){
    const loader = await this.loadingController.create({
      message: "Verifying the payment.",
      spinner: 'circular',
      backdropDismiss: false
    })
    try {
      await loader.present()
      const res = await axios.put(`${environment.apiUrl}/api/payments/check-payment/${payment_id}`);
      this.transportBookingService.transport_bookings.map(async (val, i)=>{
        if(val.transport_booking_id == res.data.transport_booking_id){
          console.log(res);
          await loader.dismiss();
          console.log(this.transportBookingService.transport_bookings[i]);
          this.transportBookingService.transport_bookings[i] = res.data;
          this.router.navigate(['/customer-bookings']); 
        }
      })
      
    } catch (error) {
      console.log('error');
      console.log(error);
      
      await loader.dismiss();
      this.errorHandlerService.handleError(error);
    }
    
  }

  async getPaymentsByServiceId(service_id, data : {status : string}){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/payments/get-payments-by-service-id/${service_id}`, {params: data});
      res.data.data.map((payment, i)=>{
        res.data.data[i].payment_data = JSON.parse(res.data.data[i].payment_data);
        res.data.data[i].breakdown = JSON.parse(res.data.data[i].breakdown);
      })
      
      return res.data;
    } catch (error) {
      console.log('error');
      console.log(error);
      this.errorHandlerService.handleError(error);
    }
    
  }

  async getPaymentsByUserId(
    user_id, 
    data : {
      status : string
      page : number
    }){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/payments/get-payments-by-user-id/${user_id}`, {params: data});
      res.data.data.map((payment, i)=>{
        res.data.data[i].payment_data = JSON.parse(res.data.data[i].payment_data);
        res.data.data[i].breakdown = JSON.parse(res.data.data[i].breakdown);
      })
      
      return res.data;
    } catch (error) {
      console.log('error');
      console.log(error);
      this.errorHandlerService.handleError(error);
    }
    
  }

  async computeIncome(
    user_id, month,year){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/payments/compute-income/${user_id}`, {params: {month, year}});      
      return res.data;
    } catch (error) {
      console.log('error');
      console.log(error);
      this.errorHandlerService.handleError(error);
    }
    
  }

}
