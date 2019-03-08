/**
 ** Code for open the login screen controller.
 **/

if (Ti.App.Properties.getObject("userData")) {
	var params = {};
	params.displayHomeAsUp = false;
	params.swipeBack = false;
	var homeScreen = Alloy.createController('HomeScreen').getView();
	if (OS_ANDROID) {
		homeScreen.open(homeScreen, params);
	} else {
		homeScreen.open({
			transition : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE
		});
	}
	
} else {

	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var login = Alloy.createController("LoginScreen").getView();
	if (OS_ANDROID) {
		login.open(params);
	} else {
		login.open({
			transition : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE
		});
	}

}
