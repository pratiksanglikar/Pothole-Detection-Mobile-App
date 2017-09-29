var exec = require('cordova/exec');
var hypertrack = {}


// Helper method to test sdk
hypertrack.helloWorld = function(text, success, error) {
    exec(success, error, "HyperTrack", "helloWorld", [text]);
};


// Method to get or create a new user. Use name to specify the name of the user.
// phone to specify phone number, lookupId to specify internal id of the user, 
// and user's photo (either as a URL or a Base64 converted string)
// lookupId is used to check if a new user is to be created.
hypertrack.getOrCreateUser = function(name, phone, photo, lookupId, success, error) {
    exec(success, error, "HyperTrack", "getOrCreateUser", [name, phone, photo, lookupId]);
};


// Method to set a user id, if you already have a user object previously created.
hypertrack.setUserId = function(userId, success, error) {
    exec(success, error, "HyperTrack", "setUserId", [userId]);
};


// Method to start tracking. This will fail if there is no user set.
hypertrack.startTracking = function(success, error) {
    exec(success, error, "HyperTrack", "startTracking", [   ])
};


// Method to create and assign an action.
hypertrack.createAndAssignAction = function(type, lookupId, expectedPlaceAddress, expectedPlaceLatitude, expectedPlaceLongitude, success, error) {
    exec(success, error, "HyperTrack", "createAndAssignAction", [type, lookupId, expectedPlaceAddress, expectedPlaceLatitude, expectedPlaceLongitude])
}


// Method to mark a specific action as complete.
hypertrack.completeAction = function(actionId, success, error) {
    exec(success, error, "HyperTrack", "completeAction", [actionId])
};


// Method to mark a specific action as complete using a lookupId 
// specified while creating an action as parameter.
hypertrack.completeActionWithLookupId = function(lookupId, success, error) {
    exec(success, error, "HyperTrack", "completeActionWithLookupId", [lookupId])
};


// Method to stop tracking.
hypertrack.stopTracking = function(success, error) {
    exec(success, error, "HyperTrack", "stopTracking", [])
};


// Method to get current location in callback
hypertrack.getCurrentLocation = function(success, error) {
    exec(success, error, "HyperTrack", "getCurrentLocation", [])
};


// Method to check if Location Permission is available to the app or not
hypertrack.checkLocationPermission = function (success, error) {
	exec(success, error, "HyperTrack", "checkLocationPermission", [])
};


// Method to request user for granting location permission to the app
hypertrack.requestPermissions = function (success, error) {
	exec(success, error, "HyperTrack", "requestPermissions", [])
};


// Method to check if Location Services are enabled on the device or not
hypertrack.checkLocationServices = function (success, error) {
	exec(success, error, "HyperTrack", "checkLocationServices", [])
};


// Method to request user to enable location services on the device
hypertrack.requestLocationServices = function (success, error) {
	exec(success, error, "HyperTrack", "requestLocationServices", [])
};


module.exports = hypertrack
