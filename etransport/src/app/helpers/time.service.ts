import { Injectable } from '@angular/core';
import moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  displayForHumans(date : any){
    return moment(date).format("MMMM D YYYY");
  }

}
