import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private authService : AuthService,
    private alertController : AlertController,
    private toastController : ToastController,
    private loadingController : LoadingController
    // const 
  ) { }

  services : any = [];
  serviceFilter : string = 'all';
  progress_bar : any = {
    loading : false
  };

  async fetchServices(){
    this.progress_bar.loading = true;

    const user = this.authService.getAuth();
    const res = await this.serviceService.getServicesByUserID(user.user_id)

    if(res.status != 200){
      const alert = await this.alertController.create({
        header: "Fetching services failed",
        message: `${res.status} | ${res.data.message}`,
        buttons: ['OK']
      })
      this.progress_bar.loading = false;
      await alert.present();
      return;
    }

    this.serviceService.services = res.data;
    this.progress_bar.loading = false;
  }

  async deleteService(id){
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to delete this Service? ',
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: async ()=>{
            const loader = await this.loadingController.create({
              message: "Deleting service",
              spinner: 'bubbles'
            });

            await loader.present();

            const res = await this.serviceService.deleteByID(id);
            if(res.status != 200){
              const alert = await this.alertController.create({
                header: 'Delete failed',
                message: `${res.status} | ${res.data.message}`,
                buttons: ['Ok']
              })
              await loader.dismiss();
              await alert.present();
              return;
            }
            
            const toast = await this.toastController.create({
              message: 'A service was deleted',
              icon: 'trash-sharp',
              duration: 5000
            })
            await loader.dismiss();
            await toast.present();
            await this.fetchServices();
          }
        }
      ]
    })
    await alert.present();
  }

  async setStatus(service_id, service_status){
    console.log(arguments)
    const loader = await this.loadingController.create({
      message: 'Updating status',
      spinner: 'bubbles'
    });

    const toast = await this.toastController.create({
      message: 'Service status was updated',
      icon: 'checkmark-circle-sharp',
      duration: 5000
    })

    await loader.present();

    const res = await this.serviceService.setStatus(service_id, service_status);

    if(res.status != 200){
      const alert = await this.alertController.create({
        message: `${res.status} | ${res.data.message}`,
        buttons: ['Ok']
      })
      await loader.dismiss();
      await alert.present();
      return;
    }
    this.serviceService.services = this.serviceService.services.map(service => {
      if(service.service_id == service_id){
        service.service_status = res.data.service_status
      }
      return service;
    });

    await loader.dismiss();
    await toast.present();
  }

  async ngOnInit() {
    // await this.fetchServices()
  }

  async ionViewWillEnter() {
    await this.fetchServices()
  }
}
