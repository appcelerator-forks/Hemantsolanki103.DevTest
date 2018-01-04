// var login = Alloy.createController("Login").getView();
// login.open();

/*
 * unction for open the Home Screen
 */
Alloy.Globals.openHome = function(response, loginObj) {

	var NappSlideMenu = require('dk.napp.slidemenu');
	var ledge = 90;

	if (Ti.Platform.displayCaps.platformHeight == 568) {
		ledge = 90;
		Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
	} else if (Ti.Platform.displayCaps.platformHeight == 736) {
		ledge = 94;
		Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
	} else if (Ti.Platform.displayCaps.platformHeight == 667) {
		ledge = 94;
		Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
	} else if (Ti.Platform.displayCaps.platformHeight == 480) {
		ledge = 90;
		Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
	} else {
		if (Alloy.isTablet) {
			ledge = 150;
			Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;

		} else {
			ledge = 95;
			Alloy.Globals.homedrawerWidth = Ti.Platform.displayCaps.platformWidth - ledge;
		}
	}
	Alloy.Globals.ledge = ledge;

	var homeScreen = Alloy.createController("ProductList", response);
	Alloy.Globals.homeObj = homeScreen;
	Alloy.Globals.drawer = NappSlideMenu.createSlideMenuWindow({
		centerWindow : homeScreen.navWin,
		backgroundColor : "#fff"
	});

	if (Alloy.isTablet) {
		Alloy.Globals.drawer.leftLedge = ledge;
	}
	Alloy.Globals.drawer.leftWindow = homeScreen.leftWindow;
	Alloy.Globals.drawer.rightWindow = null;

	Alloy.Globals.openLeft = function() {
		Alloy.Globals.drawer.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");
		Alloy.Globals.drawer.toggleLeftView();
	};
	Alloy.Globals.openRight = function() {
		Alloy.Globals.drawer.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");
		Alloy.Globals.drawer.toggleRightView();
	};
	Alloy.Globals.drawer.addEventListener("open", function(e) {
		this.setPanningMode("FullViewPanning");
		this.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");

	});

	Alloy.Globals.drawer.open();

}; 

Alloy.Globals.openHome();
