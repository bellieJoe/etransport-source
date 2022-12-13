import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-contacts',
  templateUrl: './service-contacts.page.html',
  styleUrls: ['./service-contacts.page.scss'],
})
export class ServiceContactsPage implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private router : Router
  ) { }

  services : any[] = [];
  loading : boolean = false;

  async ngOnInit() {
    this.loading = true;
    const res = await this.serviceService.getAll();
    this.services = res ? res : [];
    this.loading = false;
  }

  async viewMessages(service){
    this.router.navigate(['/messages'], {
      state : {
        serviceBooking : null,
        receiver : service.administrator.user_id
      }
    })
  }

}
