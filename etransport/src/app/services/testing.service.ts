import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';


axios.defaults.withCredentials = true;


@Injectable({
  providedIn: 'root'
})
export class TestingService {
  apiUrl = environment.apiUrl;

  constructor() { }

  test(){
    axios.get(`${this.apiUrl}/sanctum/csrf-cookie`).then(() => {
      axios.get(`${this.apiUrl}/api/roles/clients`).then((response)=>{
        console.log(response)
      })
    })
  }
}
