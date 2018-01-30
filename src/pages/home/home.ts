import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PipesModule } from './../../pipes/pipes.module';
import * as firebase from 'firebase';
import { LeaveServiceProvider } from '../../providers/leave-service/leave-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Leave } from '../../models/leave.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public user: Observable<firebase.User>;
  cards: any;
  slides: Slides;
  leaves$: Observable<Leave[]>;
  userInfo$: User;
  teamInfo$: any[] = [];
  leavesToday$: any[] = [];
  leavesTmrw$: any[] = [];
  _authId: string;
  _authEmail:string;
  sliderImg$: any[] = [];
  sliderImgurl$ : any[]= [];
  badgeCount: number;
  d: Date = new Date(new Date().setHours(0, 0, 0, 0));
  t: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  tdydate: any = this.d.getFullYear() + "-" + this.d.getMonth() + 1 + "-" + this.d.getDate();
  tmrdate: any = this.t.getFullYear() + "-" + this.t.getMonth() + 1 + "-" + this.t.getDate();
  tdate: Date;
  tmdate: Date;
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public leaveService: LeaveServiceProvider,
    public toastCtrl: ToastController,
    private userService: UserServiceProvider) {
    this.tdate = new Date(this.tdydate);
    this.tmdate = new Date(this.tmrdate);
    this.cards = new Array(10);
    // this.user = this.afAuth.authState;
    //console.log(this.afAuth.auth);
    if (this.afAuth.auth.currentUser != null) {
      this._authId = this.afAuth.auth.currentUser.email;
    }
    //this.getUserContext();
    this.getUserContextNew();
    //this.bindLeaveCarosol();
    this.bindSlider();
  }

  bindLeaveCarosol() {
    let isManager = localStorage.getItem('isManagerRole');
    let myTeam = localStorage.getItem('myTeam');
    let myId = localStorage.getItem('myId');
   
    this.leaveService.getLeavelstByDateRange(isManager, myTeam, this.tdate, this.tdate, myId)
      .subscribe(result => {
        let tDate = this.tdate;
        this.leavesToday$ = _.filter(result, function (query) {
          return query.to >= tDate;
        });
        this.leaveService.getLeavelstByDateRange(isManager, myTeam, this.tmdate, this.tmdate, myId)
        .subscribe(tmr=>{
          let tmDate = this.tmdate;
          this.leavesTmrw$ = _.filter(tmr, function (query) {
            return query.to >= tmDate;
          });
      });
    });
  }

  bindSlider() {
    this.sliderImg$ = [
      "assets/imgs/LMS1.jpg",
      "assets/imgs/LMS2.jpg",
      "assets/imgs/LMS3.jpg"
    ];
  }

  ionViewDidLoad() {
    this.badgeCount = 0;
  }

  openSearch() {
    this.navCtrl.push("SearchLeavesPage");
  }

  openNotifications() {
    this.navCtrl.push("NotificationsPage");
  }

  openSeealltdy() {
    this.navCtrl.push("SeeAllTdyPage");
  }

  openSeealltmrw() {
    this.navCtrl.push("SeeAllTmrwPage");
  }

  openReports() {
    this.navCtrl.push("ReportPage");
  }

  openNewLeave() {
    this.navCtrl.push("NewLeavePage");
  }

  getUserContext() {
    this.userService.getLoggedInUsersMetaInfo(this._authId)
      .subscribe(result => {
        localStorage.setItem('myId', result[0].id);
        localStorage.setItem('myName', result[0].data.name);
        localStorage.setItem('myphotoUrl', result[0].data.photoUrl);
        localStorage.setItem('myTeam', result[0].data.team);
        localStorage.setItem('myEmail', result[0].data.email);
        localStorage.setItem('myMobile', result[0].data.phoneNumber);
        localStorage.setItem('myManager', result[0].data.manager);
        localStorage.setItem('isManagerRole', result[0].data.isManagerRole);
      }, err => {
        console.log(err);
        this.showToast(err);
      });
  }

  getUserContextNew() {
    this.userService.getUserById(this._authId)
      .subscribe(result => {
        let userContext:any={
          "name":result.name,
          "email":result.email,
          "photoUrl":result.photoUrl,
          "phoneNumber":result.phoneNumber
        };
        localStorage.setItem('userContext',JSON.stringify(userContext));
      }, err => {
        console.log(err);
        this.showToast(err);
      });
  }

  ngOnInit() {
    this.leaveService
      .getBadgeCount(localStorage.getItem('isManagerRole'))
      .subscribe(result => {
        this.badgeCount = result.length;
      }, err => {
        console.log(err);
        this.showToast(err);
      });
  }



  showToast(alert_message: string) {
    let toast = this.toastCtrl.create({
      message: alert_message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present(toast);
  }
}
