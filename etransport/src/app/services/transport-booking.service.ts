import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';


@Injectable({
  providedIn: 'root'
})
export class TransportBookingService {

  constructor() { }

  transport_bookings : any[] = [];

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
