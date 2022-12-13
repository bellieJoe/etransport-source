import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSchedulePage } from './customer-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSchedulePageRoutingModule {}
