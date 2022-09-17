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
    submit : async () => {
      this.add_service_form_err = {};
      this.add_service_form.user_id = this.authService.getAuth().user_id;

      const loader = await this.loadingController.create({
        message: "Saving",
        spinner: "bubbles",
        backdropDismiss: false
      });

      await loader.present();

      let data : any = {
        user_id : this.add_service_form.user_id,
        driver : this.add_service_form.driver,
        service_name : this.add_service_form.service_name,
        license_number : this.add_service_form.license_number,
        plate_number : this.add_service_form.plate_number,
        vehicle_model : this.add_service_form.vehicle_model,
        capacity : this.add_service_form.capacity,
        mode_of_payment : this.add_service_form.mode_of_payment
      }
      
      console.log(data)

      const res = await this.serviceService.addService(data);

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
