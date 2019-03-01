// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var userData = Ti.App.Properties.getObject("userData");

function openFunc(e) {

	if (OS_ANDROID) {
		var actionBarMenu = [{
			'type' : "icon",
			'text' : L('home_txt'),
			'code' : 0xf015,
			'fontFamily' : 'FontAwesome'
		}];
		Alloy.Globals.createActionBarMenu.createActionBarMenu($.PortfolioMap, L('portfolioKpi_txt'), actionBarMenu, function(e) {
			if (e.source.title == L('home_txt')) {
				backToHomeFunc();
			}
		});
	}
	Alloy.Globals.commonService.getPlantListByOrganizationIDDetails('', function(res) {
		getAnnotation(res);
	});
}

function backToHomeFunc() {
	Alloy.Globals.navWin.popToRootWindow({
		animated : true
	}, Alloy.Globals.currentWindow);
}

var mapview = Alloy.Globals.Map.createView({
	mapType : Alloy.Globals.Map.NORMAL_TYPE,
	userLocation : true,
	height : '100%',
	width : '100%',

	animate : true,
	regionFit : true,
	annotations : annoArray,
	region : {
		latitudeDelta : 100.0,
		longitudeDelta : 100.0
	}
});
$.PortfolioMap.add(mapview);

var portfolioLocation = [{
	'location_name' : "Pune",
	'latitude' : 18.520430,
	'longitude' : 73.856743
}, {
	'location_name' : "Hyderabad",
	'latitude' : 17.385044,
	'longitude' : 78.486671
}, {
	'location_name' : "Gujrat",
	'latitude' : 22.258652,
	'longitude' : 71.192383
}];

var annoArray = [];
//Show annotation function
function getAnnotation(data) {
	try {
		annoArray = [];
		for (var i = 0; i < data.length; i++) {
			var anno1 = Alloy.Globals.Map.createAnnotation({
				latitude : data[i].latitude,
				longitude : data[i].longitude,
				title : data[i].locality,
				pincolor : Alloy.Globals.Map.ANNOTATION_RED
			});
			annoArray.push(anno1);
		};
		mapview.annotations = annoArray;
	} catch(e) {
		Ti.API.info('Get Annotation Error : ' + e.message);
	}
}

