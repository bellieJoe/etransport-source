import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminHasServiceGuard } from './guards/admin-has-service.guard';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { TocAgreedGuard } from './guards/toc-agreed.guard';
import { VerifiedAdministratorGuard } from './guards/verified-administrator.guard';
import { VerifiedEmailGuard } from './guards/verified-email.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
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
      TocAgreedGuard,
      VerifiedEmailGuard,
      VerifiedAdministratorGuard,
      AdminHasServiceGuard,
    ]
  },
  {
    path: 'administrator/unverified',
    loadChildren: () => import('./pages/administrator/unverified/unverified.module').then( m => m.UnverifiedPageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
      VerifiedEmailGuard,
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
    loadChildren: () => import('./pages/listings/listings.module').then( m => m.ListingsPageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule),
    canActivate: [
      AdminHasServiceGuard,
      TocAgreedGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'setup-service',
    loadChildren: () => import('./pages/setup-service/setup-service.module').then( m => m.SetupServicePageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'customer-bookings',
    loadChildren: () => import('./pages/customer-bookings/customer-bookings.module').then( m => m.CustomerBookingsPageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'service-bookings',
    loadChildren: () => import('./pages/service-bookings/service-bookings.module').then( m => m.ServiceBookingsPageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'announcements',
    loadChildren: () => import('./pages/announcements/announcements.module').then( m => m.AnnouncementsPageModule),
    canActivate: [
      AuthGuard,
      TocAgreedGuard,
      VerifiedEmailGuard
    ]
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule),
    canActivate: [
      AuthGuard
    ]
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
