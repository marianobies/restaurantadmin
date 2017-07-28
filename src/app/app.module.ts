import { MesasPage } from './../pages/mesas/mesas';
import { PopoverMenu } from './../pages/popovermenu/popovermenu';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RealtimedbProvider } from '../providers/realtimedb/realtimedb';
import { HttpModule } from "@angular/http";
import { KeysPipe } from '../pipes/keys/keys';

const config = {
    apiKey: "AIzaSyAeCIxYZeT_ewhQDmfVLP_Hcq_WqxmWn5g",
    authDomain: "restaurant-7dad2.firebaseapp.com",
    databaseURL: "https://restaurant-7dad2.firebaseio.com",
    projectId: "restaurant-7dad2",
    storageBucket: "restaurant-7dad2.appspot.com",
    messagingSenderId: "510742242337"
  }; 

@NgModule({
  declarations: [
    MyApp,
    PopoverMenu,
    HomePage,
    MesasPage,
    ListPage,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverMenu,
    HomePage,
    MesasPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RealtimedbProvider
  ]
})
export class AppModule {}
