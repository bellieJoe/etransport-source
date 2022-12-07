import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { EditServicePage } from './edit-service/edit-service.page';
import { EditStatusPage } from './edit-status/edit-status.page';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage  {

  constructor(
    public serviceService : ServiceService,
    private authService : AuthService,
    private alertController : AlertController,
    private toastController : ToastController,
    private modalController : ModalController
  ) { }

  loading : boolean  = false;
  luggage_pricing : any = {};

  async showUpdateStatusForm(){
    const modal = await this.modalController.create({
      component : EditStatusPage,
    })

    await modal.present();
  }

  async showEditServiceForm(){
    const modal = await this.modalController.create({
      component: EditServicePage
    });
    await modal.present();
  }

  sample(){
    console.log('sample')
  }

  async ionViewDidEnter() {
    this.loading = true;
    await this.serviceService.fetchServiceByUserId();
    this.luggage_pricing = this.serviceService.service.luggage_pricing;
    this.loading = false;
  }

  async copy(text, message){
    await navigator.clipboard.writeText(text);
    const toast = await this.toastController.create({
      message: message,
      icon: 'copy-outline',
      duration: 1000
    });
    await toast.present();
  }

}
