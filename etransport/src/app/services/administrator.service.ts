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
export class AdministratorService {

  constructor() { }

  async getServiceByUserId(user_id){
    const res = await axios.get(`${environment.apiUrl}/api/administrators/get-service-by-user-id/${user_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }
}
