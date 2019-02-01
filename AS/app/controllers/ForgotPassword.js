// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var validation = require('/Validation.js');

function openFunc() {
	if (OS_ANDROID) {
		Alloy.Globals.abx.title = L('forgot_pwd_title');
		Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);
	}
}

function submitFunc() {
	if (validation.isTextFieldEmpty($.emailTF.value)) {
		if (validation.isEmailValid($.emailTF.value)) {
			
		} else {
			showAlert(L('validation_email_txt2'));
		}
	} else {
		showAlert(L('validation_email_txt1'));
	}
}

function winClickFunc(e) {
	if (e.source.name != "tf") {
		$.emailTF.blur();
	}
}