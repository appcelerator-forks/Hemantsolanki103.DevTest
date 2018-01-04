// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.fullnameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.nameTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.featureLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.featureTF.font = {
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
$.priceLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.priceTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.categoryLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.categoryTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.typeLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.typeTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.addItemSubmitBtn.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.cancelBtn.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

$.imageButton.font = {
	fontSize : 10 * Alloy.Globals.scaleFactor
};
$.imagenameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.imagenameLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};

function nameReturnFunc(e) {
	if (OS_IOS)
		$.featureTF.focus();
}

function featureReturnFunc(e) {
	if (OS_IOS)
		$.priceTF.focus();
}

function priceReturnFunc(e) {
	if (OS_IOS)
		$.categoryTF.focus();
}

function categoryReturnFunc(e) {
	if (OS_IOS)
		$.typeTF.focus();
}

function typeReturnFunc(e) {
	if (OS_IOS)
		$.descTF.focus();
}

function descDoneFunc(e) {
	$.descTF.blur();
}

function submitFunc(e) {
	if ($.addItemSubmitBtn.focusable == false) {
		return;
	}
	$.addItemSubmitBtn.focusable == false;
	if ($.nameTF.value != null && $.nameTF.value.trim().length > 0) {
		if ($.featureTF.value != null && $.featureTF.value.trim().length > 0) {
			if ($.priceTF.value != null && $.priceTF.value.trim().length > 0) {
				if ($.priceTF.value > 0) {
					if ($.categoryTF.value != null && $.categoryTF.value.trim().length > 0) {
						if ($.typeTF.value != null && $.typeTF.value.trim().length > 0) {
							if ($.descTF.value != null && $.descTF.value.trim().length > 0) {
								$.AddItem.close();
							} else {
								Alloy.Globals.Alert("Please enter product description");
							}
						} else {
							Alloy.Globals.Alert("Please enter product type");
						}

					} else {
						Alloy.Globals.Alert("Please enter product category");
					}
				} else {
					Alloy.Globals.Alert("Please enter valid product price");
				}
			} else {
				Alloy.Globals.Alert("Please enter product price");

			}
		} else {
			Alloy.Globals.Alert("Please enter product features");
		}
	} else {
		Alloy.Globals.Alert("Please enter your product name");
	}
	setTimeout(function(e) {
		$.addItemSubmitBtn.focusable == true;
	}, 1000);
}

function changeFunc(e) {
	if (e.source.value.length > 0) {
		$.descHintTextLbl.visible = false;
	} else {
		$.descHintTextLbl.visible = true;
	}
}

function cancelFunc(e) {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['No', 'Yes'],
		message : 'Are you sure want to reset all fields?',
		title : "RIGBUY",
	});
	dialog.addEventListener('click', function(k) {
		if (k.index === 0) {
			Ti.API.info('The cancel button was clicked');
		} else {
			$.nameTF.value = "";
			$.featureTF.value = "";
			$.priceTF.value = "";
			$.categoryTF.value = "";
			$.descTF.value = "";
			$.typeTF.value = "";
		}

	});
	dialog.show();

}
