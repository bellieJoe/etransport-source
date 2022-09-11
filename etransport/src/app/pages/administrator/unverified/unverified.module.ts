import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnverifiedPageRoutingModule } from './unverified-routing.module';

import { UnverifiedPage } from './unverified.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnverifiedPageRoutingModule
  ],
  declarations: [UnverifiedPage]
})
export class UnverifiedPageModule {}
