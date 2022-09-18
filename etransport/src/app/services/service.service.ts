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

  async editService(data : EditServiceData){
    const res = await axios.put(`${environment.apiUrl}/api/services/${data.service_id}`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async setStatus(service_id, service_status){
    const res = await axios.patch(`${environment.apiUrl}/api/services/set-status/${service_id}`, {service_status})
    .then(res => res)
    .catch(err => err.response);
    return res;
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
  mode_of_payment : string
  fare : number
  load_type : string
}

class EditServiceData {
  service_id : any
  driver: string
  service_name : string
  license_number : string
  plate_number : string
  vehicle_model : string
  capacity : string
  mode_of_payment : string
  fare : number
  load_type : string
}
