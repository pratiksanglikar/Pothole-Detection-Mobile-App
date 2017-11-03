import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {PropertyListPage} from '../pages/property-list/property-list';
import {PropertyDetailPage} from '../pages/property-detail/property-detail';
import {BrokerListPage} from '../pages/broker-list/broker-list';
import {BrokerDetailPage} from '../pages/broker-detail/broker-detail';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';
import {HomePage} from "../pages/home/home";

import {PropertyService} from "../providers/property-service-mock";
import {BrokerService} from "../providers/broker-service-mock";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HyperTrack} from '@ionic-native/hyper-track';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation} from '@ionic-native/geolocation';
import {NguiMapModule} from '@ngui/map';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        MyApp,
        WelcomePage,
        AboutPage,
        PropertyListPage,
        PropertyDetailPage,
        FavoriteListPage,
        BrokerListPage,
        BrokerDetailPage,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        NguiMapModule.forRoot({
            apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing&key=AIzaSyCdPH2Kol4ekqjPlrpcYZo2Mb8I90z3r8o'
        }),
        FormsModule,
        ReactiveFormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        WelcomePage,
        AboutPage,
        PropertyListPage,
        PropertyDetailPage,
        FavoriteListPage,
        BrokerListPage,
        BrokerDetailPage,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        PropertyService,
        BrokerService,
        HyperTrack,
        BackgroundGeolocation,
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
