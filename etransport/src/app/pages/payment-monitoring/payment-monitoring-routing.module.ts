import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentMonitoringPage } from './payment-monitoring.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentMonitoringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentMonitoringPageRoutingModule {}
