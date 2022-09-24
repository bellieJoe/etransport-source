import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

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
    private toastController : ToastController
  ) { }

  loading : boolean  = false;

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
    this.loading = false;
  }

  sample(){
    console.log('sample')
  }

  async ionViewWillEnter() {
    this.fetchService();
  }

}
