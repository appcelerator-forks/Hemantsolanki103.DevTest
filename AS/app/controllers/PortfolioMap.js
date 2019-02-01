// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function openFunc(e) {
	if (OS_ANDROID) {
		var activity = $.PortfolioMap.getActivity();
		if (activity) {
			Alloy.Globals.abx.title = L('portfolioKpi_txt');
			Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);
			activity.onCreateOptionsMenu = function(e) {
				e.menu.clear();

				// Using MaterialIcons for MenuItems
				var homeItem = e.menu.add({
					itemId : 101, // don't forget to set an id here
					title : "Home",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});

				// ...then, let abx apply the custom font
				Alloy.Globals.abx.setMenuItemIcon({
					menu : e.menu,
					menuItem : homeItem,
					fontFamily : 'FontAwesome',
					icon : String.fromCharCode(0xf015),
					color : "#92ccc5",
					size : 26
				});

				homeItem.addEventListener('click', function(e) {
					backToHomeFunc();
				});
			
			};
		}
	}
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
		latitude : 21.370125,
		longitude : 79.026495,
		latitudeDelta : 25.0,
		longitudeDelta : 25.0
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
				title : data[i].location_name,
				pincolor : Alloy.Globals.Map.ANNOTATION_RED
			});

			annoArray.push(anno1);

		};

		mapview.annotations = annoArray;
	} catch(e) {
		Ti.API.info('Get Annotation Error : ' + e.message);
	}
}

getAnnotation(portfolioLocation);
