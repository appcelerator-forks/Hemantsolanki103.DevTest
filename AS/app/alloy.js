// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function() {
	var ACS = require('ti.cloud'),
	    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
	    username = Ti.App.Properties.getString('acs-username-' + env),
	    password = Ti.App.Properties.getString('acs-password-' + env);

	// if not configured, just return
	if (!env || !username || !password) {
		return;
	}

	/**
	 * Appcelerator Cloud (ACS) Admin User Login Logic
	 *
	 * fires login.success with the user as argument on success
	 * fires login.failed with the result as argument on error
	 **/
	ACS.Users.login({
		login : username,
		password : password,
	}, function(result) {
		if (env === 'development') {
			Ti.API.info('ACS Login Results for environment `' + env + '`:');
			Ti.API.info(result);
		}
		if (result && result.success && result.users && result.users.length) {
			Ti.App.fireEvent('login.success', result.users[0], env);
		} else {
			Ti.App.fireEvent('login.failed', result, env);
		}
	});

})();

var measurement = require('alloy/measurement');
Alloy.Globals.Map = require('ti.map');

if (OS_IOS) {
	var defaultWidth = 320;
	deviceWidth = Titanium.Platform.displayCaps.platformWidth;
	var scaleFactor = deviceWidth / defaultWidth;
	var UIToastView = require('KSToastView/KSToastView');
	var UIColor = require('UIKit/UIColor');
	var UIFont = require('UIKit/UIFont');

	UIToastView.ks_setAppearanceTextFont(UIFont.fontWithNameSize('Roboto-Medium', 13.00));
	UIToastView.ks_setAppearanceBackgroundColor(UIColor.colorWithRedGreenBlueAlpha(68 / 255.0, 67 / 255.0, 68 / 255.0, 0.800));
} else {

	deviceWidth = measurement.pxToDP(Titanium.Platform.displayCaps.platformWidth) * 0.0028;
	var scaleFactor = deviceWidth;
	Alloy.Globals.abx = require('com.alcoapps.actionbarextras');

}

function showAlert(strMessage) {
	if (OS_IOS) {

		UIToastView.ks_showToast(strMessage);
	} else {
		var toast = Ti.UI.createNotification({
			message : strMessage,
			duration : Ti.UI.NOTIFICATION_DURATION_LONG
		});
		toast.show();
	};

}

/**
 * Font Size Declaration
 * */

