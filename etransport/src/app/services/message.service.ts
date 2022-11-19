import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  async addMessage(data: AddMessageData){
    return await axios.post(`${environment.apiUrl}/api/messages`, data)
  }

  async getMessagesByMembers(members: number[]){
    const data = {
      members : members
    }
    return await axios.get(`${environment.apiUrl}/api/messages/get-messages-by-members`, {params: data});
  }
}

class AddMessageData {
  message : string
  transport_booking_id? : any
  members : any[]
  user_id: any
}