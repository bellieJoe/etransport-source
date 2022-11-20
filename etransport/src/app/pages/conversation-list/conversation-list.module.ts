import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationListPageRoutingModule } from './conversation-list-routing.module';

import { ConversationListPage } from './conversation-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationListPageRoutingModule
  ],
  declarations: [ConversationListPage]
})
export class ConversationListPageModule {}
