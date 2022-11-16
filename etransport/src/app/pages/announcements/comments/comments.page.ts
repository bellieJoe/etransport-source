import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimeService } from 'src/app/helpers/time.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  constructor(
    private modalController : ModalController,
    public timeService : TimeService
  ) { }

  announcement : any;

  ngOnInit() {
    console.log('====================================');
    console.log(this.timeService.displayForHumans("2022-11-15 12:08:10"));
    console.log('====================================');
  }

  close(){
    this.modalController.dismiss();
  }

}
