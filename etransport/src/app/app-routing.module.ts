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
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'conversations',
    loadChildren: () => import('./pages/conversations/conversations.module').then( m => m.ConversationsPageModule)
  },  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'payment-monitoring',
    loadChildren: () => import('./pages/payment-monitoring/payment-monitoring.module').then( m => m.PaymentMonitoringPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'booking-transfers',
    loadChildren: () => import('./pages/booking-transfers/booking-transfers.module').then( m => m.BookingTransfersPageModule)
  },
  {
    path: 'administrator-refunds',
    loadChildren: () => import('./pages/administrator-refunds/administrator-refunds.module').then( m => m.AdministratorRefundsPageModule)
  },
  {
    path: 'customer-refunds',
    loadChildren: () => import('./pages/customer-refunds/customer-refunds.module').then( m => m.CustomerRefundsPageModule)
  },
  {
    path: 'service-contacts',
    loadChildren: () => import('./pages/service-contacts/service-contacts.module').then( m => m.ServiceContactsPageModule)
  },
  {
    path: 'customer-schedule',
    loadChildren: () => import('./pages/customer-schedule/customer-schedule.module').then( m => m.CustomerSchedulePageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
