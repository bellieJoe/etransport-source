import { Component, ErrorHandler, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
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

  page : number = 1;
  loading : boolean = false;
  conversations : any = [];

  async ngOnInit() {
    this.messageService.getUpdatedConversation(this.authService.getAuth().user_id).subscribe((receiver)=>{
      this.ionViewDidEnter();
    })
  }

  async ionViewDidEnter(){
    this.loading = true;
    this.page = 1;
    this.conversations = this.messageService.conversations
    await this.fetchConversations();
    this.loading = false;
  }

  ionViewDidLeave(){
    this.messageService.conversations = this.conversations;
  }

  async onIonInfinite(ev){
    await this.fetchConversations();
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

  async fetchConversations(){
    try {
      console.log(this.page);
      const res = await this.messageService.getConversationsByUserId(this.authService.getAuth().user_id, this.page);
      this.conversations = [...this.conversations, ...res.data];
      if(this.page == 1){
        this.conversations = res.data;
      }
      if(res.data.length > 0){
        this.page++;
      }
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

}
