import { ErrorHandler, Injectable } from '@angular/core';
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

class UpdateProfileData {
  name : string
  username : string
  contact_number : string
  user_id : string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router : Router,
    private authService : AuthService,
    private errorHandler : ErrorHandler,
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

  async updateProfile(data : UpdateProfileData){
    const res = await axios.post(`${environment.apiUrl}/api/users/update-profile/${data.user_id}`, data)
    .then(res => res)
    .catch(err => err.response)
    return res;
  }

  async getUserByUserId(user_id){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/users/${user_id}`);
      return res.data;
    } catch (error) {
      this.errorHandler.handleError(error)
    }
    
  }

  logout(){
    localStorage.clear()
  }

}


