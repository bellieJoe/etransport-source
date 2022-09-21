import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStatusPage } from './edit-status.page';

const routes: Routes = [
  {
    path: '',
    component: EditStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStatusPageRoutingModule {}
