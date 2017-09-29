# hypertrack-cordova
Cordova plugin wrapper for hypertrack-android and hypertrack-ios. The [example-cordova](https://github.com/hypertrack/example-cordova/) app is built on top of this plugin.

[![Slack Status](http://slack.hypertrack.io/badge.svg)](http://slack.hypertrack.io) [![npm version](https://badge.fury.io/js/cordova-plugin-hypertrack.svg)](https://badge.fury.io/js/cordova-plugin-hypertrack)

> In case you are looking for an SDK to build an app with a common codebase for Android and iOS from scratch, you can also use the [react-native-hypertrack](https://github.com/hypertrack/react-native-hypertrack/) wrapper.

## New app
Refer to the **Create your first Cordova app** guide [here](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) in case you are building a new app.

## Requirements
- Configure the pre-requisites required for building a Cordova application which have been detailed out [here](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#install-pre-requisites-for-building).
- Make sure the installed Cordova version is `6.4.0`. In case not, you can update Cordova by running the command
```
$ cordova --version
$ npm install -g cordova
```

## Usage
Before you can set up the HyperTrack plugin, we need to first set-up the dependencies for iOS as given below. For Android, the plugin configures the dependencies automatically.

### Install the plugin
To install the plugin, use the following command in your app directory.
```
$ cordova plugin add cordova-plugin-hypertrack
```

In your app's `config.xml` set a new preference key `HYPERTRACK_PK` with your publishable key as the value. This key will be used by the native SDKs. Read this to [get API keys](https://docs.hypertrack.com/gettingstarted/authentication.html), if you don't have them already.
```
<preference name="HYPERTRACK_PK" value="YOUR_PUBLISHABLE_KEY" />
```

### iOS
The SDK requires Location (When in Use) and Motion permissions to track locations and activity. iOS requires you to set a reason for these permissions, which is displayed in the dialog box to the user. In your project's info settings, add the following Keys, with relevant Values.
```
Key: Privacy - Location When In Use Usage Description, Value: Required to access location data. (or your reason)
Key: Privacy - Motion Usage Description, Value: Required to access activity data. (or your reason)
```

To add swift support to your project, use this plugin (TODO).
```
$ cordova plugin add cordova-plugin-add-swift-support --save
```

## Plugin methods
To use the plugin in a Cordova application, just use the `hypertrack` object. All methods are defined below, and also in the [HyperTrack.js](https://github.com/hypertrack/hypertrack-cordova/blob/master/www/HyperTrack.js) file.

```
var hypertrack = cordova.plugins.HyperTrack;

// To get or create user with a name, phone number and unique internal id (eg, 001ABC)
hypertrack.getOrCreateUser("TestName", "+16102563456", "001ABC", success, error);

// To start tracking
hypertrack.startTracking(success, error);

// To stop tracking
hypertrack.stopTracking(success, error);

// To create an action, pass action type, action lookup id, action expected place address, expected place latitude, expected place longitude (all fields are optional)
hypertrack.createAndAssignAction('visit', 'lookupId', 'Ferry building, San Francisco', 37.79557, -122.39550, success, error);
```

## Documentation
The HyperTrack documentation is at [docs.hypertrack.com](http://docs.hypertrack.com/)

## Support
For any questions, please reach out to us on [Slack](http://slack.hypertrack.io/) or on help@hypertrack.io. Please create an [issue](https://github.com/hypertrack/hypertrack-cordova/issues) for bugs or feature requests.
