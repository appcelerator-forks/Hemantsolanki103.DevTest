// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var height = Ti.Platform.displayCaps.platformHeight;
height = height * 0.1496;
$.imgVWContainer.height = height;
$.imgVWContainer.width = height;
$.imgVWContainer.borderRadius = height / 2;
$.contactStaticLbl.font = {
	fontSize : 10 * Alloy.Globals.scaleFactor
};
$.emailStaticLbl.font = {
	fontSize : 10 * Alloy.Globals.scaleFactor
};
$.nameStaticLbl.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor,
	fontWeight : "bold"
};
$.infoLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor,
};
$.nameLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor,
};
$.nameTF.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.phoneLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor,
};
$.phoneTF.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.emailLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor,
};
$.emailTF.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};
$.locationLbl.font = {
	fontSize : 12 * Alloy.Globals.scaleFactor,
};
$.locationTF.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor,
};

function openFunc(e) {

}

var isSave = false;

function editFunc(e) {
	if ($.editBtn.focusable == false) {
		return;
	}
	$.editBtn.focusable == false;
	if (isSave == false) {
		$.nameTF.editable = true;
		$.phoneTF.editable = true;
		$.emailTF.editable = true;
		$.locationTF.editable = true;
		$.editBtn.image = "/images/save.png";
		isSave = true;
	} else {

		if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
			if ($.phoneTF.value != null && $.phoneTF.value.trim().length > 0) {
				if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
					if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
						if ($.locationTF.value != null && $.locationTF.value.trim().length > 0) {
							$.editBtn.image = "/images/edt.png";
							$.nameTF.editable = false;
							$.phoneTF.editable = false;
							$.emailTF.editable = false;
							$.locationTF.editable = false;
							isSave = false;

						} else {
							Alloy.Globals.Alert("Please enter address");
						}
					} else {
						Alloy.Globals.Alert("Please enter valid registred email address");

					}
				} else {
					Alloy.Globals.Alert("Please enter valid email address");
				}
			} else {
				Alloy.Globals.Alert("Please enter valid phone number");
			}
		} else {
			Alloy.Globals.Alert("Please enter your name");
		}

	}
	setTimeout(function(e) {
		$.editBtn.focusable == true;
	}, 1000);
}

function openGallary(e) {
	if (isSave != false) {
		Ti.API.info('YEs');
	}

}

function winClickFunc(e) {
	if (e.source.name != "tf") {
		$.nameTF.blur();
		$.phoneTF.blur();
		$.emailTF.blur();
		$.locationTF.blur();
	}
}

function nameReturn(e) {
	if (OS_IOS)
		$.phoneTF.focus();
}

function phoneReturn(e) {
	if (OS_IOS)
		$.emailTF.focus();
}

function emailReturn(e) {
	if (OS_IOS)
		$.locationTF.focus();
}

function menuFunc(e) {
	$.Profile.close();
}
