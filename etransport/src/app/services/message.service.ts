import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";
import { Router } from '@angular/router';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

class AddMessageData {
  message : string
  transport_booking_id? : any
  members : any[]
  user_id: any
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private router : Router
  ) { }

  async addMessage(data: AddMessageData){
    return await axios.post(`${environment.apiUrl}/api/messages`, data)
  }

  async getMessagesByMembers(members: number[]){
    const data = {
      members : members
    }
    return await axios.get(`${environment.apiUrl}/api/messages/get-messages-by-members`, {params: data});
  }

  async getConversationsByUserId(user_id){
    return await axios.get(`${environment.apiUrl}/api/messages/get-conversations-by-user-id/${user_id}`); 
  }

  async openConversation(receiver, transport_booking_id){
    this.router.navigate(['/messages'], {
      state : {
        serviceBooking : null,
        receiver : receiver
      }
    })
  }

  /* 
  socket.io emmiters and listeners
  */
  socket = io('http://localhost:3000');

  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      console.log(message);
    });
  };
}

