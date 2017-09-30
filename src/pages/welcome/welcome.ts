import {Component, NgZone} from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion';
import {DeviceOrientation, DeviceOrientationCompassHeading} from '@ionic-native/device-orientation';
import {Http} from '@angular/http';
import { NativeAudio } from '@ionic-native/native-audio';
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';


@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
    providers: [Geolocation, DeviceMotion, DeviceOrientation, NativeAudio, Media]
})
export class WelcomePage {

    private latitude: any = '';
    private longitude: any = '';
    private heading: any = '';
    private speed: any = '';
    private acceleration: any = {};
    private initialAcceleration = null;
    private deviceOrientationData: any = {};
    private watching: boolean = false;

    private locationWatcher = null;
    private motionWatcher = null;
    private orientationWatcher = null;

    private startDisabled = false;
    private stopDisabled = true;

    private url: string = "http://pothole.us-west-1.elasticbeanstalk.com/pushData";

    private deviceData: any[] = [];

    private file: MediaObject = null;

    constructor(private geolocation: Geolocation,
                private zone: NgZone,
                private deviceMotion: DeviceMotion,
                private backgroundGeolocation: BackgroundGeolocation,
                private deviceOrientation: DeviceOrientation,
                private http: Http,
                private nativeAudio: NativeAudio,
                public platform: Platform,
                private media: Media) {

        this.platform.ready().then(() => {
            this.file = this.media.create('assets/sound/Ohhh.mp3');
            this.file.play();
        });
    }

    initializeGeolocation() {
        let config = {
            desiredAccuracy: 1,
            stationaryRadius: 10,
            distanceFilter: 1,
            debug: true,
            interval: 20
        };

        this.backgroundGeolocation.configure(config).subscribe((location) => {

            console.log('Background Geo-location:  ' + location.latitude + ',' + location.longitude);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.latitude = location.latitude;
                this.longitude = location.longitude;
            });

        }, (err) => {
            console.log(err);
        });

        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();


        // Foreground Tracking

        let options = {
            frequency: 30,
            enableHighAccuracy: true
        };

        this.locationWatcher = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {

            console.log(position);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.speed = position.coords.speed;
                this.heading = position.coords.heading;
            });
        });
    }

    initializeDeviceMotion() {
        this.deviceMotion.getCurrentAcceleration().then(
            (acceleration: DeviceMotionAccelerationData) => {
                if(!this.initialAcceleration) {
                    this.initialAcceleration = this.calculateMagnitude(this.acceleration);
                }
                this.acceleration = acceleration;
            },
            (error: any) => console.log(error)
        );

        this.motionWatcher = this.deviceMotion.watchAcceleration({frequency: 20}).subscribe((acceleration: DeviceMotionAccelerationData) => {
            this.acceleration = acceleration;
            let currentAccl = this.calculateMagnitude(this.acceleration);
            if(Math.abs(currentAccl - this.initialAcceleration) > 3) {
            this.deviceData.push({
                "GPS": [this.longitude, this.latitude],
                "x": this.acceleration.x,
                "y": this.acceleration.y,
                "z": this.acceleration.z,
                "heading": this.heading,
                "speed": this.speed,
                "timestamp": this.acceleration.timestamp,
                "deviceOrientation": this.deviceOrientation,
                "intensity": currentAccl
                });
                this.file.play();
            }
        });
    }

    calculateMagnitude(acceleration: any) {
        if(acceleration == null) {
            return 0;
        }
        return Math.sqrt((acceleration.x * acceleration.x
            + acceleration.y * acceleration.y + acceleration.z * acceleration.z) / 2);
    }

    initializeDeviceOrientation() {
        this.deviceOrientation.getCurrentHeading().then(
            (data: DeviceOrientationCompassHeading) => {
                this.deviceOrientationData = data;
            },
            (error: any) => console.log(error)
        );

        this.orientationWatcher = this.deviceOrientation.watchHeading({frequency: 20}).subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.deviceOrientationData = data;
                this.deviceData.push({
                    "GPS": [this.longitude, this.latitude],
                    "x": this.acceleration.x,
                    "y": this.acceleration.y,
                    "z": this.acceleration.z,
                    "heading": this.heading,
                    "speed": this.speed,
                    "timestamp": this.acceleration.timestamp,
                    "deviceOrientation": this.deviceOrientation
                });
            }
        );
    }

    startWatching() {
        this.toggleDisabled();
        this.watching = true;
        this.initializeGeolocation();
        this.initializeDeviceMotion();
        this.initializeDeviceOrientation();
        this.startSending();
    }

    startSending() {
        setInterval(() => {
            if (this.watching) {
                this.http.post(this.url, this.deviceData).subscribe(res => {
                    console.log(JSON.stringify(res));
                    this.deviceData = [];
                }, err => {
                    alert(err.status);
                });
            }
        }, 1000 * 30);
    }


    stopWatching() {
        this.watching = false;
        this.toggleDisabled();
        this.backgroundGeolocation.finish();
        this.locationWatcher.unsubscribe();
        this.motionWatcher.unsubscribe();
        this.orientationWatcher.unsubscribe();
    }

    toggleDisabled() {
        this.startDisabled = !this.startDisabled;
        this.stopDisabled = !this.stopDisabled;
    }

}
