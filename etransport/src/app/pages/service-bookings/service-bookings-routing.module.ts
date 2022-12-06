import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceBookingsPage } from './service-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceBookingsPage
  },
  {
    path: 'transfer',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceBookingsPageRoutingModule {}
