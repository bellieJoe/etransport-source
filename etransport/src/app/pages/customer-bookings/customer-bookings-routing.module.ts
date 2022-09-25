import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerBookingsPage } from './customer-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerBookingsPageRoutingModule {}
