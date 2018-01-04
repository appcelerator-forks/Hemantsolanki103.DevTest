// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.settingTable.rowHeight = 50 * Alloy.Globals.scaleFactor;

var listArray = ["Profile", "Change Password", "My Item", "My WishList"];
function tableClickFunc(e) {
	switch(e.index) {
	case 0:
		var profile = Alloy.createController("Profile").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(profile);
		} else {
			profile.open();
		}
		profile.oldWin = $.settingWin;
		Alloy.Globals.currentWindow = profile;
		break;
	case 1:
		var changePwd = Alloy.createController("ChangePassword").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(changePwd);
		} else {
			changePwd.open();
		}
		changePwd.oldWin = $.settingWin;
		Alloy.Globals.currentWindow = changePwd;
		break;
	case 2:
		var myItemWin = Alloy.createController("MyItem").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(myItemWin);
		} else {
			myItemWin.open();
		}
		myItemWin.oldWin = $.settingWin;
		Alloy.Globals.currentWindow = myItemWin;
		break;
	case 3:
		var myWishList = Alloy.createController("MyWhishlist").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(myWishList);
		} else {
			myWishList.open();
		}
		myWishList.oldWin = $.settingWin;
		Alloy.Globals.currentWindow = myWishList;
		break;
	}
}

function openFunc(e) {
	$.menuBtn.image = "/images/menu.png";
}

function openMenu(e) {
	Alloy.Globals.openLeft();
}

var tableData = [];
var settingRow = function(detail) {
	tableData = [];
	for (var i = 0; i < detail.length; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			selectedBackgroundColor : "#F8F8F9",
			hasChild : true
		});


		tableRow.add(Ti.UI.createLabel({
			left : "5%",
			zIndex : 100,
			color : "gray",
			text : detail[i],
			font : {
				fontSize : 14 * Alloy.Globals.scaleFactor
			}

		}));

		tableData.push(tableRow);
	}
	$.settingTable.setData(tableData);
};
settingRow(listArray);