Alloy.Globals.size_1 = 1 * scaleFactor;
Alloy.Globals.size_2 = 2 * scaleFactor;
Alloy.Globals.size_3 = 3 * scaleFactor;
Alloy.Globals.size_4 = 4 * scaleFactor;
Alloy.Globals.size_5 = 5 * scaleFactor;
Alloy.Globals.size_6 = 6 * scaleFactor;
Alloy.Globals.size_7 = 7 * scaleFactor;
Alloy.Globals.size_8 = 8 * scaleFactor;
Alloy.Globals.size_9 = 9 * scaleFactor;
Alloy.Globals.size_10 = 10 * scaleFactor;
Alloy.Globals.size_11 = 11 * scaleFactor;
Alloy.Globals.size_12 = 12 * scaleFactor;
Alloy.Globals.size_13 = 13 * scaleFactor;
Alloy.Globals.size_14 = 14 * scaleFactor;
Alloy.Globals.size_15 = 15 * scaleFactor;
Alloy.Globals.size_16 = 16 * scaleFactor;
Alloy.Globals.size_17 = 17 * scaleFactor;
Alloy.Globals.size_18 = 18 * scaleFactor;
Alloy.Globals.size_19 = 19 * scaleFactor;
Alloy.Globals.size_20 = 20 * scaleFactor;
Alloy.Globals.size_21 = 21 * scaleFactor;
Alloy.Globals.size_22 = 22 * scaleFactor;
Alloy.Globals.size_23 = 23 * scaleFactor;
Alloy.Globals.size_24 = 24 * scaleFactor;
Alloy.Globals.size_25 = 25 * scaleFactor;
Alloy.Globals.size_26 = 26 * scaleFactor;
Alloy.Globals.size_27 = 27 * scaleFactor;
Alloy.Globals.size_28 = 28 * scaleFactor;
Alloy.Globals.size_29 = 29 * scaleFactor;
Alloy.Globals.size_30 = 30 * scaleFactor;
Alloy.Globals.size_31 = 31 * scaleFactor;
Alloy.Globals.size_32 = 32 * scaleFactor;
Alloy.Globals.size_33 = 33 * scaleFactor;
Alloy.Globals.size_34 = 34 * scaleFactor;
Alloy.Globals.size_35 = 35 * scaleFactor;
Alloy.Globals.size_36 = 36 * scaleFactor;
Alloy.Globals.size_37 = 37 * scaleFactor;
Alloy.Globals.size_38 = 38 * scaleFactor;
Alloy.Globals.size_39 = 39 * scaleFactor;
Alloy.Globals.size_40 = 40 * scaleFactor;
Alloy.Globals.size_41 = 41 * scaleFactor;
Alloy.Globals.size_42 = 42 * scaleFactor;
Alloy.Globals.size_43 = 43 * scaleFactor;
Alloy.Globals.size_44 = 44 * scaleFactor;
Alloy.Globals.size_45 = 45 * scaleFactor;
Alloy.Globals.size_46 = 46 * scaleFactor;
Alloy.Globals.size_47 = 47 * scaleFactor;
Alloy.Globals.size_48 = 48 * scaleFactor;
Alloy.Globals.size_49 = 49 * scaleFactor;
Alloy.Globals.size_50 = 50 * scaleFactor;
Alloy.Globals.size_51 = 51 * scaleFactor;
Alloy.Globals.size_52 = 52 * scaleFactor;
Alloy.Globals.size_53 = 53 * scaleFactor;
Alloy.Globals.size_54 = 54 * scaleFactor;
Alloy.Globals.size_55 = 55 * scaleFactor;
Alloy.Globals.size_56 = 56 * scaleFactor;
Alloy.Globals.size_60 = 60 * scaleFactor;
Alloy.Globals.size_65 = 65 * scaleFactor;
Alloy.Globals.size_70 = 70 * scaleFactor;
Alloy.Globals.size_80 = 80 * scaleFactor;
Alloy.Globals.size_90 = 90 * scaleFactor;
Alloy.Globals.size_100 = 100 * scaleFactor;
Alloy.Globals.size_110 = 110 * scaleFactor;
Alloy.Globals.size_115 = 115 * scaleFactor;
Alloy.Globals.size_120 = 120 * scaleFactor;
Alloy.Globals.size_130 = 130 * scaleFactor;
Alloy.Globals.size_140 = 140 * scaleFactor;
Alloy.Globals.size_150 = 150 * scaleFactor;
Alloy.Globals.size_160 = 160 * scaleFactor;
Alloy.Globals.size_170 = 170 * scaleFactor;
Alloy.Globals.size_180 = 180 * scaleFactor;
Alloy.Globals.size_190 = 190 * scaleFactor;
Alloy.Globals.size_200 = 200 * scaleFactor;
Alloy.Globals.size_250 = 250 * scaleFactor;
Alloy.Globals.size_300 = 300 * scaleFactor;
Alloy.Globals.size_350 = 350 * scaleFactor;

//Module for imageview aspect ratio management

var AvImageview = require("av.imageview");

//and to use contentmodes constants via alloy
Alloy.Globals.CONTENT_MODE_FIT = AvImageview.CONTENT_MODE_ASPECT_FIT;
Alloy.Globals.CONTENT_MODE_FILL = AvImageview.CONTENT_MODE_ASPECT_FILL;

function consoleLog(msg, str) {
	Ti.API.info(msg + "  : " + str);
}



Alloy.Globals.goToHome = function(win) {

	if (win == null) {
		return;
	}
	if (win.oldWin != null) {
		Alloy.Globals.goToHome(win.oldWin);
	}
	//if (OS_ANDROID) {
		//if (win.name == "setting" || win.name == "about" || win.name == "contact"|| win.name == "terms"|| win.name == "privacy") {
		//	Alloy.Globals.mainVW.remove(win);
		//} else {
		//	win.close();
		//}

	//} else {
		win.close();
	//}
	try {
		// Alloy.Globals.refreshItem.visible = true;
		// Alloy.Globals.searchItem.visible = true;
	} catch(e) {
	}
};


var generalPicker = function(fromWindow, minD, maxD, val, type,from,selectedIndex, callback) {
	var datePickerWidget = Alloy.createWidget("general.picker", "widget", {
		onDone : function(value,index) {
			consoleLog("index",index);
			callback(value,index);
		},
		minDate : minD,
		maxDate : maxD,
		value : val,
		type : type,
		from:from,
		height:200,
		bottom:-220,
		selectedIndex : selectedIndex,

	});
	/*** Get the View ***/
	if (OS_IOS) {
		
		for (var i = 0; i < fromWindow.getChildren().length; i++) {
			if (fromWindow.getChildren()[i].id == "widget") {
				fromWindow.remove(fromWindow.getChildren()[i]);
			}
		};
				fromWindow.add(datePickerWidget.getView());
				
	}
	datePickerWidget.getView().showPicker();
};