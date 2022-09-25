import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditServicePageRoutingModule } from './edit-service-routing.module';

import { EditServicePage } from './edit-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditServicePageRoutingModule
  ],
  declarations: [EditServicePage]
})
export class EditServicePageModule {}
