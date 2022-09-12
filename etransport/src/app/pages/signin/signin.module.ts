import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { LogoComponent } from '../../components/logo/logo.component';
import { ValidationErrorComponent } from 'src/app/components/validation-error/validation-error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninPageRoutingModule
  ],
  declarations: [
    SigninPage,
    LogoComponent,
    ValidationErrorComponent
  ]
})
export class SigninPageModule {}
