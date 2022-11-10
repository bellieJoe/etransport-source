import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage  {

  constructor(
    public authService : AuthService,
    private alertController : AlertController,
    private toastController : ToastController,
    private loadingController : LoadingController,
    public announcementService : AnnouncementService,
    private router : Router,
    private activateRoute : ActivatedRoute
  ) { }

  async ionViewDidEnter() {
    await this.initAnouncement();
  }

  async initAnouncement(){
    const announcement : any = await new Promise((resolve, reject) => {
      this.activateRoute.queryParams.subscribe(params => {
        resolve(params);
      })
      .unsubscribe();
    }) 
    this.edit_announcement_form.announcement_id = announcement.announcement_id;
    this.edit_announcement_form.announcement_title = announcement.announcement_title;
    this.edit_announcement_form.announcement_content = announcement.announcement_content;
  }

  edit_announcement_form : any = {
    announcement_id : null,
    announcement_title : null,
    announcement_content : null,
    user_id : this.authService.getAuth().user_id,
    errors : {},
    submit : async () => {
      const loader = await this.loadingController.create({
        spinner: 'circular',
        backdropDismiss: false,
        message: 'Updating Announcement'
      });
      await loader.present();
      const res = await this.announcementService.updateAnnouncement(this.edit_announcement_form);
      if(res.status == 422){
        await loader.dismiss();
        this.edit_announcement_form.errors = res.data.errors;
        return;
      }
      if(res.status != 200){
        await loader.dismiss();
        const alert = await this.alertController.create({
          header: 'Error updating Announcement',
          message: `${res.status} | ${res.data.message}`,
          buttons: ['Cancel']
        })
        await alert.present();
        return;
      }
      const toast = await this.toastController.create({
        message: "Announcement successfully updated",
        duration: 1500
      });
      await toast.present();
      await loader.dismiss();
      await toast.onDidDismiss();
      await this.router.navigate(['/announcements']);
    },
  }

}
