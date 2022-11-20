import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationsPageRoutingModule } from './conversations-routing.module';

import { ConversationsPage } from './conversations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationsPageRoutingModule
  ],
  declarations: [ConversationsPage]
})
export class ConversationsPageModule {}
