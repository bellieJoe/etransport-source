import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";
import { Router } from '@angular/router';
import { SocketServerService } from './socket-server.service';
import { Observable } from 'rxjs';

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
    private router : Router,
    private socketService : SocketServerService
  ) { }

  conversations : any[] = [];
  async addMessage(data: AddMessageData){
    return await axios.post(`${environment.apiUrl}/api/messages`, data)
  }

  async getMessagesByMembers(members: number[], page){
    const data = {
      members : members,
      page: page
    }
    return await axios.get(`${environment.apiUrl}/api/messages/get-messages-by-members`, {params: data});
  }

  async getConversationsByUserId(user_id, page){
    return await axios.get(`${environment.apiUrl}/api/messages/get-conversations-by-user-id/${user_id}?page=${page}`); 
  }

  async openConversation(receiver, transport_booking_id){
    this.router.navigate(['/messages'], {
      state : {
        serviceBooking : transport_booking_id,
        receiver : receiver
      }
    })
  }

  /* 
  socket.io emmiters and listeners
  */

  public sendMessage(message) {
    this.socketService.socket.emit('message', message);
  }

  public getNewMessage () : Observable<any>  {
    return new Observable((subscriber => {
      this.socketService.socket.on('message', (message) =>{
        subscriber.next(message);
      });
      
    }));
    
  };
}

