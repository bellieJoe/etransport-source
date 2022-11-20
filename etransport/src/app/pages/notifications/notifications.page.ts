import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private authService : AuthService,
    private notificationService : NotificationService
  ) { }

  ngOnInit() {
    this.watchNotifications();
  }

  watchNotifications(){
    this.notificationService.listenToNotification().subscribe(notification => {
      console.log("Notification");
      console.log(notification);
    })
  }


}
