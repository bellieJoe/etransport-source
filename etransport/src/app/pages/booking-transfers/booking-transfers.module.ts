import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingTransfersPageRoutingModule } from './booking-transfers-routing.module';

import { BookingTransfersPage } from './booking-transfers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingTransfersPageRoutingModule
  ],
  declarations: [BookingTransfersPage]
})
export class BookingTransfersPageModule {}
