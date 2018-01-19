import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { MyLeavesPage } from '../pages/my-leaves/my-leaves';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { LeaveServiceProvider } from '../providers/leave-service/leave-service';
import { NotificationService } from '../providers/notification-service/notification-service';
import { ReportTeamPage } from '../pages/report-team/report-team';
import { ReportAnnualPage } from '../pages/report-annual/report-annual';
import { ReportReporteePage } from '../pages/report-reportee/report-reportee';
import { TeamServiceProvider } from '../providers/team-service/team-service';
import { DetailsviewPage } from '../pages/detailsview/detailsview';
  
// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyA9t3RPOQndRBcyB0xXmceaVOxTh0eDwKQ",
  authDomain: "ee-lms.firebaseapp.com",
  databaseURL: "https://ee-lms.firebaseio.com",
  projectId: "ee-lms",
  storageBucket: "",
  messagingSenderId: "750036322505"
};

@NgModule({
  declarations: [
    MyApp,
    ReportTeamPage,
    ReportAnnualPage,
    ReportReporteePage,
    DetailsviewPage
  ],
  imports: [    
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReportTeamPage,
    ReportAnnualPage,
    ReportReporteePage,
    DetailsviewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UserServiceProvider,
    LeaveServiceProvider,
    NotificationService,
    TeamServiceProvider,
  ]
})
export class AppModule {}
