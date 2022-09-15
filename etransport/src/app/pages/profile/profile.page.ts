import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private authService : AuthService
  ) { }

  user : any = {}
  role = {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = this.authService.getAuth();
    this.role = this.authService.getAuth().role;
    console.log(this.user.role.role_description)
  }

}
