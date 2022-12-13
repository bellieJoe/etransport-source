import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceContactsPage } from './service-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceContactsPageRoutingModule {}
