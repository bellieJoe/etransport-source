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

  async fetchService(){
    this.loading = true;
    const res = await this.serviceService.getServiceByUserID(this.authService.getAuth().user_id);
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
    
    this.serviceService.service = res.data;
    console.log(res.data)
    this.loading = false;
  }

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

  async ionViewWillEnter() {
    await this.fetchService();
    this.luggage_pricing = this.serviceService.service.luggage_pricing;
  }

}
