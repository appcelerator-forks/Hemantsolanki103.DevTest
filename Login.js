// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/*
 * Variable defined for the services
 */
var Communicator = Alloy.Globals.Communicator;
var DOMAIN_URL = Alloy.Globals.Constants.DOMAIN_URL;

var height = Ti.Platform.displayCaps.platformHeight;
var btnHeight = height * (7.0 / 100);
var radius = btnHeight / 2;
$.fbBtn.borderRadius = radius;
$.googleBtn.borderRadius = radius;

$.staticLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.fbBtn.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.googleBtn.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.emailTF.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.passwordTF.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.submitBtn.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.signUpBtn.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};

var Google = require('ti.googlesignin');

Google.initialize({
	clientID : '61069628492-phalp1k382nlam34i2e0pcta25dce23n.apps.googleusercontent.com'
});

var loggedIn = Google.hasAuthInKeychain();

Google.addEventListener('login', function(e) {
	Ti.API.info('Logged in!');
	Ti.API.info(e.user);

	Ti.API.info('Email ' + e.user.profile.email);
	Ti.API.info('Email ' + e.user.profile.name);
	Ti.API.info('Email ' + Google.currentUserImageURLWithSize(200));
	// profilePicture.setImage(Google.currentUserImageURLWithSize(200));

	loggedIn = true;

});

Google.addEventListener('disconnect', function(e) {
	Ti.API.info('Disconnected!');
	// The Google SignIn API prefers "diconnect" over "logout"
	Ti.API.info(e.user);

	loggedIn = false;

});

Google.addEventListener('load', function(e) {
	Ti.API.info('Login UI loaded!');
});

Google.addEventListener('cancel', function(e) {
	Ti.API.info('Login UI cancelled: ' + e.message);
});

Google.addEventListener('error', function(e) {
	Ti.API.info('Login UI errored: ' + e.message);
});

Google.addEventListener('open', function(e) {
	Ti.API.info('Login UI opened!');
});

Google.addEventListener('close', function(e) {
	Ti.API.info('Login UI closed!');
});

function loginGoogle(e) {

	if (Ti.Network.online) {

		if ($.googleBtn.focusable == false) {
			return;
		}
		$.googleBtn.focusable == false;
		// Google.disconnect();
		Google.signIn();

	} else {
		$.googleBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}

}

function windowClick(e) {
	if (e.source.name != "tf") {
		$.emailTF.blur();
	}
}

function submitFunc(e) {
	if ($.submitBtn.focusable == false) {
		return;
	}
	$.submitBtn.focusable == false;
	if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
		if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
			if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
				if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
					var productList = Alloy.createController("ProductList").getView();
					productList.open();
				} else {
					Alloy.Globals.Alert("Password should be 6 character long");
				}

			} else {
				Alloy.Globals.Alert("Please enter password");
			}
		} else {
			Alloy.Globals.Alert("Please enter valid registred email address");

		}
	} else {
		Alloy.Globals.Alert("Please enter email address");
	}
	setTimeout(function(e) {
		$.submitBtn.focusable == true;
	}, 1000);
}

function signup(e) {
	if ($.signUpBtn.focusable == false) {
		return;
	}
	$.signUpBtn.focusable == false;
	var signUp = Alloy.createController("SignUp").getView();
	signUp.open();
	setTimeout(function(e) {
		$.signUpBtn.focusable == true;
	}, 1000);
}

function openFunc(e) {

	if (OS_IOS) {
		$.containerVW.animate({
			opacity : 1,
			duration : 550
		});
	}
}

/*
 * FB related code
 */

if (Alloy.Globals.fb == null) {
	Alloy.Globals.fb = require('facebook');
	Alloy.Globals.fb.permissions = ["public_profile", "email"];
	Alloy.Globals.fb.initialize();
	Alloy.Globals.fb.setLoginBehavior(Alloy.Globals.fb.LOGIN_BEHAVIOR_NATIVE);
}

if (OS_ANDROID) {
	$.Login.fbProxy = Alloy.Globals.fb.createActivityWorker({
		lifecycleContainer : $.Login
	});
}

