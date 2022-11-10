import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
    public authService : AuthService,
    private alertController : AlertController,
    private loadingController : LoadingController,
    private toastController : ToastController,
    private router : Router
  ) { }

  loading : boolean = false;
  filter : string = "stream";

  filterAnnouncements(filter){
    this.filter = filter;
  }

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
    this.loading = false;
  }

  async deleteAnnouncement(announcement_id){
    const deleteHandler = async () => {
      
      const loader = await this.loadingController.create({
        spinner: 'circular',
        backdropDismiss: false,
        message: 'Deleting Announcement'
      });
      await loader.present();
      const res = await this.announcementService.deleteAnnouncement(announcement_id);
      if(res.status != 200){
        await loader.dismiss();
        const alert = await this.alertController.create({
          header: 'Error deleting Announcement',
          message: `${res.status} | ${res.data.message}`,
          buttons: ['Cancel']
        })
        await alert.present();
        return;
      }
      const toast = await this.toastController.create({
        message: "Announcement successfully deleted",
        duration: 1500
      });
      this.fetchAnnouncements();
      await toast.present();
      await loader.dismiss();
      await toast.onDidDismiss();
    }
    const deleteAlert  = await this.alertController.create({
      message: "Are you sure you want to delete this announcement?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          handler: deleteHandler
        }
      ]
    });
    await deleteAlert.present();
  }

  async ionViewDidEnter(){
    this.fetchAnnouncements()
  }

  async editAnnouncement(announcement){
    this.router.navigate(['/announcements/edit'], {
      queryParams: announcement
    });
  }

}
