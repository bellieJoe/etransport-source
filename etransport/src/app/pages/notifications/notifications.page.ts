import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, RefresherCustomEvent } from '@ionic/angular';
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

  loading : boolean = false;
  notifications : any[] = [];
  page : number = 1;

  async ngOnInit() {
    this.watchNotifications();
  }

  async ionViewWillEnter(){
    this.loading = true;
    await this.fetchNotifications();
    this.loading = false;
  }

  async doRefresh(event : RefresherCustomEvent){
    await this.fetchNotifications();
    event.target.complete();
  }

  async fetchNotifications(){
    this.page = 0;
    this.notifications = await this.notificationService.getNotificationsByUserId(this.authService.getAuth().user_id, this.page);
    this.page++;
  }

  ionViewDidLeave(){
    this.page = 1;
  }

  watchNotifications(){
    this.notificationService.listenToNotification().subscribe(notification => {
      this.notifications = [notification,...this.notifications];
      console.log(notification);
    })
  }

  async loadData(ev){
    const res = await this.notificationService.getNotificationsByUserId(this.authService.getAuth().user_id, this.page);
    res.map((val,i)=>{
      this.notifications.push(val);
    });
    this.page++;
    (ev as InfiniteScrollCustomEvent).target.complete();
  }


}
