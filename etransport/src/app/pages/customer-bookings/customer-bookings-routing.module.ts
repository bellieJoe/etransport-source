import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerBookingsPage } from './customer-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerBookingsPage
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerBookingsPageRoutingModule {}
