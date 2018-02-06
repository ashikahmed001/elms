import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {commonMethods} from '../../helper/common-methods';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signInForm: FormGroup;  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private _Cmmethods:commonMethods,
    private formBuilder: FormBuilder,
    private authService: AuthServiceProvider) {
    this.signInForm = this.formBuilder.group({
      userid: [null, ([Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}$'),Validators.required])],
      password: [null, Validators.compose ( [ Validators.required ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  navToSignup() {
    this.navCtrl.push('SignupPage');
  }

  signIn() {
    this._Cmmethods.InitializeLoader();
    this.authService.signIn(this.signInForm.value).then(res=>{
      if(res!=null || res!=undefined)
      this.navCtrl.setRoot("HomePage");
      this._Cmmethods.loader.dismiss();
    },err=>{
      var errorCode = err.code;
      var errorMessage = err.message;
      this._Cmmethods.loader.dismiss();
      this.authService.presentToast(errorMessage);
    });
  }

}
