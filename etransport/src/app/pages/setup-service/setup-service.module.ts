import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupServicePageRoutingModule } from './setup-service-routing.module';

import { SetupServicePage } from './setup-service.page';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupServicePageRoutingModule
  ],
  declarations: [
    SetupServicePage,
    LogoComponent
  ]
})
export class SetupServicePageModule {}
