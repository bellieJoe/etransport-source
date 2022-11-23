import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    public authService : AuthService,
    private alertController : AlertController,
    private toastController : ToastController,
    private loadingController : LoadingController,
    public announcementService : AnnouncementService,
    public notificationService : NotificationService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  add_announcement_form : any = {
    announcement_title : null,
    announcement_content : null,
    viewer_role : "Customer",
    user_id : this.authService.getAuth().user_id,
    errors : {},
    submit : async () => {
      const loader = await this.loadingController.create({
        spinner: 'circular',
        backdropDismiss: false,
        message: 'Posting Announcement'
      });
      await loader.present();
      const res = await this.announcementService.postAnnouncement(this.add_announcement_form);
      if(res.status == 422){
        await loader.dismiss();
        this.add_announcement_form.errors = res.data.errors;
        return;
      }
      if(res.status != 200){
        await loader.dismiss();
        const alert = await this.alertController.create({
          header: 'Error posting Announcement',
          message: `${res.status} | ${res.data.message}`,
          buttons: ['Cancel']
        })
        await alert.present();
        return;
      }
      const toast = await this.toastController.create({
        message: "Announcement successfully posted",
        duration: 1500
      });
      await toast.present();
      await loader.dismiss();
      await toast.onDidDismiss();
      await this.router.navigate(['/announcements']);
    },
  }

}
