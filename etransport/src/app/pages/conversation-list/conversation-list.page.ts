import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.page.html',
  styleUrls: ['./conversation-list.page.scss'],
})
export class ConversationListPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("ok");
  }

}
