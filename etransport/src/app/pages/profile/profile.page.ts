import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EditPage } from './edit/edit.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  constructor(
    private authService : AuthService,
    private modalController : ModalController
  ) { }

  user : any = {}
  role : any = {}

  async showEditProfileModal(){
    const modal = await this.modalController.create({
      component: EditPage
    });
    await modal.present();
    await modal.onDidDismiss();
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.user = this.authService.getAuth();
    this.role = this.authService.getAuth().role;
  }

}
