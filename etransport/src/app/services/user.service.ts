import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

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

  constructor(
    private router : Router,
    private authService : AuthService
  ) { }

  user = JSON.parse(localStorage.getItem('user'));

  async isVerified(user_id){

    const res = this.authService.getAuth();
    console.log(res)
    
    if(!res.email_verified_at){
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
    this.user = JSON.parse(localStorage.getItem('user'));
    const data = {
      verification_code
    }
    const res = await axios.post(`${environment.apiUrl}/api/users/verify-email/${this.user.user_id}`, data)
    .then(res => res)
    .catch(err => err.response)
    return res;
  }

  logout(){
    localStorage.clear()
  }

}
