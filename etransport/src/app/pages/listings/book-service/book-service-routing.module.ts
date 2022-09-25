import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookServicePage } from './book-service.page';

const routes: Routes = [
  {
    path: '',
    component: BookServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookServicePageRoutingModule {}
