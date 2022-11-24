import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.page.html',
  styleUrls: ['./edit-status.page.scss'],
})
export class EditStatusPage implements OnInit {

  constructor(
    public serviceService : ServiceService,
    private router : Router,
    private toastController : ToastController,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private modalController : ModalController,
    private authService : AuthService
  ) { }


  set_status_form : any = {
    service_status : this.serviceService.service.service_status,
    marinduque_departure_datetime : this.serviceService.service.marinduque_departure_datetime,
    manila_departure_datetime : this.serviceService.service.manila_departure_datetime,
    errors : {},
    submit : async () => {
      this.set_status_form.errors = {};

      const loader = await this.loadingController.create({
        message: "Updating service status",
        backdropDismiss: false,
        spinner: "circular"
      });

      await loader.present();

      const res = await this.serviceService.setStatus(this.serviceService.service.service_id, this.set_status_form);
      console.log(res);
      
      if(res.status == 422){
        this.set_status_form.errors = res.data.errors
        await loader.dismiss();
        return;
      }

      if(res.status != 200){
        const alert = await this.alertController.create({
          message: `${res.status} | ${res.data.message}`,
          header: "Request Error",
          buttons: ['Ok']
        });
        await loader.dismiss();
        alert.present();
        return;
      }

      const toast = await this.toastController.create({
        message: 'Service status was updated',
        icon: 'checkmark',
        duration: 3000
      });
  
      await toast.present();
      await  this.serviceService.fetchServiceByUserId()
      await loader.dismiss();
      await this.close();
    }
  }

  async close(){
    await this.modalController.dismiss(null, 'cancel');
  }


  ngOnInit() {
    console.log(this.serviceService.service);
  }

}
