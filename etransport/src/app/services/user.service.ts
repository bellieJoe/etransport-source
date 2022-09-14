import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

/* form data structure */
class SignupData {
  name : string
  username : string
  email : string
  contact_number : string
  password : string
  password_confirmation : string
  role_id : number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async signup(data : SignupData){
    const res = await axios.post(`${environment.apiUrl}/api/users/signup`, data)
    .then(res => res)
    .catch(err => err.response)
    console.log(res)
    return res;
  }
}
