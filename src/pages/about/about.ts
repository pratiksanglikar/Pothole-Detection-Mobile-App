import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers: [Geolocation, DeviceMotion, DeviceOrientation]
})
export class AboutPage {

    private latitude: any = 'abc';
    private longitude: any = 'xyz';
    private heading: any = 'heading';
    private speed: any = 'speed';
    private acceleration: any = {};
    private deviceOrientationData: any = {};

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              private deviceMotion: DeviceMotion,
              private deviceOrientation: DeviceOrientation) {
      // if (this.platform.is('cordova')) {
          this.initializeGeolocation();
          this.initializeDeviceMotion();
          this.initializeDeviceOrientation();
      // } else {
      //
      // }

  }

  initializeGeolocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          this.heading = resp.coords.heading;
          this.speed = resp.coords.speed;
      }).catch((error) => {
          console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition({maximumAge: 0, enableHighAccuracy: true});
      watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          this.latitude = data.coords.latitude;
          this.longitude = data.coords.longitude;
      });
  }

  initializeDeviceMotion() {
      // Get the device current acceleration
      this.deviceMotion.getCurrentAcceleration().then(
          (acceleration: DeviceMotionAccelerationData) => {
              this.acceleration = acceleration;
              console.log(acceleration)
          },
          (error: any) => console.log(error)
      );

      // Watch device acceleration
      this.deviceMotion.watchAcceleration({frequency: 1}).subscribe((acceleration: DeviceMotionAccelerationData) => {
          this.acceleration = acceleration;
          console.log(acceleration);
      });
  }

  initializeDeviceOrientation() {
      // Get the device current compass heading
      this.deviceOrientation.getCurrentHeading().then(
          (data: DeviceOrientationCompassHeading) => {
              this.deviceOrientationData = data;
              console.log(data)
          },
                  (error: any) => console.log(error)

      );

      // Watch the device compass heading change
      this.deviceOrientation.watchHeading({frequency: 1}).subscribe(
          (data: DeviceOrientationCompassHeading) => {
              this.deviceOrientationData = data;
              console.log(data)
          }
      );
  }
}
