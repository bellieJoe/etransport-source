import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

class AddServiceData {
  user_id : any
  driver: string
  service_name : string
  license_number : string
  plate_number : string
  vehicle_model : string
  capacity : string
  mode_of_payment : string
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  public services : any = [];

  async addService(data: AddServiceData){
    const res = await axios.post(`${environment.apiUrl}/api/services`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async getServicesByUserID(user_id){
    const res = await axios.get(`${environment.apiUrl}/api/services/get-by-user-id/${user_id}`)
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

}
