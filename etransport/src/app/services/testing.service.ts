import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

axios.defaults.withCredentials = true;


@Injectable({
  providedIn: 'root'
})
export class TestingService {
  apiUrl = environment.apiUrl;

  constructor() { }

  test(){
    axios.get(`${this.apiUrl}/sanctum/csrf-cookie`).then(() => {
      axios.get(`${this.apiUrl}/api/token`).then((response)=>{
        console.log(response)
      })
    })
    // axios.get(`${this.apiUrl}/api/token`).then((response)=>{
    //   console.log(response)
    // })
  }
}
