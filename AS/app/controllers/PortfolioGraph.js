// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var finalJson;
var jsonArray = [{
	"chartName" : "TIME VS SPECIFIC YIELD",
	"xaxisParamName" : "TIME",
	"xaxisParamUnit" : null,
	"xaxisParamType" : "DATE",
	"yaxisParamName" : "SPECIFIC YIELD",
	"yaxisParamUnit" : "kWp",
	"yaxisParamType" : "POWER",
	"plots" : [{
		"plotName" : "Pokhran Plant",
		"points" : [{
			"xaxisParamValue" : "2018-09-01",
			"yaxisParamValue" : "300.00"
		}, {
			"xaxisParamValue" : "2018-10-01",
			"yaxisParamValue" : "320.25"
		}, {
			"xaxisParamValue" : "2018-11-01",
			"yaxisParamValue" : "335.12"
		}, {
			"xaxisParamValue" : "2018-12-01",
			"yaxisParamValue" : "310.75"
		}, {
			"xaxisParamValue" : "2019-01-01",
			"yaxisParamValue" : "327.18"
		}]
	}, {
		"plotName" : "Salem Plant",
		"points" : [{
			"xaxisParamValue" : "2018-10-01",
			"yaxisParamValue" : "340.50"
		}, {
			"xaxisParamValue" : "2018-11-01",
			"yaxisParamValue" : "355.00"
		}, {
			"xaxisParamValue" : "2018-12-01",
			"yaxisParamValue" : "338.60"
		}]
	}]
}, {
	"chartName" : "TRIGGER VOLTAGE VS MPPT EFFICIENCY",
	"xaxisParamName" : "TRIGGER VOLTAGE",
	"xaxisParamUnit" : "V",
	"xaxisParamType" : "VOLTAGE",
	"yaxisParamName" : "MPPT EFFICIENCY",
	"yaxisParamUnit" : "%",
	"yaxisParamType" : "PERCENTAGE",
	"plots" : [{
		"plotName" : "INVERTER 100",
		"points" : [{
			"xaxisParamValue" : "0.0",
			"yaxisParamValue" : "0.0"
		}, {
			"xaxisParamValue" : "10.0",
			"yaxisParamValue" : "97.0"
		}, {
			"xaxisParamValue" : "20.0",
			"yaxisParamValue" : "98.5"
		}, {
			"xaxisParamValue" : "30.0",
			"yaxisParamValue" : "99.2"
		}]
	}, {
		"plotName" : "INVERTER 200",
		"points" : [{
			"xaxisParamValue" : "0.0",
			"yaxisParamValue" : "0.0"
		}, {
			"xaxisParamValue" : "10.0",
			"yaxisParamValue" : "96.2"
		}, {
			"xaxisParamValue" : "20.0",
			"yaxisParamValue" : "98.8"
		}, {
			"xaxisParamValue" : "30.0",
			"yaxisParamValue" : "99.0"
		}]
	}, {
		"plotName" : "INVERTER 300",
		"points" : [{
			"xaxisParamValue" : "0.0",
			"yaxisParamValue" : "0.0"
		}, {
			"xaxisParamValue" : "10.0",
			"yaxisParamValue" : "99.0"
		}, {
			"xaxisParamValue" : "20.0",
			"yaxisParamValue" : "99.2"
		}, {
			"xaxisParamValue" : "30.0",
			"yaxisParamValue" : "99.8"
		}]
	}]
}];
function openFunc(e) {

	if (OS_ANDROID) {
		var activity = $.PortfolioGraph.getActivity();
		if (activity) {
			Alloy.Globals.abx.title = jsonArray[0].chartName;
			Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);
			activity.onCreateOptionsMenu = function(e) {
				e.menu.clear();

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
					size : 28
				});
				var filterItem = e.menu.add({
					itemId : 102, // don't forget to set an id here
					title : "Filter",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});

				// ...then, let abx apply the custom font
				Alloy.Globals.abx.setMenuItemIcon({
					menu : e.menu,
					menuItem : filterItem,
					fontFamily : 'FontAwesome',
					icon : String.fromCharCode(0xf0b0),
					color : "#92ccc5",
					size : 26
				});

				homeItem.addEventListener('click', function(e) {
					backToHomeFunc();
				});
				filterItem.addEventListener('click', function(e) {
					filterClickFunc();
				});
			};
		}
	} else {
		$.PortfolioGraph.title = jsonArray[0].chartName;
	}
	$.kpiLbl.text = jsonArray[0].chartName;
}

