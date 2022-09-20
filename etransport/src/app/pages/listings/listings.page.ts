import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {

  constructor(
    public serviceService : ServiceService
  ) { }


  async fetchListings(){
    const res = await this.serviceService.getListings();
    this.serviceService.listings = res.data;
  }

  async ngOnInit() {
    await this.fetchListings();
  }

}
