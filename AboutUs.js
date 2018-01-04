// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Set the commmunicator and constant class for Web service calling
// var Communicator = Alloy.Globals.Communicator;
// var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

$.webview.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

// Create the left and Right navigation Button and set the Home screen title with language


/*
 * Function for open left drawer menu from home screen
 */
function openMenu() {

	Alloy.Globals.openLeft();

}
var text = "Loresf  sjkldf sjklf kl askldf klsjdkfj dkjf fjkdjf kdsj sd skldf s fs jf sf skjfklsjklf sk fkl sf aks dfkjs dfklsdkf lk sdfk jsdklfjksjfkl f d fkdjkfjkdlf kds f slkfjksdl fklds";
var html2as = require('nl.fokkezb.html2as');

html2as(text, function(err, as) {

	if (err) {
		console.error(err);

	} else {

		$.webview.attributedString = as;
		

	}
});
function openFunc(e) {
	//aboutUsService();
}

/*
 function aboutUsService() {

 if (Ti.Network.online) {
 Alloy.Globals.LoadingScreen.open();
 Communicator.get("http://myhotelsapp.com/api/api.php?action=AboutUs&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"), aboutUsServiceCallback);
 Ti.API.info('URL : ' + "http://myhotelsapp.com/api/api.php?action=AboutUs&" + "language=" + Ti.App.Properties.getString("locale") + "&hotel_id=" + Ti.App.Properties.getString("hotel_id"));
 } else {
 Alloy.Globals.Alert(Alloy.Globals.langConvert("internat_connection_message"));

 }
 }

 function aboutUsServiceCallback(e) {
 Ti.API.info("aboutUsServiceCallback Callback response : " + JSON.stringify(e));
 if (e.success) {
 try {
 // Ti.API.info('response ' + e.response);
 var response = JSON.parse(e.response);

 if (response != null) {
 Ti.API.info('response.action_success = ' + JSON.stringify(response));
 if (response.success == '1') {
 // $.webview.data = response.content;
 var html2as = require('nl.fokkezb.html2as');

 html2as(response.content, function(err, as) {

 if (err) {
 console.error(err);

 } else {

 $.webview.attributedString = as;
 //	$.webview4.attributedString = as;
 if (lang == "en") {
 //$.webview.textAlign = "left";
 } else {
 //$.webview.textAlign = "right";
 }

 }
 });
 } else {
 Alloy.Globals.Alert(response.msg);
 }

 } else {
 Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);

 }
 } catch(e) {
 Ti.API.info('Error social Login List :: ' + e.message);

 }

 } else {
 Alloy.Globals.Alert(Alloy.Globals.langConvert("network_validation"));

 }

 Alloy.Globals.LoadingScreen.close();

 }*/

