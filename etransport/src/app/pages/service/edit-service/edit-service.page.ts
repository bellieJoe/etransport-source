import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
})
export class EditServicePage implements OnInit {

  constructor(
    private modalController : ModalController,
    private serviceService : ServiceService,
    private loadingController : LoadingController,
    private toastController : ToastController,
    private alertController : AlertController
  ) { }

  update_service_form : any = {
    service_id : this.serviceService.service.service_id,
    service_name : this.serviceService.service.service_name,
    driver : this.serviceService.service.driver,
    license_number : this.serviceService.service.license_number,
    vehicle_model : this.serviceService.service.vehicle_model,
    plate_number : this.serviceService.service.plate_number,
    service_type : this.serviceService.service.service_type,
    capacity : this.serviceService.service.capacity,
    mode_of_payment : this.serviceService.service.mode_of_payment,
    terms_and_conditions : this.serviceService.service.terms_and_conditions,
    small: this.serviceService.service.luggage_pricing.small,
    medium: this.serviceService.service.luggage_pricing.medium,
    large: this.serviceService.service.luggage_pricing.large,
    extra_large: this.serviceService.service.luggage_pricing.extra_large,
    errors : {},
    submit : async () => {
      const loader = await this.loadingController.create({
        spinner: 'circular',
        message: "Updating service",
        backdropDismiss: false
      });
      await loader.present();
      const res = await this.serviceService.editService(this.update_service_form);

      if(res.status == 422){
        await loader.dismiss();
        this.update_service_form.errors = res.data.errors;
        console.log(res)
        return;
      }

      if(res.status != 200){
        const alert = await this.alertController.create({
          message: `${res.status} | ${res.data.message}`,
          buttons: ['Ok']
        });
        await loader.dismiss();
        await alert.present();
        return;
      }

      const toast = await this.toastController.create({
        message: "Service successfully updated",
        duration: 3000
      })
      this.serviceService.service = res.data;
      await loader.dismiss();
      await toast.present();
      this.close();
    }
  }

  async close(){
    await this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
