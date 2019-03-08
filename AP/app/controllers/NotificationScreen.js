// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//Import row for creating the row of notificaion
var rowObj = require('TemplateRow');

var staticJson = [{
	'noti_type' : 'alert',
	'noti_title' : 'Whether Alert',
	'noti_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'noti_type' : 'alarm',
	'noti_title' : 'Plant Alarm',
	'noti_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'noti_type' : 'warning',
	'noti_title' : 'Plant shut down ',
	'noti_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'noti_type' : 'emergency',
	'noti_title' : 'OEM device not working',
	'noti_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}];

function openFunc(e) {
	if (OS_ANDROID) {
		var activity = $.NotificationScreen.getActivity();
		if (activity) {

			Alloy.Globals.abx.title = L('notification_txt');
			Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);

			activity.onCreateOptionsMenu = function(e) {

				e.menu.clear();

				// Using MaterialIcons for MenuItems

				var homeItem = e.menu.add({
					itemId : 101, // don't forget to set an id here
					title : "Home",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});

				// ...then, let abx apply the custom font
				Alloy.Globals.abx.setMenuItemIcon({
					menu : e.menu,
					menuItem : homeItem,

					fontFamily : 'FontAwesome',
					icon : String.fromCharCode(0xf015),

					// icon: "/commonImages/helios_logo.png",
					color : "#92ccc5",
					size : 28
				});
				var filterItem = e.menu.add({
					itemId : 102, // don't forget to set an id here
					title : "Filter",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});

				// ...then, let abx apply the custom font
				Alloy.Globals.abx.setMenuItemIcon({
					menu : e.menu,
					menuItem : filterItem,
					fontFamily : 'FontAwesome',
					icon : String.fromCharCode(0xf0b0),
					color : "#92ccc5",
					size : 26
				});
				homeItem.addEventListener('click', function(e) {
					backToHomeFunc();
				});

				filterItem.addEventListener('click', function(e) {
					filterClickFunc();
				});
			};
		}
	}
	rowObj.createRow(staticJson, "all", $.notificationTable, "notification");
}

function filterClickFunc() {
	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var filterScreen = Alloy.createController('FilterScreen').getView();
	Alloy.Globals.navWin.openWindow(filterScreen, params);
}

function backToHomeFunc() {
	Alloy.Globals.navWin.popToRootWindow({
		animated : true
	}, Alloy.Globals.currentWindow);
}

var previousSeverityObj = $.allVW;
function selectSeverityFunc(e) {
	switch(e.source.index) {
	case 0:
		changeColorForSelectedSeverity(e, 'all');
		break;
	case 1:

		changeColorForSelectedSeverity(e, 'alert');
		$.severityScrollVW.contentOffset = {
			x : 0,
			y : 0
		};
		break;
	case 2:
		changeColorForSelectedSeverity(e, 'alarm');
		$.severityScrollVW.contentOffset = {
			x : Alloy.Globals.size_50,
			y : 0
		};
		break;
	case 3:
		changeColorForSelectedSeverity(e, "warning");
		$.severityScrollVW.contentOffset = {
			x : Alloy.Globals.size_100,
			y : 0
		};
		break;
	case 4:
		changeColorForSelectedSeverity(e, 'emergency');
		break;
	}

}

function changeColorForSelectedSeverity(e, type) {
	if (previousSeverityObj === e.source) {
		return;
	}
	if (previousSeverityObj) {
		previousSeverityObj.backgroundColor = "transparent";
		previousSeverityObj.getChildren()[0].color = Alloy.CFG.color.lineColor;
	}
	e.source.backgroundColor = Alloy.CFG.color.buttonBackgroundColor;
	e.source.getChildren()[0].color = "white";
	previousSeverityObj = e.source;
	rowObj.createRow(staticJson, type, $.notificationTable, "notification");
}

function notificationTableClickFunc(e) {
	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var obj = e.row.detail;
	obj.from = 'notification';
	var notificationScreen = Alloy.createController('DetailScreen', obj).getView();
	Alloy.Globals.navWin.openWindow(notificationScreen, params);
	notificationScreen.oldWin = $.NotificationScreen;
	Alloy.Globals.currentWindow = notificationScreen;
}
