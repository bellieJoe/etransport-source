import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementsPage } from './announcements.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementsPageRoutingModule {}