function loginFB(e) {
	Alloy.Globals.fb.logout();
	if (Ti.Network.online) {
		if ($.fbBtn.focusable == false) {
			return;
		}
		$.fbBtn.focusable == false;

		if (Alloy.Globals.fb.loggedIn) {
			Alloy.Globals.fb.requestWithGraphPath("me", null, "GET", function(e) {
				Ti.API.info("GRAPH API RESPONSE : " + JSON.stringify(e));
				if (e.success) {

					Ti.API.info("Facebook ID 2: " + Ti.App.Properties.getString("facebookAccessToken"));
					FBLogin(JSON.parse(e.result));

				} else {
					try {
						Alloy.Globals.fb.addEventListener('login', fbLoginEvent);
						Alloy.Globals.fb.authorize();
					} catch(e) {
						Ti.API.info('Error Authorization : ' + e.error);
						$.fbBtn.focusable == true;
					}
				}
			});
		} else {
			try {
				Alloy.Globals.fb.addEventListener('login', fbLoginEvent);
				Alloy.Globals.fb.authorize();
			} catch(e) {
				Ti.API.info('Error Authorization : ' + e.error);
				$.fbBtn.focusable == true;
			}

		}

	} else {
		$.fbBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}

	setTimeout(function(e) {
		$.fbBtn.focusable == true;
	}, 1000);
}

var fbLoginEvent = function(e) {
	Ti.API.info("1 " + JSON.stringify(e));
	if (Ti.Network.online) {
		if (e.success) {

			Ti.App.Properties.setString("facebookAccessToken", e.source.accessToken);
			Ti.API.info("Facebook ID : " + Ti.App.Properties.getString("facebookAccessToken"));
			var fbData = {};
			fbData.id = e.source.uid;
			fbData.accessToken = e.source.accessToken;
			FBLogin(fbData);

		} else if (e.error) {
			$.fbBtn.focusable == true;
			Ti.API.info("e.error : " + e.error);

		} else if (e.cancelled) {
			$.fbBtn.focusable == true;
			Ti.API.info("e.cancelled : " + e.cancelled);

		}
		Alloy.Globals.fb.removeEventListener('login', fbLoginEvent);
	} else {
		$.fbBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}
};

function FBLogin(detail) {

	var fbID = detail.id;
	var accessToken = Ti.App.Properties.getString("facebookAccessToken");
	Ti.API.info('STEP3');
	if (Ti.Network.online) {
		Alloy.Globals.LoadingScreen.open();
		Communicator.get("https://graph.facebook.com/" + fbID + "?fields=name,picture,email&access_token=" + accessToken, FBCallback);
		Ti.API.info('URL ' + "https://graph.facebook.com/" + fbID + "?fields=name,picture,email&access_token=" + accessToken);
	} else {
		$.fbBtn.focusable == true;
		Alloy.Globals.Alert("Please check your internet connection and try again");
	}
}

/*
 * Callback gunction for FB and Google+ login
 */

function FBCallback(e) {
	Ti.API.info("Signup response : " + JSON.stringify(e));
	if (e.success) {
		try {
			Ti.API.info('response ' + e.response);
			var response = JSON.parse(e.response);

			if (response != null) {
				Ti.API.info('response.FBLogin = ' + JSON.stringify(response));
				//getBlob(response.picture.data.url, response, "facebook");
				//socialLogin(response, "facebook");
				Alloy.Globals.LoadingScreen.close();
			} else {
				Alloy.Globals.LoadingScreen.close();
				Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_NO_DATA);
				$.fbBtn.focusable == true;
			}
		} catch(e) {

			Ti.API.info('Error News List :: ' + e.message);
			Alloy.Globals.Alert(e.error);
			Alloy.Globals.LoadingScreen.close();
			$.fbBtn.focusable == true;
		}
	} else {
		Alloy.Globals.LoadingScreen.close();
		Alloy.Globals.Alert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		$.fbBtn.focusable == true;
	}

}