import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {

  constructor(
    public serviceService : ServiceService,
    private alertController : AlertController
  ) { }

  loading : boolean = false;

  async fetchListings(){
    this.loading = true;
    const res = await this.serviceService.getListings();

    if(res.status != 200){
      const alert = await this.alertController.create({
        header: "Error fetching services",
        message: `${res.status} | ${res.data.message}`,
        buttons: ['Ok']
      });
      await alert.present();
      this.loading = false;
      return;
    }

    this.serviceService.listings = res.data;
    this.loading = false;
  }

  async ngOnInit() {
    await this.fetchListings();
  }

}
