import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { TestingService } from './services/testing.service';
import { UserService } from './services/user.service';

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
    private authService: AuthService,
    private testing : TestingService,
    private userService : UserService,
    private loadingController : LoadingController,
    private router : Router
  ) {}

  auth = {};
  user : any = {};

  async logout () {
    const loader = await this.loadingController.create({
      message: "Logging out",
      spinner: 'bubbles',
      backdropDismiss: false
    })
    await loader.present();

    this.userService.logout()

    await loader.dismiss();

    this.router.navigate(['/signin'])
  }

  async ngOnInit(){
    setInterval(() => {
      this.user = this.authService.getAuth();
    }, 1000);
  }

}
