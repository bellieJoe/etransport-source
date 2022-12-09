import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorRefundsPage } from './administrator-refunds.page';

const routes: Routes = [
  {
    path: '',
    component: AdministratorRefundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRefundsPageRoutingModule {}
