import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMonitoringPageRoutingModule } from './payment-monitoring-routing.module';

import { PaymentMonitoringPage } from './payment-monitoring.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentMonitoringPageRoutingModule
  ],
  declarations: [PaymentMonitoringPage]
})
export class PaymentMonitoringPageModule {}
