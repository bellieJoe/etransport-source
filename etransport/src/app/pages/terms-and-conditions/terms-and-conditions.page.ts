import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TermsAndConditionsService } from 'src/app/services/terms-and-conditions.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {

  constructor(
    public authService : AuthService,
    private tacService : TermsAndConditionsService,
    private alertController : AlertController,
    private router : Router
  ) { }

  loading : boolean = false;

  ngOnInit() {
  }

  async agree(user_id){
    this.loading = true;
    const res = await this.tacService.agree(user_id);
    if(!(res.status > 199 && res.status < 300)){
      const alert = await this.alertController.create({
        message: res.data.message,
        header: "Unexpected Error",
        buttons: ["Ok"]
      });
      await alert.present();
      this.loading = false;
      return;
    }
    this.loading = false;
    const user = this.authService.getAuth();
    user.terms_and_condition = 1;
    localStorage.setItem("user", JSON.stringify(user));
    this.router.navigate(["/profile"]);
  }

}
