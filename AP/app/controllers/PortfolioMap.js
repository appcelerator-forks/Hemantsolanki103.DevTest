// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var userData = Ti.App.Properties.getObject("userData");
consoleLog('UserData', JSON.stringify(userData));
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
	// setTimeout(function(){
		// Alloy.Globals.commonService.getPlantListByOrganizationIDDetails('', function(res) {
		// if (res) {
			// getAnnotation(res);
			// mapview.region = {
				// latitude : res[0].latitude,
				// longitude : res[0].longitude,
				// latitudeDelta : 120.1,
				// longitudeDelta : 120.1
			// };
		// }
// 
	// });
	// },1000);
	
}
function postLayoutFunc(){
		Alloy.Globals.commonService.getPlantListByOrganizationIDDetails('', function(res) {
		if (res) {
			getAnnotation(res);
			mapview.region = {
				latitude : res[0].latitude,
				longitude : res[0].longitude,
				latitudeDelta : 120.1,
				longitudeDelta : 120.1
			};
		}

	});
}

// $.homebtn.addEventListener('click',function(e){
// backToHomeFunc();
// });

function backToHomeFunc() {
	Alloy.Globals.navWin.popToRootWindow({
		animated : true
	}, Alloy.Globals.currentWindow);
}

var mapview = Alloy.Globals.Map.createView({
	mapType : Alloy.Globals.Map.NORMAL_TYPE,
	//userLocation : true,
	height : '100%',
	width : '100%',
	animate : true,
	//regionFit : false,
});
$.PortfolioMap.add(mapview);

/*
 var portfolioLocation = [{
 'city' : "Pune",
 'latitude' : 18.520430,
 'longitude' : 73.856743
 }, {
 'city' : "Hyderabad",
 'latitude' : 17.385044,
 'longitude' : 78.486671
 }, {
 'city' : "Gujrat",
 'latitude' : 22.258652,
 'longitude' : 71.192383
 }];*/

var annoArray = [];
//Show annotation function
function getAnnotation(data) {
	try {
		annoArray = [];
		for (var i = 0; i < data.length; i++) {
			var anno1 = Alloy.Globals.Map.createAnnotation({
				latitude : data[i].latitude,
				longitude : data[i].longitude,
				title : data[i].city,
				pincolor : Alloy.Globals.Map.ANNOTATION_RED
			});
			annoArray.push(anno1);
		};
		mapview.annotations = annoArray;
	} catch(e) {
		Ti.API.info('Get Annotation Error : ' + e.message);
	}
}