function showFilter() {
	var animation = Titanium.UI.createAnimation();
	animation.height = Alloy.Globals.size_30;
	animation.duration = 300;
	return animation;
}

function hideFilter() {
	var animation = Titanium.UI.createAnimation();
	animation.height = 0;
	animation.duration = 300;
	return animation;
}

function applyFilterFunc() {

}

function resetFilterFunc() {

}

function filterClickFunc() {
	if (OS_ANDROID) {
		$.filterContainerVW.animate(showFilter());
	} else {
		$.filterContainerVW.height = Alloy.Globals.size_30;
	}

}

function hideFilterFunc() {
	if (OS_ANDROID) {
		$.filterContainerVW.animate(hideFilter());
	} else {
		$.filterContainerVW.height = 0;
	}

}

function backToHomeFunc() {
	Alloy.Globals.navWin.popToRootWindow({
		animated : true
	}, Alloy.Globals.currentWindow);
}

$.chartWebView.addEventListener('load', function() {
	$.chartWebView.evalJS('plotRankAnalyticsGraph(' + JSON.stringify(finalJson) + ')');
});

function mapGraphModalJson(jsonObj) {

	if (jsonObj.plots[0].hasOwnProperty('plotName')) {
		var graphJson = {

			'data' : []
		};
		var data = [];
		for (var i = 0; i < jsonObj.plots.length; i++) {
			graphJson = {

				'data' : []
			};

			graphJson.name = jsonObj.plots[i].plotName;
			for (var j = 0; j < jsonObj.plots[i].points.length; j++) {
				if ((jsonObj.xaxisParamType == "DATE")) {
					var date = new Date(jsonObj.plots[i].points[j].xaxisParamValue);
					graphJson.data.push({
						'x' : date.getTime(),
						'y' : parseFloat(jsonObj.plots[i].points[j].yaxisParamValue),
					});
				} else {
					graphJson.data.push({
						'x' : parseFloat(jsonObj.plots[i].points[j].xaxisParamValue),
						'y' : parseFloat(jsonObj.plots[i].points[j].yaxisParamValue),
					});
				}

			};
			data.push(graphJson);
		};
		jsonObj.plots = data;
	}
	finalJson = jsonObj;
	$.chartWebView.url = '/html/stock.html';
}

mapGraphModalJson(jsonArray[0]);

var moment = require('alloy/moment');

function openFromDatePicker() {
	openPicker('fromDate', 'date');
}

function openToDatePicker() {
	if ($.fromDateLbl.text == 'From Date') {
		showAlert('Please select from date first');
		return;
	}
	openPicker('toDate', 'date');
}

function openKPIPicker() {
	openPicker('kpi', 'val', jsonArray);
}

var pickerIndex = -1;
function openPicker(from, type, value) {
	var minValue = "";
	var dataValue = "";

	if (from == 'toDate') {
		minValue = $.fromDateLbl.pickerValue;
	} else if (from == 'kpi') {
		dataValue = value;
	}
	generalPicker($.PortfolioGraph, minValue, "", dataValue, type, 'graph', pickerIndex, function(showingDate, index) {
		pickerIndex = index;
		if (from == 'fromDate') {
			$.fromDateLbl.pickerValue = new Date(showingDate);
			$.fromDateLbl.text = moment(showingDate).format('YYYY-MM-DD');
			$.toDateLbl.pickerValue = "";
			$.toDateLbl.text = "To Date";
		} else if (from == 'toDate') {
			$.toDateLbl.pickerValue = new Date(showingDate);
			$.toDateLbl.text = moment(showingDate).format('YYYY-MM-DD');
		} else if (from == 'kpi') {
			$.kpiLbl.text = jsonArray[index].chartName;
			if (OS_ANDROID) {
				Alloy.Globals.abx.title = jsonArray[index].chartName;
			} else {
				$.PortfolioGraph.title = jsonArray[index].chartName;
			}
			mapGraphModalJson(jsonArray[index]);
		}

	});
}
