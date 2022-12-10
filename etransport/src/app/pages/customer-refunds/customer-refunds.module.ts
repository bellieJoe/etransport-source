import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerRefundsPageRoutingModule } from './customer-refunds-routing.module';

import { CustomerRefundsPage } from './customer-refunds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerRefundsPageRoutingModule
  ],
  declarations: [CustomerRefundsPage]
})
export class CustomerRefundsPageModule {}
