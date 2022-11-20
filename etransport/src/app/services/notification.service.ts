import {  Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { AuthService } from './auth.service';
import { SocketServerService } from './socket-server.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

class AddNotificationData{
  notification_message : string
  notification_title : string
  link : string
  user_id : any
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private authService : AuthService,
    private socketService : SocketServerService,
    private errorHandlerService : ErrorHandlerService
  ) { }

  async addNotification(data : AddNotificationData){
    try {
      const res = await axios.post(`${environment.apiUrl}/api/notifications`, data);
      this.sendNotificationToSocket(res.data);
    } catch (error) {
        this.errorHandlerService.handleError(error)
    }
  }

  listenToNotification () : Observable<any>  {
    return new Observable((subscriber => {
      this.socketService.socket.on(`notification-${this.authService.getAuth().user_id}`, (notification) =>{
        subscriber.next(notification);
      });
    }));
  };

  sendNotificationToSocket(notification){
    this.socketService.socket.emit('notification', notification);
  }
}
