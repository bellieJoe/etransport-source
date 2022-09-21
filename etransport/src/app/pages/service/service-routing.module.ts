import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicePage } from './service.page';

const routes: Routes = [
  {
    path: '',
    component: ServicePage
  },
  {
    path: 'edit-status',
    loadChildren: () => import('./edit-status/edit-status.module').then( m => m.EditStatusPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicePageRoutingModule {}
