import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  constructor(
    private authService : AuthService
  ) { }

  user : any = {}
  role = {}



  ionViewDidEnter(){
    this.user = this.authService.getAuth();
    this.role = this.authService.getAuth().role;
  }

}
