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

  user = JSON.parse(localStorage.getItem('user'));

  async isVerified(user_id){
    const res = await axios.get(`${environment.apiUrl}/api/users/isVerified/${user_id}`)
    .then(res => res)
    .catch(res => res.response)

    console.log(res)
    
    if(res.status != 200){
      return false;
    }

    if(!res.data.email_verified_at){
      console.log('sa')
      return false;
    }

    return true;
  }

  async signup(data : SignupData){
    const res = await axios.post(`${environment.apiUrl}/api/users/signup`, data)
    .then(res => res)
    .catch(err => err.response)
    console.log(res)
    return res;
  }

  async resendVerificationEmail(user_id){
    const res = await axios.post(`${environment.apiUrl}/api/emails/resend-verification-code/${user_id}`)
    .then(res => res)
    .catch(err => err.response)
    return res;
  }

  async verifyEmail(verification_code){
    const data = {
      verification_code
    }
    const res = await axios.post(`${environment.apiUrl}/api/users/verify-email/${this.user.user_id}`, data)
    .then(res => res)
    .catch(err => err.response)
    return res;
  }
}
