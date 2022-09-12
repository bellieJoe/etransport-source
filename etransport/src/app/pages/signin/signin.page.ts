import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(
    private auth: AuthService,
    private loading : LoadingController,
    private router : Router,
    private alert : AlertController
  ) { }

  

  sign_in_form_err : any = {};
  sign_in_form = {
    email: {
      data: null,
      error: null
    },
    password: {
      data: null,
      error: null
    },
    submit : async () => {
      this.sign_in_form_err = {};

      const loader = await this.loading.create({
        spinner: 'bubbles',
        message: 'Signing In'
      })

      loader.present()

      const res = await this.auth.login({
        email: this.sign_in_form.email.data,
        password: this.sign_in_form.password.data
      })

      if(res.status === 422){
        this.sign_in_form_err = res.data.errors
        return;
      }

      if(res.status === 401){
        const alert = await this.alert.create({
          header: 'Sign In failed.',
          message: res.data.message,
          buttons: ['Ok']
        })
        await loader.dismiss();

        alert.present()

        return;
      }
      
      localStorage.setItem('user', JSON.stringify(res.data))

      loader.dismiss();

      this.router.navigate(['/profile'])

    }
  }

  async ngOnInit() {

  }

}
