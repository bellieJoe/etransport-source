import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnverifiedPage } from './unverified.page';

const routes: Routes = [
  {
    path: '',
    component: UnverifiedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnverifiedPageRoutingModule {}
