// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.img.height = 140 * Alloy.Globals.scaleFactor;
$.img.width = 140 * Alloy.Globals.scaleFactor;
Alloy.Globals.navWin = $.navWin;
// $.sortBtn.font = {
	// fontSize : 13 * Alloy.Globals.scaleFactor
// };
// $.filterBtn.font = {
	// fontSize : 13 * Alloy.Globals.scaleFactor
// };
$.rowLbl1.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.rowLbl2.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.rowLbl3.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.rowLbl4.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
$.rowLbl5.font = {
	fontSize : 14 * Alloy.Globals.scaleFactor
};
function openFunc(e) {
	$.productWin.animate({
		duration : 500,
		opacity : 1
	});
}

if (OS_IOS) {
	var rowHeight = Titanium.Platform.displayCaps.platformHeight * 0.2428;
} else {
	var rowHeight = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformHeight) * 0.2428;
}

var productRow = function(detail) {
	tableData = [];
	for (var i = 0; i < 6; i++) {

		var tableRow = Ti.UI.createTableViewRow({
			touchEnabled : true,
			width : "100%",
			height : rowHeight,
			// detail : detail[i],
			selectedBackgroundColor : "#F8F8F9"
		});
		if (OS_IOS) {
			//tableRow.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.NONE;
		}
		tableRow.add(Ti.UI.createImageView({
			height : "100%",
			width : "100%",
			image : "http://www.lorempixel.com/700/600/",
			zIndex : 1
		}));
		tableRow.add(Ti.UI.createImageView({
			image : "/images/sh.png",
			height : "100%",
			width : "100%",
			zIndex : 2
		}));
		tableRow.add(Ti.UI.createImageView({
			right : 0,
			top : 0,
			image : "/images/re-back.png",
			zIndex : 3,
			color : "white",
			title : "Rent"
		}));

		tableRow.add(Ti.UI.createLabel({
			right : 2,
			top : 8,
			zIndex : 3,
			color : "white",
			text : "Rent",
			font : {
				fontSize : 10 * Alloy.Globals.scaleFactor
			}
			// backgroundColor:"green"
		}));

		//1
		tableRow.add(Ti.UI.createLabel({
			top : 10 * Alloy.Globals.scaleFactor,
			height : 20 * Alloy.Globals.scaleFactor,
			left : 10 * Alloy.Globals.scaleFactor,
			width : "80%",
			Color : 'white',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : "2BHK FLAT slkdf sd fls fs fdklsdfjdf klsjdfkl sf klsjfklsjdf s f df d",
			maxLines : 1,
			font : {
				fontSize : 15 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"
			},
			zIndex : 3,
		}));
		//1
		tableRow.add(Ti.UI.createLabel({
			top : 30 * Alloy.Globals.scaleFactor,
			height : 20 * Alloy.Globals.scaleFactor,
			left : 10 * Alloy.Globals.scaleFactor,
			width : "80%",
			Color : 'white',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			text : "0 Vijay nagar squar, Indore",
			maxLines : 1,
			font : {
				fontSize : 9 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"
			},
			zIndex : 3,
		}));

		tableRow.add(Ti.UI.createLabel({
			bottom : 0,
			height : 35 * Alloy.Globals.scaleFactor,
			left : 10 * Alloy.Globals.scaleFactor,

			width : "70%",
			Color : 'white',
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			wordWrap : true,
			verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			text : "0 Vijay nagar squar, Indore",
			maxLines : 2,
			font : {
				fontSize : 11 * Alloy.Globals.scaleFactor,
				fontWeight : "bold"
			},
			zIndex : 3,
		}));

		tableRow.add(Ti.UI.createButton({
			bottom : 8 * Alloy.Globals.scaleFactor,
			height : 30 * Alloy.Globals.scaleFactor,
			width : 30 * Alloy.Globals.scaleFactor,
			right : 40 * Alloy.Globals.scaleFactor,
			backgroundImage : "none",
			color : "white",
			image : "/images/add-to-favorites@2x.png",
			zIndex : 3,
		}));

		tableRow.add(Ti.UI.createButton({
			bottom : 8 * Alloy.Globals.scaleFactor,
			height : 30 * Alloy.Globals.scaleFactor,
			width : 30 * Alloy.Globals.scaleFactor,
			right : 5 * Alloy.Globals.scaleFactor,
			backgroundImage : "none",
			color : "white",
			image : "/images/chat.png",
			zIndex : 10
		}));

		tableData.push(tableRow);
	}
	$.productTable.setData(tableData);
};
productRow();

