// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var height = Ti.Platform.displayCaps.platformHeight;
height = height * 0.1496;
$.imgVWContainer.height = height;
$.imgVWContainer.width = height;
$.imgVWContainer.borderRadius = height / 2;
var FloatingLabelFields = require('floating-label-fields');
var selectedImage = null;

$.staticLbl.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
	fontWeight : "bold"
};
$.fullnameLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.nameTF.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};

$.emailLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.emailTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.phoneLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.phoneTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.pwdLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor
};
$.pwdTF.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.cancelBtn.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.signupBtn.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};

function openGallary(e) {

}

function winClick(e) {
	if (e.source.name != "tf") {
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.pwdTF.blur();
	}
}

function signUpFunc(e) {
	if ($.signupBtn.focusable == false) {
		return;
	}
	$.signupBtn.focusable == false;
	if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
		if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
			if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
				if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
					if ($.passwordTF.value != null && $.passwordTF.value.trim().length > 0) {
					} else {
						alert("Password should be 6 character long");
					}

				} else {
					alert("Please enter password");
				}
			} else {
				alert("Please enter valid registred email address");

			}
		} else {
			alert("Please enter email address");
		}
	} else {
		alert("Please enter your name");
	}
	setTimeout(function(e) {
		$.signupBtn.focusable == true;
	}, 1000);
}

function nameReturnFunc(e) {
	if (OS_IOS)
		$.emailTF.focus();
}

function emailReturnFunc(e) {
	if (OS_IOS)
		$.phoneTF.focus();
}

function phoneReturnFunc(e) {
	if (OS_IOS)
		$.pwdTF.focus();
}

function backFunc(e) {
	$.signUpWin.close();
}

function openFunc(e) {
	if (OS_IOS) {
		$.containerVW.animate({
			opacity : 1,
			duration : 550
		});
	}
}