import { Component, OnInit } from '@angular/core';
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
    private toastController : ToastController
  ) { }

  user = JSON.parse(localStorage.getItem('user'))

  ngOnInit() {
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
