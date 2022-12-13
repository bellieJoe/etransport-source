import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerSchedulePageRoutingModule } from './customer-schedule-routing.module';

import { CustomerSchedulePage } from './customer-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerSchedulePageRoutingModule
  ],
  declarations: [CustomerSchedulePage]
})
export class CustomerSchedulePageModule {}
