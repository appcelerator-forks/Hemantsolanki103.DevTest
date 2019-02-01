// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var validation = require('/Validation.js');

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
		$.emailTF.blur();
		$.pwdTF.blur();
	}
}

//Xml based event of text field: when press next of email keyboard, it will give focus to password field
function emailReturnFunc(e) {
	$.pwdTF.focus();
}

//Xml based event of login button click: Valdiate all field and move to home screen
function loginFunc(e) {
	if (validation.isTextFieldEmpty($.emailTF.value)) {
		if (validation.isEmailValid($.emailTF.value)) {
			if (validation.isTextFieldEmpty($.pwdTF.value)) {
				if (validation.isTextLengthValid($.pwdTF.value, 6, 20)) {
					
					Ti.App.Properties.setBool("isAutoLogin",true);
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
				} else {
					showAlert(L('validation_pwd_length_msg'));
				}
			} else {
				showAlert(L('validation_pwd_txt'));
			}
		} else {
			showAlert(L('validation_email_txt2'));
		}
	} else {
		showAlert(L('validation_email_txt1'));
	}

}

//Xml based event of forgot button click: Go to forgot screen
function forgotBtnFunc() {
	var forgotScreen = Alloy.createController("ForgotPassword").getView();
	$.navWin.openWindow(forgotScreen);
}
