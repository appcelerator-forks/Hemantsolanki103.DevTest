// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var userData = Ti.App.Properties.getObject("userData");

//Getting current date
var currentDate = new Date();
var dialog;
//Initialization of some xml defined component
var headerText = L('welcome_txt') + ',\n' + "Administrator" + " " + 'Administrator';
$.dateLbl.text = "\ue075" + "  " + currentDate.toDateString();
$.companyLogo.image = "/commonImages/adani-logo.png";
Alloy.Globals.navWin = $.navWin;
consoleLog('i', headerText.indexOf(','));
consoleLog('L', headerText.length);
var attr = Titanium.UI.createAttributedString({
	text : headerText,
	attributes : [{
		type : Titanium.UI.ATTRIBUTE_FONT,
		value : {
			fontFamily : Alloy.CFG.font.robotoMedium,
			fontSize : Alloy.Globals.size_15
		},
		range : [headerText.indexOf(',') + 1, headerText.length - 8]
	}]
});
$.welcomeLbl.attributedString = attr;

/*
 * Xml based event of window open: we have set action bar title and color in android
 * And add menu button on action bar
 */
function openFunc(e) {

	if (OS_ANDROID) {

		var activity = $.homeWin.getActivity();

		if (activity) {
			Alloy.Globals.abx.title = L('home_txt');
			Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);
			activity.onCreateOptionsMenu = function(e) {
				e.menu.clear();
				// Using MaterialIcons for MenuItems
				var logoutItem = e.menu.add({
					itemId : 101, // don't forget to set an id here
					title : "Logout",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});
				// ...then, let abx apply the custom font
				Alloy.Globals.abx.setMenuItemIcon({
					menu : e.menu,
					menuItem : logoutItem,
					fontFamily : 'SimpleLineIcons',
					icon : String.fromCharCode(0xe065),
					// icon: "/commonImages/helios_logo.png",
					color : "#92ccc5",
					size : 26
				});

				// first, create the item...
				var settingsItem = e.menu.add({
					itemId : 102, // don't forget to set an id here
					title : "Settings",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});

				// ...then, let abx apply the custom font
				Alloy.Globals.abx.setMenuItemIcon({
					menu : e.menu,
					menuItem : settingsItem,
					fontFamily : "SimpleLineIcons",
					icon : String.fromCharCode(0xe09a),
					// icon: "/commonImages/helios_logo.png",
					color : "#92ccc5",
					size : 28
				});

				logoutItem.addEventListener('click', function(e) {
					logoutFunc();
				});
				settingsItem.addEventListener('click', function(e) {
					settingFunc();
				});
			};

		}
	}
	//Some functions calling for initialization
	createMenuDialogForOperationalPerformance();

}

//Click event of logout menu
function logoutFunc() {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : [L('yes_txt'), L('no_txt')],
		message : L('logout_confirmation_txt'),
		title : L('app_name'),
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === 0) {
			var login = Alloy.createController("LoginScreen").getView();
			if (OS_ANDROID) {
				login.open();
			} else {
				login.open({
					transition : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE
				});
			}
			$.navWin.close();
			Ti.App.Properties.setString("access_token", null);
			Ti.App.Properties.setBool("isAutoLogin", false);
			Ti.App.Properties.setObject("userData", null);
		}
	});
	dialog.show();

}

//Click event of setting menu
function settingFunc() {

}

function deviceBackFunc() {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : [L('yes_txt'), L('no_txt')],
		message : L('app_exit_confirmation_txt'),
		title : L('app_name'),
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === 0) {
			$.navWin.exitOnClose = true;
			$.navWin.close();
		}
		Ti.API.info('e.cancel: ' + e.cancel);
		Ti.API.info('e.source.cancel: ' + e.source.cancel);
		Ti.API.info('e.index: ' + e.index);
	});
	dialog.show();
}

function openMapFunc() {
	var params = {};
	params.displayHomeAsUp = true;
	var mapScreen = Alloy.createController('PortfolioMap').getView();
	$.navWin.openWindow(mapScreen, params);
	Alloy.Globals.currentWindow = mapScreen;
}

function openNotiticationFunc() {
	var params = {};
	params.displayHomeAsUp = true;
	var notificationScreen = Alloy.createController('NotificationScreen').getView();
	$.navWin.openWindow(notificationScreen, params);
	Alloy.Globals.currentWindow = notificationScreen;
}

function openInsightFunc() {
	var params = {};
	params.displayHomeAsUp = true;
	var insightScreen = Alloy.createController('InsightScreen').getView();
	$.navWin.openWindow(insightScreen, params);
	Alloy.Globals.currentWindow = insightScreen;

}

function createMenuDialogForOperationalPerformance() {
	var opts = {
		cancel : 2,
		options : (OS_IOS) ? [L('portfolioKpi_txt'), L('portfolioRank_txt'), L('cancel_txt')] : [L('portfolioKpi_txt'), L('portfolioRank_txt')],
		buttonNames : [L('cancel_txt')],
		title : 'Select Option'
	};
	dialog = Ti.UI.createOptionDialog(opts);
	dialog.addEventListener('click', function(e) {
		if ((e.button == false || OS_IOS) && e.index === 0) {
			var params = {};
			params.displayHomeAsUp = true;
			var kpiScreen = Alloy.createController('PortfolioKPIScreen').getView();
			$.navWin.openWindow(kpiScreen, params);
			Alloy.Globals.currentWindow = kpiScreen;
		}
		if ((e.button == false || OS_IOS) && e.index === 1) {
			var params = {};
			params.displayHomeAsUp = true;
			var rankScreen = Alloy.createController('PortfolioRank').getView();
			$.navWin.openWindow(rankScreen, params);
			Alloy.Globals.currentWindow = rankScreen;
		}
	});
}

function openOperationalPerformanceFunc() {

	dialog.show();
}

