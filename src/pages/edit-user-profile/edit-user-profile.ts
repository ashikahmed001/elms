import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-user-profile',
  templateUrl: 'edit-user-profile.html',
})
export class EditUserProfilePage {

  profileForm: FormGroup;
  loggedInUserId:string = firebase.auth().currentUser.uid;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public authService: AuthServiceProvider) {
      this.profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        manager: ['', Validators.required],
        team: ['', Validators.required]
      });
  }
  
  updateProfile(){
    this.userService.updateUserByKey(this.loggedInUserId,this.profileForm.value);
  }
}
