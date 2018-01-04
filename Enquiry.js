// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fullnameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.nameTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.emailLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.emailTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.phoneLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.phoneTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

$.descLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.descTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.descHintTextLbl.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

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
		$.descTF.focus();
}

function descDoneFunc(e) {
	$.descTF.blur();
}

function submitFunc(e) {
	if ($.enquirySubmitBtn.focusable == false) {
		return;
	}
	$.enquirySubmitBtn.focusable == false;
	if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
		if ($.emailTF.value != null && $.emailTF.value.trim().length > 0) {
			if (Alloy.Globals.validateCaseSensitiveEmail($.emailTF.value)) {
				if ($.phoneTF.value != null && $.phoneTF.value.trim().length > 0) {
					if ($.phoneTF.value > 0) {
						

							if ($.descTF.value != null && $.descTF.value.trim().length > 0) {
								$.AddItem.close();
							} else {
								Alloy.Globals.Alert("Please enter description for enquiry");
							}

					} else {
						Alloy.Globals.Alert("Please enter valid contact number");
					}
				} else {
					Alloy.Globals.Alert("Please enter contact number");
				}
			} else {
				Alloy.Globals.Alert("Please enter valid email address");

			}
		} else {
			Alloy.Globals.Alert("Please enter your email address");
		}
	} else {
		Alloy.Globals.Alert("Please enter your name");
	}
	setTimeout(function(e) {
		$.enquirySubmitBtn.focusable == true;
	}, 1000);
}

function changeFunc(e) {
	if (e.source.value.length > 0) {
		$.descHintTextLbl.visible = false;
	} else {
		$.descHintTextLbl.visible = true;
	}
}
