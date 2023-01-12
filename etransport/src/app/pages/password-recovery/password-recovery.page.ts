import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ErrorHandlerService } from '../../helpers/error-handler.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  constructor(
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private router : Router
  ) { }

  // 
  user : any = {};
  email : string = '';
  verification_code : any = null;

  change_password_form_errors : any = {};
  change_password_form : any = {
    password: null,
    password_confirmation: null
  }

  phase : number = 1;
  passwordVisibility : boolean = false;

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.change_password_form = {
      password : null,
      password_confirmation : null,
    }
    this.email = '';
    this.phase = 1;
    this.passwordVisibility = false;
  }

  async sendRecoveryCode(){
      await this.userService.sendRecoveryCode(this.email).then((res) => {
        if(res){
          this.user = res;
          console.log(this.user);
          this.phase = 2;
        }
      });
  }

  togglePasswords(){
    this.passwordVisibility = !this.passwordVisibility;
  }

  async changePassword(){
    this.userService.changePassword(this.change_password_form, this.user)
    .then(res => {
      console.log(res);
      this.router.navigate(['/signin']);
    })
    .catch(err => {
      console.log(err);
      
      if(err.response.data.errors){
        this.change_password_form_errors = err.response.data.errors;
      }
    })
  }

  async checkRecoveryCode(){
    await this.userService.verifyRecoveryCode(this.verification_code, this.user)
    .then(res => {
      this.phase = 3;
    });
  }

}
