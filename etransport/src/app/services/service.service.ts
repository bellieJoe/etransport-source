import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from "axios";
import { setErrorHandler } from 'ionicons/dist/types/stencil-public-runtime';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private authService : AuthService,
    private alertController : AlertController
  ) { }

  // states
  public to_book : any = {};
  public service : any = {};
  public services : any = [];
  public listings : any = [];

  async fetchServiceByUserId(){
    const res = await this.getServiceByUserID(this.authService.getAuth().user_id);
    if(res.status != 200){
      const alert = await this.alertController.create({
        message: `${res.status} | ${res.data.message}`,
        header: 'Error fetching the data',
        buttons: ['Ok']
      });
      await alert.present();
      return;
    }

    this.service = res.data;
    this.service.service_type = JSON.parse(this.service.service_type)
  }

  async addService(data: AddServiceData){
    const res = await axios.post(`${environment.apiUrl}/api/services`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async getServiceByUserID(user_id){
    const res = await axios.get(`${environment.apiUrl}/api/services/get-service-by-user-id/${user_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async deleteByID(service_id){
    const res = await axios.delete(`${environment.apiUrl}/api/services/${service_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async editService(data : EditServiceData){
    const res = await axios.put(`${environment.apiUrl}/api/services/${data.service_id}`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async setStatus(service_id, data : SetStatusData){
    const res = await axios.patch(`${environment.apiUrl}/api/services/set-status/${service_id}`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async getListingsByUserCustomerId(user_customer_id :any){
    const res = await axios.get(`${environment.apiUrl}/api/services/listings/${user_customer_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  isServiceTypeHasLuggage(service_type : any[]){
    let result = false;
    service_type.map((val, i)=>{
      if(val == 'luggage'){
        result = true;
      }
    });
    return result;
  }

  isServiceTypeHas(service_type : any, service_types : any[]){
    let result = false;
    service_types.map((val, i)=>{
      if(val == service_type){
        result = true;
      }
    })
    return result;
  }

}

class AddServiceData {
  user_id : any
  driver: string
  service_name : string
  license_number : string
  plate_number : string
  vehicle_model : string
  capacity : string
  mode_of_payment : any
  gcash_account : string
  service_type : any
  small: number
  medium: number
  large: number
  extra_large: number
}

class EditServiceData {
  service_id: any
  gcash_account : string
  driver: string
  service_name : string
  license_number : string
  plate_number : string
  vehicle_model : string
  capacity : string
  mode_of_payment : any
  service_type : any
  small: number
  medium: number
  large: number
  extra_large: number
}

class SetStatusData {
  service_status: string
  marinduque_departure_datetime : string
  manila_departure_datetime : string
}
