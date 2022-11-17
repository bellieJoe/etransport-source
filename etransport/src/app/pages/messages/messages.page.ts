import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor() {
  
   }

   btnGoToLatest_visible : boolean = false;

  ngOnInit() {
    console.log('====================================');
    console.log("scrolled");
    console.log('====================================');

    setInterval(()=>{
      location.hash = "";
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
    }, 1000)
    
  }

  ionViewDidEnter(){
    this.goToLatest();
    
  }

  goToLatest(){
    location.hash =   "#latest";
  }

}


