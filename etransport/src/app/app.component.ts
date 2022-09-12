import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TestingService } from './services/testing.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
/*   public appPages = [
    // { title: 'Profile', url: '/profile', icon: 'mail' },
    // { title: 'Logout', url: '/profile', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ]; */
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private auth: AuthService,
    private testing : TestingService
  ) {}

  async ngOnInit(){

  }
}
