import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceContactsPageRoutingModule } from './service-contacts-routing.module';

import { ServiceContactsPage } from './service-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceContactsPageRoutingModule
  ],
  declarations: [ServiceContactsPage]
})
export class ServiceContactsPageModule {}
