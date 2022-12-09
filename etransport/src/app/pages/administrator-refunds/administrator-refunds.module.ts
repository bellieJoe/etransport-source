import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorRefundsPageRoutingModule } from './administrator-refunds-routing.module';

import { AdministratorRefundsPage } from './administrator-refunds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorRefundsPageRoutingModule
  ],
  declarations: [AdministratorRefundsPage]
})
export class AdministratorRefundsPageModule {}
