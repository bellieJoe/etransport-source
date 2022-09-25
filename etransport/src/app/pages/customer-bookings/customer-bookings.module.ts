import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerBookingsPageRoutingModule } from './customer-bookings-routing.module';

import { CustomerBookingsPage } from './customer-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerBookingsPageRoutingModule
  ],
  declarations: [CustomerBookingsPage]
})
export class CustomerBookingsPageModule {}
