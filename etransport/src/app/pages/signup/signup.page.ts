import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private loading : LoadingController,
    private auth : AuthService
  ) { }

  sign_up_form_err : any = {}
  sign_up_form  = {
    name : null,
    username : null,
    email : null,
    contact_number : null,
    password : null,
    password_confirmation : null,
    role : null,
    submit : async () => {
      console.log("sign up attempt")

      const loader = await this.loading.create({
        message: 'Creating account please wait.',
        spinner: 'bubbles',
        backdropDismiss: false
      })
      await loader.present();

      // const res = await this.auth.


    }
  }

  ngOnInit() {
  }

}
