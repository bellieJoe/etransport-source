import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSpinner, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(
    private router : Router,
    private authService : AuthService,
    private serviceService : ServiceService,
    private loadingController : LoadingController,
    private alertController : AlertController,
  ) { }

  add_service_form_err : any = {};
  add_service_form : any = {
    user_id : null,
    driver: null,
    service_name : null,
    license_number : null,
    plate_number : null,
    vehicle_model : null,
    capacity : null,
    mode_of_payment : null,
    fare : null,
    load_type : null,
    submit : async () => {
      this.add_service_form_err = {};
      this.add_service_form.user_id = this.authService.getAuth().user_id;

      const loader = await this.loadingController.create({
        message: "Saving",
        spinner: "bubbles",
        backdropDismiss: false
      });

      await loader.present();

      const res = await this.serviceService.addService(this.add_service_form);

      if(res.status == 422){
        this.add_service_form_err = res.data.errors;
        await loader.dismiss();
        return;
      }

      if(res.status != 200){
        const alert = await this.alertController.create({
          message: `${res.status} | ${res.data.message}`,
          header: 'Adding failed',
          buttons: ['Ok']
        })
        await loader.dismiss();
        await alert.present();
        return;
      }

      await loader.dismiss();
      this.router.navigate(['/services']);
    }
  }

  ngOnInit() {
  }

}
