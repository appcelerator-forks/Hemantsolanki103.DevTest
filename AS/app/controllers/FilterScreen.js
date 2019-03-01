// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var plantArray = [];
var userData = Ti.App.Properties.getObject("userData");
// $.portfolioSelectionLbl.text = "All Portfolio";

function didClickRow(row) {
	// Do something with the value from the clicked option
	Ti.API.info(JSON.stringify(row));
	// Logs {title: 'tilteName', index: 3}
}

function init() {
	var config = {
		initialMessage : 'Full Portfolio',
		rows : plantArray,
		styles : {
			dropdown : {// Optional
				backgroundColor : Alloy.CFG.color.buttonBackgroundColor,
				color : 'white',
			},
			row : {
				height : Alloy.Globals.size_40,
				top : Alloy.Globals.size_1,
				width : Ti.UI.FILL,
				backgroundColor : Alloy.CFG.color.lineColor, // Optional
				selectionColor : '#ddd', // Optional
				color : Alloy.CFG.color.backgroundColor, // Optional
				font : {// Optional
					fontSize : Alloy.Globals.size_13,
					fontFamily : Alloy.CFG.font.robotoRegular
				}
			}
		}
	};
	$.portfolioDropDown.init(config);
	//$.zone.init(config);
};
$.portfolioDropDown.on('didClickRow', didClickRow);

function openFunc(e) {
	
	
	
	if (OS_ANDROID) {
		var actionBarMenu=[{
			'type':"text",
			'text':L("reset_txt"),
			'code':'',
			'fontFamily':'FontAwesome'
		},{
			'type':"text",
			'text':L("apply_txt"),
			'code':'',
			'fontFamily':'FontAwesome'
		}];
		Alloy.Globals.createActionBarMenu($.FilterScreen,L('filter_title'),function(e){
			if(e.source.title == L("reset_txt")){
				resetFilterFunc();
			}if(e.source.title == L("reset_txt")){
				applyFilterFunc();
			}
		});	
	}
	Alloy.Globals.commonService.getPlantListByOrganizationIDDetails('', function(response) {
		plantArray = createCompatibleArrayForPlantFilter(response);
		init();
		$.containerVW.visible = true;
	});
}

function applyFilterFunc() {
alert('appply');
}

function resetFilterFunc() {
alert('reset');
}

function createCompatibleArrayForPlantFilter(res) {
	var arry = [{
		'title' : 'All Portfolio',
		'id' : 0
	}];
	for (var i = 0; i < res.length; i++) {
		arry.push({
			'title' : res[i].displayName,
			'id' : res[i].id
		});
	};
	return arry;
}
