import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { BookServicePage } from './book-service/book-service.page';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {

  constructor(
    public serviceService : ServiceService,
    private alertController : AlertController,
    private modalController : ModalController,
    private authService : AuthService,

  ) { }

  loading : boolean = false;

  async fetchListings(){
    this.loading = true;
    const res = await this.serviceService.getListingsByUserCustomerId(this.authService.getAuth().user_id);
    console.log(res);
    
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

    if(res.data.length != 0){
      await new Promise((resolve, reject) => {
        res.data.map((service, i) => {
          res.data[i].service_type =  JSON.parse(res.data[i].service_type)
          if(i == (res.data.length-1)){
            resolve(null)
          }
        });
      })
    }
    
    this.serviceService.listings = res.data;
    
    this.loading = false;
  }

  async showBookingForm(service : any){
    const modal = await this.modalController.create({
      component: BookServicePage
    })
    this.serviceService.to_book = service;
    await modal.present();
    await modal.onDidDismiss();
    await this.fetchListings();
  }

  async ngOnInit() {
    await this.fetchListings();
    console.log(this.serviceService.listings);
  }

}
