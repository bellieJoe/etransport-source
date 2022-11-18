import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

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
    private alertController : AlertController
  ) {}

  loader : boolean =  false;
  btnGoToLatest_visible : boolean = false;
  message : string = "";
  navState : any;
  isSending : boolean = false;
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
        transport_booking_id : navState.serviceBooking ? navState.serviceBooking.transport_booking_id : null 
      }
      const res = await this.messageService.addMessage(data);
      console.log(res)

      this.message = "";
      this.isSending = false;

    } catch (error) {
      const alert = await this.alertController.create({
        message: error.message,
        header: "Unexpected Error",
        buttons: ['Ok']
      });
      if(error.response.message){
        alert.message = error.response.message
      }
      if(error.response.data.message){
        alert.message = error.response.data.message
      }
      if(error.response.status == 422){
        alert.message = error.response.data.errors.message
      }
      this.isSending = false;
      await alert.present();
      console.log(error);
      
    }
  }



  ionViewDidEnter(){
    this.goToLatest();
    
  }

  goToLatest(){
    location.hash =   "#latest";
  }

}


