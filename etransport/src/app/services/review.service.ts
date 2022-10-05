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
export class ReviewService {

  constructor() { }

  async addReview(data: AddReviewData){
    const res = await axios.post(`${environment.apiUrl}/api/reviews`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }
}

class AddReviewData {
  service_id: any
  user_customer_id : any
  rate : number
  content : string
}
