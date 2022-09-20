import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { VerifiedAdministratorGuard } from './guards/verified-administrator.guard';
import { VerifiedEmailGuard } from './guards/verified-email.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [
      AuthGuard,
      VerifiedEmailGuard,
    ]
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule),
    canActivate: [
      GuestGuard
    ]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [
      GuestGuard
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [
      AuthGuard,
      VerifiedEmailGuard,
      VerifiedAdministratorGuard
    ]
  },
  {
    path: 'administrator/unverified',
    loadChildren: () => import('./pages/administrator/unverified/unverified.module').then( m => m.UnverifiedPageModule),
    canActivate: [
      AuthGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'listings',
    loadChildren: () => import('./pages/listings/listings.module').then( m => m.ListingsPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
