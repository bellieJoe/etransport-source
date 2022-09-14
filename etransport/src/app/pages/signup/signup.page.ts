import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private loading : LoadingController,
    private auth : AuthService,
    private userService : UserService,
    private alert : AlertController,
    private router : Router
  ) { }

  sign_up_form_err : any = {}
  sign_up_form  = {
    name : null,
    username : null,
    email : null,
    contact_number : null,
    password : null,
    password_confirmation : null,
    role_id : null,
    submit : async () => {
      this.sign_up_form_err = {};

      const loader = await this.loading.create({
        message: 'Creating account please wait.',
        spinner: 'bubbles',
        backdropDismiss: false
      })
      await loader.present();

      const data = {
        name: this.sign_up_form.name,
        contact_number: this.sign_up_form.contact_number,
        email: this.sign_up_form.email,
        password: this.sign_up_form.password,
        password_confirmation: this.sign_up_form.password_confirmation,
        role_id: this.sign_up_form.role_id,
        username: this.sign_up_form.username
      }

      const res = await this.userService.signup(data)

      if(res.status === 422){
        this.sign_up_form_err = res.data.errors
        await loader.dismiss();
        return;
      }

      if(res.status >= 400){
        const alert = await this.alert.create({
          header: 'Sign Up failed',
          message: `${res.status} | ${res.data.message}`,
          buttons: ['Ok']
        })
        await loader.dismiss();

        alert.present()

        return;
      }

      res.data.verification_code = null;
      localStorage.setItem('user', JSON.stringify(res.data))

      loader.dismiss();

      this.router.navigate(['/profile'])
    }
  }

  ngOnInit() {
  }

}
