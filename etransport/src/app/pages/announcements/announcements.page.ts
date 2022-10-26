import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage   {

  constructor(
    public announcementService  : AnnouncementService,
    private authService : AuthService,
    private alertController : AlertController,
  ) { }

  loading : boolean = false;

  async fetchAnnouncements(){
    this.loading = true;
    const res = await this.announcementService.getAnnouncementsUser(this.authService.getAuth().user_id);
    if(res.status != 200){
      const alert = await this.alertController.create({
        message: `${res.status} | ${res.data.message}`,
        header: 'Error fetching the data',
        buttons: ['Ok']
      });
      await alert.present();
      this.loading = false;
      return;
    }
    
    this.announcementService.announcements = res.data;
    console.log(res.data)
    this.loading = false;
  }
  async ionViewDidEnter(){
    this.fetchAnnouncements()
  }

}
