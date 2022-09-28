import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonSelectOption, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.page.html',
  styleUrls: ['./book-service.page.scss'],
})

export class BookServicePage implements OnInit {

  constructor(
    private modalController : ModalController,
    private authService : AuthService,
    public serviceService : ServiceService,
  ) { }

  @ViewChild(IonModal) modal: IonModal;

  routeInterfaceOptions = {
    header: 'Routes', 
    subHeader: 'These are all the available routes provided by the service owner.',
    cssClass: 'route-select',
  };

  book_service_form : any = {
    user_customer_id : this.authService.getAuth().user_id,
    passenger_count: null,
    service_id: this.serviceService.to_book.service_id,
    pickup_time: null,
    pickup_location: null,
    dropoff_location: null,
    service_type: null,
    route: null,
    errors: {},
    submit : async () => {
      console.log(this.book_service_form)
    }
  }

  async confirmLuggageSpecModal(){
    await this.modal.dismiss();
  }

  async closeLuggageSpecModal(){
    await this.modal.dismiss();
  }

  async close(){
    await this.modalController.dismiss();
  }

  ionViewWillEnter(){
    console.log(this.serviceService.to_book);
  }
  
  ngOnInit() {
  }

}
