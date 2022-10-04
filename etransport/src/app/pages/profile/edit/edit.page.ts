import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private modal : ModalController,
    private authService : AuthService,
    private loadingController : LoadingController,
    private userService : UserService,
    private alertController : AlertController,
  ) { }

  update_profile_form : any = {
    contact_number : this.authService.getAuth().contact_number,
    username : this.authService.getAuth().username,
    name: this.authService.getAuth().name,
    user_id: this.authService.getAuth().user_id,
    errors : {},
    submit: async () => {
      this.update_profile_form.errors = {};
      const loader = await this.loadingController.create({
        message: 'Updating profile',
        spinner: 'circular',
        backdropDismiss: false
      })
      await loader.present();
      const res = await this.userService.updateProfile(this.update_profile_form);
      if(res.status == 422){
        await loader.dismiss();
        this.update_profile_form.errors = res.data.errors;
        return;
      }
      if(res.status != 200){
        const alert = await this.alertController.create({
          message: `${ res.status } | ${ res.data.message }`,
          header: 'Unexpected Error',
          buttons: ["Ok"]
        });
        await alert.present();
        await loader.dismiss();
        return;
      }
      await loader.dismiss();
      localStorage.setItem('user', JSON.stringify(res.data));
      await this.modal.dismiss();
    }
  }

  async closeModal(){
    await this.modal.dismiss();
  }

  ngOnInit() {

  }

}
