import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-contacts',
  templateUrl: './service-contacts.page.html',
  styleUrls: ['./service-contacts.page.scss'],
})
export class ServiceContactsPage implements OnInit {

  constructor(
    private serviceService : ServiceService,
    private router : Router,
    public authService : AuthService
  ) { }

  servicesBakcup : any[] = [];
  services : any[] = [];
  loading : boolean = false;

  async ngOnInit() {
    this.loading = true;
    const res = await this.serviceService.getAll();
    this.services = res ? res : [];
    this.servicesBakcup = res ? res : [];
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

  async onSearchChange(ev) {
    const text = ev.target.value;

    if(text && text.trim() != ''){
      this.services = this.servicesBakcup.filter((service, i) => {
        return (service.administrator.user.name.toLowerCase().includes(text) || service.service_name.toLowerCase().includes(text) )
      });
    }
    else {
      this.services = this.servicesBakcup;
    }
    
    // console.log(this.services)
  }

}
