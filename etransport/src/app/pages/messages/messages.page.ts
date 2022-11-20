import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { SocketServerService } from 'src/app/services/socket-server.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private messageService : MessageService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    public authService : AuthService,
    private alertController : AlertController,
    public userService : UserService,
    private socketService : SocketServerService
  ) {}

  page: number = 1;
  loader : boolean =  false;
  btnGoToLatest_visible : boolean = false;
  message : string = "";
  navState : any;
  isSending : boolean = false;
  messages : any = [];
  receiverDetails : any = {};
  messageCounter : any = {
    remaining : 5000,
    onInput : () => {
      this.messageCounter.remaining =  5000 - this.message.length;
    }
  }

  async ngOnInit() {
    if(!this.router.getCurrentNavigation().extras.state ){
      location.href = "/";
    }
    this.navState = this.router.getCurrentNavigation().extras.state;
    this.scrollListener();
    await this.fetchMessages();
    this.goToLatest();
    this.watchMessage();
    this.receiverDetails = await this.userService.getUserByUserId(this.navState.receiver);
  }

  async watchMessage(){
    this.messageService.getNewMessage().subscribe(message => {
      if(message && message.user_id != this.authService.getAuth().user_id && message.user_id == this.navState.receiver){
        this.messages = [...this.messages, message];
        this.goToLatest();
      }
    })
    
  }

  async onIonInfinite(ev){
    await this.fetchMessages();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async handleRefresh(event){
    await this.fetchMessages();
    event.target.complete();
  }

  async fetchMessages(){
    try {
      const res = await this.messageService.getMessagesByMembers([this.authService.getAuth().user_id, this.navState.receiver], this.page);
      this.messages = [...res.data.reverse(), ...this.messages];
      if(res.data.length > 0){
        this.page++;
      }
    } catch (error) {
      await this.errorHandler(error);
    }
  }

  scrollListener(){
    setInterval(()=>{
      location.hash = "";
      try {
        const cr = document.getElementById("latest").getBoundingClientRect();
        let isLatestVisible = (cr.top >= 0 &&
          cr.left >= 0 &&
          cr.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          cr.right <= (window.innerWidth || document.documentElement.clientWidth));
          if(!isLatestVisible){
            this.btnGoToLatest_visible = true;
          }else{
            this.btnGoToLatest_visible = false;
          }
      } catch (error) { }
      
    }, 500)
  }

  async sendMessage(){
    try {
      this.isSending = true;
      const navState = this.navState;
      const data = {
        message: this.message,
        members : [navState.receiver, this.authService.getAuth().user_id],
        transport_booking_id : navState.serviceBooking ? navState.serviceBooking.transport_booking_id : null,
        user_id : this.authService.getAuth().user_id
      }
      const res = await this.messageService.addMessage(data);
      this.messages.push(res.data);
      this.messageService.sendMessage(res.data);
      this.goToLatest();
      this.message = "";
      this.isSending = false;
      this.messageCounter.remaining = 5000;

    } catch (error) {
     this.errorHandler(error);
    }
  }

  goToLatest(){
    location.hash =   "#latest";
  }

  async errorHandler(error : any){
    const alert = await this.alertController.create({
      message: error.message,
      header: "Unexpected Error",
      buttons: ['Ok']
    });
    if(error.response && error.response.message){
      alert.message = error.response.message
    }
    if(error.response && error.response.data.message){
      alert.message = error.response.data.message
    }
    if(error.response && error.response.status == 422){
      alert.message = error.response.data.errors.message
    }
    this.isSending = false;
    this.messageCounter.remaining = 5000;
    await alert.present();
  }

}


