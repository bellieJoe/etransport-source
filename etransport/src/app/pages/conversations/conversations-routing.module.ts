import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationsPage } from './conversations.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationsPageRoutingModule {}
