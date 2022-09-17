import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertController : AlertController
  ) { }

  services : any = [];
  serviceFilter : string = 'all';

  async fetchServices(){
    const user = this.authService.getAuth();
    const res = await this.serviceService.getServicesByUserID(user.user_id)

    if(res.status != 200){
      const alert = await this.alertController.create({
        header: "Fetching services failed",
        message: `${res.status} | ${res.data.message}`,
        buttons: ['OK']
      })
      await alert.present();
      return;
    }

    this.services = res.data;
  }

  async ngOnInit() {
    await this.fetchServices()
  }
}
