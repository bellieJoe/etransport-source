import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.page.html',
  styleUrls: ['./book-service.page.scss'],
})
export class BookServicePage implements OnInit {

  constructor(
    private modalController : ModalController,
    public serviceService : ServiceService
  ) { }

  async close(){
    await this.modalController.dismiss();
  }

  ionViewWillEnter(){
    console.log(this.serviceService.to_book);
  }
  
  ngOnInit() {
  }

}
