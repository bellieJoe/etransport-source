import { ErrorHandler, Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import axios from "axios";
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';


@Injectable({
  providedIn: 'root'
})
export class TransportBookingService {

  constructor(
    private errorHandler : ErrorHandlerService,
    private loadingController : LoadingController,
    private toastController : ToastController,
    private notificationService : NotificationService,
    private authService : AuthService
  ) { }

  transport_bookings : any[] = [];
  customer_schedule : any[] = [];

  async addBooking(data: AddBookingFormData){
    const res = await axios.post(`${environment.apiUrl}/api/transport-bookings`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async updateStatus(data: UpdateStatusData){
    const res = await axios.post(`${environment.apiUrl}/api/transport-bookings/update-status/${data.transport_booking_id}`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async getCustomerSchedule(){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/transport-bookings/get-customer-schedule/${this.authService.getAuth().user_id}`);
      this.customer_schedule = res.data;
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async getByUserCustomerId(user_customer_id: any){
    const res = await axios.get(`${environment.apiUrl}/api/transport-bookings/get-by-user-customer-id/${user_customer_id}`)
    .then(res => res)
    .catch(err => err.response);
    // console.log(res)
    return res;
  }

  async getByServiceId(service_id: any){
    const res = await axios.get(`${environment.apiUrl}/api/transport-bookings/get-by-service-id/${service_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async requestRefund(transport_booking : any){
    const loader = await this.loadingController.create({
      message: 'Processing refund request',
      backdropDismiss: false,
      spinner: 'circular'
    });
    try {
      await loader.present();
      const res = await axios.post(`${environment.apiUrl}/api/transport-bookings/request-refund/${transport_booking.transport_booking_id}`);
      const toast = await this.toastController.create({
        message: 'A refund request has been submitted',
        duration: 1000
      });
      await loader.dismiss();
      await toast.present();
      this.notificationService.addNotification({
        link: '/administrator-refunds',
        link_fragment: `refund-${res.data.refund_id}`,
        notification_message: `You have a new refund request from a booking with ${this.authService.getAuth().name}`,
        notification_title: 'Refund Request',
        user_id: transport_booking.service.administrator.user_id
      });
    } catch (error) {
      await loader.dismiss();
      this.errorHandler.handleError(error);
    }
    
  }
}

class AddBookingFormData{
  user_customer_id : any
  service_id: any
  passenger_count: number
  pickup_time: string
  pickup_location: string
  dropoff_location: string
  animal_count  : number
  service_type: string
  route: string
  small: number
  medium : number
  large: number
  extra_large: number
}

export class UpdateStatusData{
  transport_booking_id : any
  booking_status: string
  message: string
  msg_frm_customer? : string
  msg_frm_admin? : string
}
