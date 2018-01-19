import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LeaveServiceProvider } from '../../providers/leave-service/leave-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { Leave } from '../../models/leave.model';
import * as _ from "lodash";
import * as firebase from "firebase";
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{  
  cards: any;
  leaves$:Observable<Leave[]>;
  userInfo$:User;
  teamInfo$:any[]= [];
  teamLeaves$:any[] = [];
  _authId:string = firebase.auth().currentUser.uid; 
  badgeCount:number;
  constructor(
    public navCtrl: NavController,
    public leaveService: LeaveServiceProvider,
    public auth: AuthServiceProvider,
    private userService:UserServiceProvider) {
    this.cards = new Array(10);
    this.getUserContext();
    this.bindLeaveCarosol();
  }

  bindLeaveCarosol(){
    //this.leaves$ = this.leaveService.getLeavesByUser(this.loggedInUserId);
  }

  ionViewDidLoad() {
    this.badgeCount = 0;
  }

  openNotifications() {
    this.navCtrl.push("NotificationsPage");
  }

  openReports() {
    this.navCtrl.push("ReportPage");
  }

  openNewLeave() {
    this.navCtrl.push("NewLeavePage");
  }

  async getUserContext(){
    await this.userService.getLoggedInUsersMetaInfo(this._authId)
    .subscribe(result=>{
        localStorage.setItem('myId',result[0].id);
        localStorage.setItem('myName',result[0].data.name);
        localStorage.setItem('myphotoUrl',result[0].data.photoUrl);
        localStorage.setItem('myTeam',result[0].data.team);
        localStorage.setItem('myManager',result[0].data.manager);
        localStorage.setItem('isManagerRole',result[0].data.isManagerRole);
    });
  }

  filterLeavesByDate(startDt?:Date, endDate?:Date){
    if(this.teamLeaves$.length > 0){
      //fetch only approved leaves of my team memebers
      let filteredResult =  _.filter(this.teamLeaves$,{ status: 1 });
      return filteredResult;
    }
    return "";
  }

  async ngOnInit(){
    await this.leaveService
              .getBadgeCount(localStorage.getItem('isManagerRole'))
              .subscribe(result=>{
                this.badgeCount = result.length;
              });                                         
  }

  SearchRecords(){
    this.navCtrl.push("SearchLeavesPage",{ UserInfo: this.userInfo$[0]});
  }
}
