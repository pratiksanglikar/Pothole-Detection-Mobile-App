package io.hypertrack.cordova;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import android.content.Context;
import android.support.annotation.NonNull;
import android.location.Location;

import com.hypertrack.lib.HyperTrack;
import com.hypertrack.lib.HyperTrackConstants;
import com.hypertrack.lib.callbacks.HyperTrackCallback;
import com.hypertrack.lib.callbacks.HyperTrackEventCallback;
import com.hypertrack.lib.internal.transmitter.models.HyperTrackEvent;
import com.hypertrack.lib.models.ErrorResponse;
import com.hypertrack.lib.models.SuccessResponse;
import com.hypertrack.lib.models.User;
import com.hypertrack.lib.models.Place;
import com.hypertrack.lib.models.Action;
import com.hypertrack.lib.models.ActionParams;
import com.hypertrack.lib.models.ActionParamsBuilder;

/**
 * This class calls SDK methods.
 */
public class HyperTrackWrapper extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Context context = this.cordova.getActivity().getApplicationContext();
        HyperTrack.initialize(context, this.getHyperTrackKey());
        HyperTrack.setSDKPlatform("Cordova");
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("helloWorld")) {
            String name = args.getString(0);
            this.helloWorld(name, callbackContext);
            return true;
        }

        if (action.equals("getOrCreateUser")) {
            String name = args.getString(0);
            String phone = args.getString(1);
            String photo = args.getString(2);
            String lookupId = args.getString(3);
            this.getOrCreateUser(name, phone, photo, lookupId, callbackContext);
            return true;
        }

        if (action.equals("setUserId")) {
            String userId = args.getString(0);
            this.setUserId(userId, callbackContext);
            return true;
        }

        if (action.equals("startTracking")) {
            this.startTracking(callbackContext);
            return true;
        }

        if (action.equals("createAndAssignAction")) {
            String type = args.getString(0);
            String lookupId = args.getString(1);
            String expectedPlaceAddress = args.getString(2);
            Double expectedPlaceLatitude = args.getDouble(3);
            Double expectedPlaceLongitude = args.getDouble(4);
            this.createAndAssignAction(type, lookupId, expectedPlaceAddress,
                                       expectedPlaceLatitude, expectedPlaceLongitude,
                                       callbackContext);
            return true;
        }

        if (action.equals("completeAction")) {
            String actionId = args.getString(0);
            this.completeAction(actionId, callbackContext);
            return true;
        }

        if (action.equals("completeActionWithLookupId")) {
            String lookupId = args.getString(0);
            this.completeActionWithLookupId(lookupId, callbackContext);
            return true;
        }

        if (action.equals("stopTracking")) {
            this.stopTracking(callbackContext);
            return true;
        }

        if (action.equals("getCurrentLocation")) {
            this.getCurrentLocation(callbackContext);
            return true;
        }

        if (action.equals("checkLocationPermission")) {
            this.checkLocationPermission(callbackContext);
            return true;
        }

        if (action.equals("requestPermissions")) {
            this.requestPermissions();
            return true;
        }

        if (action.equals("checkLocationServices")) {
            this.checkLocationServices(callbackContext);
            return true;
        }

        if (action.equals("requestLocationServices")) {
            this.requestLocationServices();
            return true;
        }

        return false;
    }

    private String getHyperTrackKey() {
        return preferences.getString("HYPERTRACK_PK", "");
    }

    private void helloWorld(String name, CallbackContext callbackContext) {
        callbackContext.success(name);
    }

    private void getOrCreateUser(String name, String phone, String photo, String lookupId, final CallbackContext callbackContext) {
        HyperTrack.getOrCreateUser(name, phone, photo, lookupId, new HyperTrackCallback() {
            @Override
            public void onSuccess(@NonNull SuccessResponse response) {
                // Return User object in successCallback
                User user = (User) response.getResponseObject();
                String serializedUser = new GsonBuilder().create().toJson(user);
                callbackContext.success(serializedUser);
            }

            @Override
            public void onError(@NonNull ErrorResponse errorResponse) {
                String serializedError = new GsonBuilder().create().toJson(errorResponse);
                callbackContext.error(serializedError);
            }
        });
    }

    private void setUserId(String userId, final CallbackContext callbackContext) {
        HyperTrack.setUserId(userId);
        callbackContext.success();
    }

    private void startTracking(final CallbackContext callbackContext) {
        HyperTrack.startTracking(new HyperTrackCallback() {
            @Override
            public void onSuccess(@NonNull SuccessResponse response) {
                // Return User object in successCallback
                String userId = (String) response.getResponseObject();
                callbackContext.success(userId);
            }

            @Override
            public void onError(@NonNull ErrorResponse errorResponse) {
                String serializedError = new GsonBuilder().create().toJson(errorResponse);
                callbackContext.error(serializedError);
            }
        });
    }

    private void createAndAssignAction(String type, String lookupId, String expectedPlaceAddress,
                                       Double expectedPlaceLatitude, Double expectedPlaceLongitude,
                                       final CallbackContext callbackContext) {
        Place expectedPlace = new Place().setLocation(expectedPlaceLatitude, expectedPlaceLongitude)
            .setAddress(expectedPlaceAddress);

        ActionParams actionParams = new ActionParamsBuilder()
            .setExpectedPlace(expectedPlace)
            .setLookupId(lookupId)
            .setType(type)
            .build();

        HyperTrack.createAndAssignAction(actionParams, new HyperTrackCallback() {
            @Override
            public void onSuccess(@NonNull SuccessResponse response) {
                // Handle createAndAssignAction success here
                Action action = (Action) response.getResponseObject();
                String serializedAction = new GsonBuilder().create().toJson(action);
                callbackContext.success(serializedAction);
            }

            @Override
            public void onError(@NonNull ErrorResponse errorResponse) {
                // Handle createAndAssignAction error here
                String serializedError = new GsonBuilder().create().toJson(errorResponse);
                callbackContext.error(serializedError);
            }
        });
    }

    private void completeAction(String actionId, final CallbackContext callbackContext) {
        HyperTrack.completeAction(actionId);
        callbackContext.success();
    }

    private void completeActionWithLookupId(String lookupId, final CallbackContext callbackContext) {
        HyperTrack.completeActionWithLookupId(lookupId);
        callbackContext.success();
    }

    private void stopTracking(final CallbackContext callbackContext) {
        HyperTrack.stopTracking();
        callbackContext.success();
    }

    private void getCurrentLocation(final CallbackContext callbackContext) {
        HyperTrack.getCurrentLocation(new HyperTrackCallback() {
            @Override
            public void onSuccess(@NonNull SuccessResponse response) {
                // Handle getCurrentLocation API success here
                Location location = (Location) response.getResponseObject();
                String serializedLocation = new GsonBuilder().create().toJson(location);
                callbackContext.success(serializedLocation);
            }

            @Override
            public void onError(@NonNull ErrorResponse errorResponse) {
                // Handle getCurrentLocation API error here
                String serializedError = new GsonBuilder().create().toJson(errorResponse);
                callbackContext.error(serializedError);
            }
        });
    }

    private void checkLocationPermission(final CallbackContext callbackContext) {
        if (HyperTrack.checkLocationPermission(this.cordova.getActivity().getApplicationContext())) {
            callbackContext.success("true");
        } else {
            callbackContext.success("false");
        }
    }

    private void requestPermissions() {
        HyperTrack.requestPermissions(this.cordova.getActivity());
    }

    private void checkLocationServices(final CallbackContext callbackContext) {
        if (HyperTrack.checkLocationServices(this.cordova.getActivity().getApplicationContext())) {
            callbackContext.success("true");
        } else {
            callbackContext.success("false");
        }
    }

    private void requestLocationServices() {
        HyperTrack.requestLocationServices(this.cordova.getActivity(), null);
    }
}
