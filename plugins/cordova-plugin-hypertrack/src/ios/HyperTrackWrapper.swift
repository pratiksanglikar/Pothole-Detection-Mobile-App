/*
 *
 */

//import HyperTrack


@objc(HyperTrackWrapper) class HyperTrackWrapper : CDVPlugin {

    override func pluginInitialize () {
        // TODO - use settings
//        HyperTrack.initialize("pk_publishableKey")
    }
    
    func helloWorld(command: CDVInvokedUrlCommand) {
        let msg = command.arguments[0] as? String ?? ""
        let pluginResult = CDVPluginResult(
            status: CDVCommandStatus_OK,
            messageAs: msg
        )

        self.commandDelegate!.send(
            pluginResult,
            callbackId: command.callbackId
        )
    }
    
    func createUser(command: CDVInvokedUrlCommand) {
        
//        commandDelegate!.sendPluginResult(result, callbackId: command.callbackId)
    }
    
    func setUserId(command: CDVInvokedUrlCommand) {
        
    }
    
    func startTracking(command: CDVInvokedUrlCommand) {
        
    }
    
    func stopTracking(command: CDVInvokedUrlCommand) {
        
    }
    
    func completeAction(command: CDVInvokedUrlCommand) {
        
    }
}
