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
  
  async fetchServices(){
    const loader = await this.loadingController.create({
      message: "Fetching services",
      spinner: 'bubbles'
    })
    await loader.present();

    const user = this.authService.getAuth();
    const res = await this.serviceService.getServicesByUserID(user.user_id)

    if(res.status != 200){
      const alert = await this.alertController.create({
        header: "Fetching services failed",
        message: `${res.status} | ${res.data.message}`,
        buttons: ['OK']
      })
      await loader.dismiss();
      await alert.present();
      return;
    }

    this.serviceService.services = res.data;
    await loader.dismiss();
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

  async ngOnInit() {
    await this.fetchServices()
  }
}
