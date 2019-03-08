// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var validation = require('/Validation.js');
var userDetailsObj={};
//Xml based event of window open: we have set action bar title and color in android
function openFunc() {
	if (OS_ANDROID) {
		Alloy.Globals.abx.title = L('login_title');
		Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);
	}
}

//Xml based event of window click when user click anywhere on window, any focused text field will blur
function winClickFunc(e) {
	if (e.source.name != "tf") {
		$.usernameTF.blur();
		$.pwdTF.blur();
	}
}

//Xml based event of text field: when press next of email keyboard, it will give focus to password field
function emailReturnFunc(e) {
	$.pwdTF.focus();
}

//Xml based event of login button click: Valdiate all field and move to home screen
function loginFunc(e) {
	if (validation.isTextFieldEmpty($.usernameTF.value)) {
		//	if (validation.isEmailValid($.usernameTF.value)) {
		if (validation.isTextFieldEmpty($.pwdTF.value)) {
			if (validation.isTextLengthValid($.pwdTF.value, 4, 20)) {
				loginAPI();
			} else {
				showAlert(L('validation_pwd_length_msg'));
			}
		} else {
			showAlert(L('validation_pwd_txt'));
		}
		// } else {
		// showAlert(L('validation_email_txt2'));
		// }
	} else {
		showAlert(L('validation_email_txt1'));
	}

}

//Xml based event of forgot button click: Go to forgot screen
function forgotBtnFunc() {
	var forgotScreen = Alloy.createController("ForgotPassword").getView();
	$.navWin.openWindow(forgotScreen);
}

/*Clouser function for login api one calling
 * Inner function call the api and fetch access_token
 */
function loginAPI() {
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_LOGIN;
	var postData = {
		'username' : $.usernameTF.value.trim(),
		'password' : $.pwdTF.value.trim()
	};
	Alloy.Globals.loader.openLoader();
	Alloy.Globals.Communicator.post(url, JSON.stringify(postData), function(e) {
		if (e.success) {
			try {
				var response = JSON.parse(e.response);
				if (response != null) {
					Ti.App.Properties.setString("access_token", response.access_token);
					getUserDetails();
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
				}
			} catch(e) {
				consoleLog('Error Login ', e.message);
			}
		} else {
			showAlert(e.message);
		}
		
	});
}

/*Clouser function for login api two 
 * Inner function call the api and fetch user details{userId,first name, last name and others} from user_name
 */
function getUserDetails() {
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_USER_DETAILS + $.usernameTF.value.trim();
	Alloy.Globals.Communicator.get(url, function(e) {
		if (e.success) {
			try {
				consoleLog("res1",e.response);
				var response = JSON.parse(e.response);
				
				if (response != null) {
					Ti.App.Properties.setBool("isAutoLogin", true);
					userDetailsObj = response;	
					Ti.App.Properties.setObject("userData", userDetailsObj);//Remove
					var params = {};
					params.displayHomeAsUp = false;
					params.swipeBack = false;
					var homeScreen = Alloy.createController('HomeScreen').getView();
					if (OS_ANDROID) {
						$.navWin.openWindow(homeScreen, params);
					} else {
						homeScreen.open({
							transition : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE
						});
					}
					$.navWin.close();
					//getOrgDetails(response.id);//add
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
				}
			} catch(e) {
				consoleLog('Error Login User Data2', e.message);
			}
		} else {
			showAlert(e.message);
		}
	});
}

/*Clouser function for login api three 
 * Inner function call the api and fetch user organization details(contact number, organizationID and other) 
 */
function getOrgDetails(userId) {
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_USER_ORG_DETAILS + userId;
	Alloy.Globals.Communicator.get(url, function(e) {
		if (e.success) {
			try {
				
				var response = JSON.parse(e.response);
				
				if (response != null) {
					Ti.App.Properties.setBool("isAutoLogin", true);
					userDetailsObj.organisationId = response.organisationId;
					Ti.App.Properties.setObject("userData", userDetailsObj);
					Ti.API.info('data ' + JSON.stringify(Ti.App.Properties.getObject("userData")));
					var params = {};
					params.displayHomeAsUp = false;
					params.swipeBack = false;
					var homeScreen = Alloy.createController('HomeScreen').getView();
					if (OS_ANDROID) {
						$.navWin.openWindow(homeScreen, params);
					} else {
						homeScreen.open({
							transition : Titanium.UI.iOS.AnimationStyle.CROSS_DISSOLVE
						});
					}
					$.navWin.close();
					Alloy.Globals.loader.close();
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
				}
			} catch(e) {
				consoleLog('Error Login User Data 3', e.message);
			}
		} else {
			showAlert(e.message);
		}
	});
}
