// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
function tableClickFunc(e) {

	if (e.source.name == "fav") {
		Ti.API.info('Fave');
	} else if (e.source.name == "edit") {
		Ti.API.info('Edit');
		var MyWhishlist = Alloy.createController("MyWhishlist").getView();
		if (OS_IOS) {
			Alloy.Globals.navWin.openWindow(MyWhishlist);
		} else {
			MyWhishlist.open();
		}
	} else if (e.source.name == "delete") {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['No', 'Yes'],
			message : 'Would you like to delete the selected item?',
			title : 'RIGBUY'
		});
		dialog.addEventListener('click', function(k) {
			if (k.index === 0) {
				Ti.API.info('The cancel button was clicked');
			} else {
				$.myItemTable.deleteRow(e.index, true);
			}

		});
		dialog.show();
	}
}

function openFunc(e) {

}

if (OS_IOS) {
	var rowHeight = Titanium.Platform.displayCaps.platformHeight * 0.2887;
} else {
	var rowHeight = Alloy.Globals.Measurement.pxToDP(Titanium.Platform.displayCaps.platformHeight) * 0.2887;
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
		// if (OS_IOS) {
		// //tableRow.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.NONE;
		// }

		tableRow.add(Ti.UI.createView({
			top : 2,
			bottom : 2,
			left : "1%",
			right : "1%"
		}));
		//0-0
		tableRow.getChildren()[0].add(Ti.UI.createImageView({
			height : "100%",
			width : "30%",
			///image : "http://www.lorempixel.com/700/600/",
			image : "/images/defaultImage.png",
			left : 0
		}));
		//0-1
		tableRow.getChildren()[0].add(Ti.UI.createButton({
			height : 34 * Alloy.Globals.scaleFactor,
			width : 34 * Alloy.Globals.scaleFactor,
			borderRadius : 17 * Alloy.Globals.scaleFactor,
			backgroundColor : "#565656",
			name : "fav",
			image : "/images/unfavorites.png", //add-to-favorites@3x
			backgroundImage : "none",
			left : "3%",
			maxLines : 1,
			top : "4%",
			borderColor : "white",
			borderWidth : 1
		}));
		//0-2
		tableRow.getChildren()[0].add(Ti.UI.createView({
			top : 0,
			left : "32%",
			right : 0,
			height : 18 * Alloy.Globals.scaleFactor,
			layout : "horizontal"
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createImageView({
			left : 0,
			image : "/images/rupees.png",
		}));
		//
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createLabel({
			left : 2,
			width : "40%",

			text : "12,000",
			color : "black",
			font : {
				fontSize : 14 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			height : "100%",
			textAlign : "left",
			maxLines : 1
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createView({
			height : "80%",
			width : 0.6,
			backgroundColor : "gray",
			left : 0
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createImageView({
			left : 5,
			image : "/images/rupees.png",
		}));
		tableRow.getChildren()[0].getChildren()[2].add(Ti.UI.createLabel({
			left : 2,
			width : "40%",

			text : "12,000",
			color : "black",
			font : {
				fontSize : 14 * Alloy.Globals.scaleFactor
			},
			maxLines : 1,
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			height : "100%",
			textAlign : "left"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 20 * Alloy.Globals.scaleFactor,
			width : "26%",
			left : "38%",
			text : "Rent",
			color : "black",
			maxLines : 1,
			font : {
				fontSize : 8 * Alloy.Globals.scaleFactor
			},
			textAlign : "left"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			top : 20 * Alloy.Globals.scaleFactor,
			width : "28%",
			right : 0,
			text : "Deposit",
			color : "black",

			font : {
				fontSize : 8 * Alloy.Globals.scaleFactor
			},
			maxLines : 1,
			textAlign : "left"
		}));

		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			left : "32%",
			right : 0,
			height : 18 * Alloy.Globals.scaleFactor,
			top : 40 * Alloy.Globals.scaleFactor,
			text : "3 BHK Flat in Belmont Park",
			color : "gray",
			font : {
				fontSize : 13 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			maxLines : 1,
			textAlign : "left"
		}));

		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			left : "32%",
			right : 0,
			height : 10 * Alloy.Globals.scaleFactor,
			top : 70 * Alloy.Globals.scaleFactor,
			text : "1200 sqft, 2 Bath, Semi-Furnished",
			color : "gray",
			font : {
				fontSize : 10 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			maxLines : 1,
			textAlign : "left"
		}));
		tableRow.getChildren()[0].add(Ti.UI.createLabel({
			left : "32%",
			right : 0,
			height : 35 * Alloy.Globals.scaleFactor,
			top : 90 * Alloy.Globals.scaleFactor,

			text : "1200 sqft, 2 Bath, Semi-Furnished 1200 sqft, 2 Bath, Semi-Furnished 1200 sqft, 2 Bath, Semi-Furnished 1200 sqft, 2 Bath, Semi-Furnished 1200 sqft, 2 Bath, Semi-Furnished  1200 sqft, 2 Bath, Semi-Furnished 1200 sqft, 2 Bath, Semi-Furnished",
			color : "gray",
			font : {
				fontSize : 9 * Alloy.Globals.scaleFactor
			},
			ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
			maxLines : 3,
			textAlign : "left"
		}));
		
		tableRow.getChildren()[0].add(Ti.UI.createButton({
			left:"32%",
			right : 0,
			name : "delete",
			height : 28 * Alloy.Globals.scaleFactor,
			bottom : 0,
			title : "Delete",
			borderColor : "#f54224",
			borderWidth : 1,
			// backgroundColor:"#f54224",
			color : "#f54224",
			selectedColor : "black",
			font : {
				fontSize : 12 * Alloy.Globals.scaleFactor
			},
			backgroundImage : "none"
		}));
		tableData.push(tableRow);
	}
	$.myItemTable.setData(tableData);
};
productRow();
