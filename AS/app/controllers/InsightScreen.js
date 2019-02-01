// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Import row for creating the row of news
var rowObj = require('TemplateRow');

var staticJson = [{
	'news_type' : 'good',
	'news_title' : 'Highest energy output',
	'news_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'news_type' : 'bad',
	'news_title' : 'Transformer fail',
	'news_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'news_type' : 'weather',
	'news_title' : 'Heavy rain',
	'news_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'news_type' : 'maintenance',
	'news_title' : 'OEM device not working',
	'news_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}, {
	'news_type' : 'industry',
	'news_title' : 'New Solar pannel',
	'news_desc' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

}];

function openFunc(e) {
	if (OS_ANDROID) {
		var activity = $.InsightScreen.getActivity();
		if (activity) {

			Alloy.Globals.abx.title = L('insight_title');
			Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);

			activity.onCreateOptionsMenu = function(e) {

				e.menu.clear();

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
	rowObj.createRow(staticJson, "all", $.newsTable, "news");
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
		},Alloy.Globals.currentWindow);
}


var previousListObj = $.allVW;
function selectNewsFunc(e) {
	switch(e.source.index) {
	case 0:
		changeColorForSelectedSeverity(e,'all');
		break;
	case 1:
		changeColorForSelectedSeverity(e,'good');
		$.newsScrollVW.contentOffset = {
			x : 0,
			y : 0
		};
		break;
	case 2:
		changeColorForSelectedSeverity(e,'bad');
		$.newsScrollVW.contentOffset = {
			x : Alloy.Globals.size_50,
			y : 0
		};
		break;
	case 3:
		changeColorForSelectedSeverity(e,'weather');
		$.newsScrollVW.contentOffset = {
			x : Alloy.Globals.size_200,
			y : 0
		};
		break;
	case 4:
		changeColorForSelectedSeverity(e,'maintenance');
		$.newsScrollVW.contentOffset = {
			x : Alloy.Globals.size_350,
			y : 0
		};
		break;
	case 5:
		changeColorForSelectedSeverity(e,'industry');
		break;
	}

}

function changeColorForSelectedSeverity(e,type) {
	if (previousListObj === e.source) {
		return;
	}
	if (previousListObj) {
		previousListObj.backgroundColor = "transparent";
		previousListObj.getChildren()[0].color = Alloy.CFG.color.lineColor;
	}
	e.source.backgroundColor = Alloy.CFG.color.buttonBackgroundColor;
	e.source.getChildren()[0].color = "white";
	previousListObj = e.source;
	rowObj.createRow(staticJson, type, $.newsTable, "news");
}

function newsTableClickFunc(e) {
	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var obj = e.row.detail;
	obj.from = 'news';

	var detailScreen = Alloy.createController('DetailScreen', obj).getView();
	Alloy.Globals.navWin.openWindow(detailScreen, params);
	detailScreen.oldWin = $.InsightScreen;
	Alloy.Globals.currentWindow = detailScreen;
}
