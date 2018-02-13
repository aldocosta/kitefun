import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MdSearchPage } from '../pages/md-search/md-search';
import { ListPage } from '../pages/list/list';

import { EstadoServices } from '../pages/services/estado-services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherapiProvider } from '../providers/weatherapi/weatherapi';
import { ConfigProvider } from '../providers/config/config';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,    
    MdSearchPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,    
    MdSearchPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EstadoServices,    
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherapiProvider,
    ConfigProvider,
    LocalStorageProvider
  ]
})
export class AppModule {}