function tableClickFunc(e) {
	var productDetail = Alloy.createController("ProductDetail").getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(productDetail);
	} else {
		productDetail.open();
	}
	
	Alloy.Globals.currentWindow = productDetail;
}

function sortFunc(e) {
	var sortScreen = Alloy.createController("Sort").getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(sortScreen);
	} else {
		sortScreen.open();
	}
	Alloy.Globals.currentWindow = sortScreen;
}

if (OS_IOS) {
	$.topview.width = Alloy.Globals.homedrawerWidth + 30;
	$.rightTable.rowHeight = 48 * Alloy.Globals.scaleFactor;
}
function filterFunc(e) {
	var filterScreen = Alloy.createController("Filter").getView();
	if (OS_IOS) {
		Alloy.Globals.navWin.openWindow(filterScreen);
	} else {
		filterScreen.open();
	}
	Alloy.Globals.currentWindow = filterScreen;
}

function openMenu(e) {
	Alloy.Globals.openLeft();
}

/*
 * Function for opening windows from left drawer
 */
function leftMenuOptionSelected(e) {

	if ($.rightTable.focusable == false) {
		return;
	}
	$.rightTable.focusable = false;


	switch(e.index) {
	case 0:

		if (Alloy.Globals.currentWindow != null) {

			goToHome(Alloy.Globals.currentWindow);

			Alloy.Globals.currentWindow = null;
		}

		break;
	case 1:

		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "setting") {
			if (Ti.Network.online) {
				var regScreen = Alloy.createController("Setting", "menu").getView();

				Alloy.Globals.navWin.openWindow(regScreen, {
					animated : false
				});

				setTimeout(function(e) {
					goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);
			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		break;
	case 2:

		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "about") {
			Ti.API.info('Name2---------2 ' + Alloy.Globals.currentWindow);

			if (Ti.Network.online) {
				var regScreen = Alloy.createController("AboutUs", "menu").getView();

				Alloy.Globals.navWin.openWindow(regScreen, {
					animated : false
				});

				setTimeout(function(e) {
					goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);

			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		break;
	case 3:
		if (Alloy.Globals.currentWindow == null || Alloy.Globals.currentWindow.name != "contact") {

			if (Ti.Network.online) {
				var regScreen = Alloy.createController("ContactUs", "menu").getView();

				Alloy.Globals.navWin.openWindow(regScreen);

				setTimeout(function(e) {
					goToHome(Alloy.Globals.currentWindow);
					Alloy.Globals.currentWindow = regScreen;
				}, 200);
			} else {
				Alloy.Globals.Alert("Please check your internet connection and try again");

			}
		}
		break;
	

	case 4:
		focus = true;
		$.rightTable.focusable = true;
		logout();

		break;

	}

	Alloy.Globals.openLeft();

	setTimeout(function(e) {
		$.rightTable.focusable = true;
		focus = true;
	}, 500);
}
function logout(e){
	var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['No', 'Yes'],
			message : 'Are you sure want to logout?',
			title : 'RIGBUY'
		});
		dialog.addEventListener('click', function(k) {
			if (k.index === 0) {
				Ti.API.info('The cancel button was clicked');
			} else {
				
			}

		});
		dialog.show();
}
/*
 *This function for close the all the child windows
 */
function goToHome(win) {

	if (win == null) {
		return;
	}
	if (win.oldWin != null) {
		goToHome(win.oldWin);
	}
	if (OS_ANDROID) {
		Alloy.Globals.mainVW.remove(win);
	} else {
		win.close({
			animated : false
		});
	}
}
function openFilter(e){
	
}
