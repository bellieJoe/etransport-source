import { Injectable } from '@angular/core';
import axios, { Axios, AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';

// axios.defaults.withCredentials = true;

class LoginData {
    email: string
    password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(

  ) { }

  isAuth() : boolean {
    const user = localStorage.getItem('user')
    return user ? true : false;
  }

  async login(data: LoginData) : Promise<any> {
    const res = await axios.post(`${environment.apiUrl}/api/users/login`, data)
    .then(res => res)
    .catch(err => err.response)
    return res;
  }
}
