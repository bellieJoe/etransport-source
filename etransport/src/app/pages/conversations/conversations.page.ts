import { Component, ErrorHandler, OnInit } from '@angular/core';
import { TimeService } from 'src/app/helpers/time.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  constructor(
    public messageService : MessageService,
    private errorHandler : ErrorHandler,
    private authService : AuthService
  ) { }

  loading : boolean = false;
  conversations : any = [];

  async ngOnInit() {
    this.loading = true;
    await this.fetchConversations();
    this.loading = false;
  }

  async openConversation(){

  }

  async fetchConversations(){
    try {
      const res = await this.messageService.getConversationsByUserId(this.authService.getAuth().user_id);
      this.conversations = res.data;
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

}
