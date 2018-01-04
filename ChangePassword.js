// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.currentPasswordLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.currentPasswordTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

$.newPwdLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.newPwdTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};
$.confirmPwdLbl.font = {
	fontSize : 13 * Alloy.Globals.scaleFactor
};
$.confirmPwdTF.font = {
	fontSize : 15 * Alloy.Globals.scaleFactor
};

function changePasswordReturnFunc(e){
	if(OS_IOS){
		$.newPwdTF.focus();
	}
	
}

function newPwdReturnFunc(e){
	if(OS_IOS){
		$.confirmPwdTF.focus();
	}
	
}
function submitFunc(e){
	if ($.signupBtn.focusable == false) {
		return;
	}
	$.signupBtn.focusable == false;
	if ($.currentPasswordTF.value != null && $.currentPasswordTF.value.trim().length > 0) {
		if ($.newPwdTF.value != null && $.newPwdTF.value.trim().length > 0) {
			if ($.confirmPwdTF.value != null && $.confirmPwdTF.value.trim().length > 0) {
				if ($.newPwdTF.value == $.confirmPwdTF.value) {
					var productList = Alloy.createController("ProductList").getView();
					productList.open();
				} else {
					Alloy.Globals.Alert("New password and confirm should be same");
				}

			} else {
				Alloy.Globals.Alert("Please enter confirm password");
			}
		} else {
			Alloy.Globals.Alert("Please enter new password");

		}
	} else {
		Alloy.Globals.Alert("Please enter valid current password");
	}
	setTimeout(function(e) {
		$.signupBtn.focusable == true;
	}, 1000);
}
