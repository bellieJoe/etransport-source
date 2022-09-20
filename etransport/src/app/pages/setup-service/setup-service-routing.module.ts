import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupServicePage } from './setup-service.page';

const routes: Routes = [
  {
    path: '',
    component: SetupServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupServicePageRoutingModule {}
