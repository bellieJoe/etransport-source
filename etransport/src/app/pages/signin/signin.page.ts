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

  

  passwordVisibility : boolean = false;
  sign_in_form_err : any = {};
  sign_in_form = {
    email: null,
    password: null,
    submit : async () => {
      this.sign_in_form_err = {};

      const loader = await this.loading.create({
        spinner: 'bubbles',
        message: 'Signing In',
        backdropDismiss: false
      })

      loader.present()

      const res = await this.auth.login({
        email: this.sign_in_form.email,
        password: this.sign_in_form.password
      })

      if(res.status === 422){
        this.sign_in_form_err = res.data.errors
        await loader.dismiss();
        return;
      }

      if(res.status != 200){
        const alert = await this.alert.create({
          header: 'Sign In failed',
          message: `${res.status} | ${res.data.message ? res.data.message : 'Unknown error'}`,
          buttons: ['Ok']
        })
        await loader.dismiss();

        alert.present()

        return;
      }
      
      res.data.verification_code = null;
      localStorage.setItem('user', JSON.stringify(res.data))

      loader.dismiss();

      if(res.data.role_id == 2){
        location.href = '/dashboard';
      }
      else{
        location.href = '/profile';
      }
      // this.router.navigate(['/profile']);

    },
    clear : async () => {
      this.sign_in_form.email = null;
      this.sign_in_form.password = null;
      this.sign_in_form_err = {};
    }
  }

  async ngOnInit() {

  }

  ionViewWillEnter(){
    this.sign_in_form.clear();
  }

  togglePasswords(){
    this.passwordVisibility = !this.passwordVisibility;
  }

}
