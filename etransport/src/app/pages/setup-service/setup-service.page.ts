import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-setup-service',
  templateUrl: './setup-service.page.html',
  styleUrls: ['./setup-service.page.scss'],
})
export class SetupServicePage implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private alertController : AlertController,
    private toastController : ToastController,
    private router : Router,
    private loadingController : LoadingController,
    private authService : AuthService
  ) { }

  add_service_form : any = {
    user_id : this.authService.getAuth().user_id,
    service_name : null,
    driver : null,
    license_number : null,
    plate_number : null,
    vehicle_model : null,
    capacity : null,
    mode_of_payment : null,
    service_type : null,
    errors : {},
    submit : async() => {
      const loader = await this.loadingController.create({
        message: "Saving",
        spinner: "circular"
      })

      await loader.present();
      const res = await this.serviceService.addService(this.add_service_form);

      if(res.status == 422 && res.data.errors){
        this.add_service_form.errors = res.data.errors;
        await loader.dismiss();
        return;
      }

      if(res.status != 200){
        const alert  = await this.alertController.create({
          message: `${res.status} | ${res.data.message}`,
          header: "Saving failed",
          buttons: ['Ok']
        });
        await loader.dismiss();
        await alert.present();
        return;
      }

      const toast = await this.toastController.create({
        message: "Service successfully updated.",
        icon: 'checkmark',
        duration: 5000
      });

      await loader.dismiss();
      await toast.present();
      this.router.navigate(['/service']);
    }
  }

  ngOnInit() {
  }

}
