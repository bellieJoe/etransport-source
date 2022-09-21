import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStatusPageRoutingModule } from './edit-status-routing.module';

import { EditStatusPage } from './edit-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStatusPageRoutingModule
  ],
  declarations: [EditStatusPage]
})
export class EditStatusPageModule {}
