import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerRefundsPage } from './customer-refunds.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerRefundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRefundsPageRoutingModule {}
