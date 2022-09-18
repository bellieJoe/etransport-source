import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private router : Router,
    private authService : AuthService,
    private serviceService : ServiceService,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private activatedRoute : ActivatedRoute
  ) { }

  edit_service_form_err : any = {};
  edit_service_form : any = {
    service_id : null,
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
      this.edit_service_form_err = {};

      const loader = await this.loadingController.create({
        message: "Saving",
        spinner: "bubbles",
        backdropDismiss: false
      });

      await loader.present();

      const res = await this.serviceService.editService(this.edit_service_form);

      if(res.status == 422){
        this.edit_service_form_err = res.data.errors;
        await loader.dismiss();
        return;
      }

      if(res.status != 200){
        const alert = await this.alertController.create({
          message: `${res.status} | ${res.data.message}`,
          header: 'Editing failed',
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

  async fetchServiceData(){
    const service_id : string = this.activatedRoute.snapshot.paramMap.get('id');

    this.serviceService.services.map((service : any) => {
      if(service.service_id == service_id){
        this.edit_service_form.user_id = service.user_id;
        this.edit_service_form.driver = service.driver;
        this.edit_service_form.service_name = service.service_name;
        this.edit_service_form.license_number = service.license_number;
        this.edit_service_form.plate_number = service.plate_number;
        this.edit_service_form.vehicle_model = service.vehicle_model;
        this.edit_service_form.capacity = service.capacity;
        this.edit_service_form.mode_of_payment = service.mode_of_payment;
        this.edit_service_form.fare = service.fare;
        this.edit_service_form.load_type = service.load_type;
        this.edit_service_form.service_id = service.service_id;
      }
    })
  }

  ngOnInit() {
    this.fetchServiceData();
  }

}
