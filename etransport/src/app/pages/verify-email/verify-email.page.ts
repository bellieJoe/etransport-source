import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    private userService : UserService,
    private loadingController : LoadingController,
    private alerController : AlertController,
    private toastController : ToastController,
    private router : Router
  ) { }

  user = JSON.parse(localStorage.getItem('user'))

  ngOnInit() {
  }

  email_verification_form_err : any = {}
  email_verification_form = {
    verification_code: null,
    submit : async () => {
      this.email_verification_form_err = {};

      const loader = await this.loadingController.create({
        message: "Verifying email",
        spinner: "bubbles",
        backdropDismiss: false
      })

      await loader.present();

      const res = await this.userService.verifyEmail(this.email_verification_form.verification_code)

      if(res.status == 422){
        await loader.dismiss();
        this.email_verification_form_err = res.data.errors;
        return;
      }

      if(res.status != 200){
        const alert = await this.alerController.create({
          message: res.data.message,
          header: 'Verification failed',
          buttons: ['Ok']
        })

        loader.dismiss();
        alert.present();

        return;
      }

      await loader.dismiss();

      localStorage.setItem('user', JSON.stringify(res.data))
      this.router.navigate(['/setup-service']);
    }
  }

  async resendVerification(){
    const loader = await this.loadingController.create({
      message: "Resending verification code.",
      spinner: "bubbles",
      backdropDismiss: false
    })

    const toast = await this.toastController.create({
      message: "Verification Code successfully sent.",
      icon: 'checkmark-sharp',
      color : 'dark',
      duration: 5000
    })
    
    await loader.present()

    const res = await this.userService.resendVerificationEmail(this.user.user_id);

    if(res.status != 200){
      const alert = await this.alerController.create({
        message: res.data.message,
        header: "Resend failed",
        buttons: ['Ok']
      })

      await loader.dismiss();
      await alert.present();

      console.log(res.data.message)
      return;
    }

    await loader.dismiss();
    await toast.present();
  }

  

}
