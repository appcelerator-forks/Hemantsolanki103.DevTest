// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var items = [];
var OCCURRENCE_INDEX =0;
var filteredDataSet = [];
// var kpiData = [{
	// type : "value",
	// title : 'Specific Yeild(kWh)',
	// value : "4.6"
// }, {
	// type : "value",
	// title : 'Generation Export(GWH)',
	// value :"5.23"
// }, {
	// type : "value",
	// title : 'Revenue Gain(R)',
	// value : '26.23 M'
// }, {
	// type : "value",
	// title : 'Revenue Loss(%)',
	// value : '2.5%'
// }, {
	// type : "percent",
	// title : 'Availability Grid(%)',
	// value : "60"
// }, {
	// type : "percent",
	// title : 'Availability Plant(%)',
	// value : 16.60
// }, {
	// type : "percent",
	// title : 'Performance Ration(%)',
	// value : 78
// }, {
	// type : "percent",
	// title : 'Capacity Utilization Factor CUF(%)',
	// value : 56
// }];

function openFunc(e) {
	if (OS_ANDROID) {
		var actionBarMenu = [{
			'type' : "icon",
			'text' : L('home_txt'),
			'code' : 0xf015,
			'fontFamily' : 'FontAwesome'
		}, {
			'type' : "icon",
			'text' : L('filter_title'),
			'code' : 0xf0b0,
			'fontFamily' : 'FontAwesome'
		}];
		Alloy.Globals.createActionBarMenu.createActionBarMenu($.PortfolioKPIScreen, L('portfolioKpi_txt'),actionBarMenu, function(e) {
			if (e.source.title == L('home_txt')) {
				backToHomeFunc();
			}
			if (e.source.title == L('filter_title')) {
				filterClickFunc();
			}
		});
	}
}

function filterClickFunc() {
	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var obj = {
		'from' : 'PortfolioKPI'
	};
	var filterScreen = Alloy.createController('FilterScreen', obj).getView();
	Alloy.Globals.navWin.openWindow(filterScreen, params);
}

function backToHomeFunc() {
		Alloy.Globals.navWin.popToRootWindow({
			animated : true
		},Alloy.Globals.currentWindow);
}

//Initialize the grid for all initial requirements
$.gridVW.init({
	columns : 2,
	space : 0,
	gridBackgroundColor :  Alloy.CFG.color.backgroundColor,
	itemHeightDelta : - Alloy.Globals.size_30,
	itemBackgroundColor : '#000',
	//itemBorderColor : '#4B7977',
	top: Alloy.Globals.size_46,
	bottom: Alloy.Globals.size_51,
	itemBorderWidth : 0,
	itemBorderRadius : 0,

});

//Function for render grid for differnt layout just for normal value or progress bar

	var items = [];
	function createGrid(kpiData) {
		items = [];
		for (var x = 0; x < kpiData.length; x++) {
			//CREATES A VIEW WITH OUR CUSTOM LAYOUT
			var mainVW = Ti.UI.createView({
				width : Ti.UI.FILL,
				height : Ti.UI.FILL,
				backgroundColor : Alloy.CFG.color.backgroundColor,
			});
			var containerVW = Ti.UI.createView({
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE,
				layout : 'vertical',
				zIndex:1
			});
			mainVW.add(containerVW);
			if (kpiData[x].kpiStatus == "OK") {
				var value = kpiData[x].kpiValue[kpiData[x].kpiCode];
				var nameUnit = kpiData[x].kpiName + " (" + kpiData[x].kpiUnit + ")";
				if (kpiData[x].kpiUnit == '%' || kpiData[x].kpiUnit == 'Percentage' || kpiData[x].kpiUnit == 'Percent' || kpiData[x].kpiUnit == 'PERCENT') {
					var value = kpiData[x].kpiValue[kpiData[x].kpiCode];
				}else{
					value = parseFloat(value).toFixed(2);
				}
			}else{
				var value = 0;
				var nameUnit = kpiData[x].kpiCode;
				mainVW.backgroundColor = "#ff3232";
				containerVW.opacity = 0.6;
				
			var errorLbl = Ti.UI.createLabel({
				    top:5,
					left : 5,
					right:5,
					font:{fontSize:Alloy.Globals.size_11},
					color : "white", 
					text : kpiData[x].kpiMessage,
					textAlign : 'center',
				});
				mainVW.add(errorLbl);
			}
			if (kpiData[x].kpiUnit == '%' || kpiData[x].kpiUnit == 'Percentage' || kpiData[x].kpiUnit == 'Percent' || kpiData[x].kpiUnit == 'PERCENT') {
				var progress = Alloy.createWidget("de.manumaticx.circularprogress");
				progressVW = progress.createView({
					margin : 0,
					height : Alloy.Globals.size_50,
					width : Alloy.Globals.size_50,
					backgroundColor : '#0F2D30',
					progressColor : '#31fff4',
					progressBackgroundColor : '#fba23f',
					progressWidth : Alloy.Globals.size_12,
					showText : true,
					color : '#fff',
					font : {
						fontSize : Alloy.Globals.size_11,
						fontFamily : 'Roboto Condensed',
					}
				});
				containerVW.add(progressVW);
				if (OS_IOS) {
					fakeProgress(progress, value);
				} else {
					progress.animate({
						value : value,
						duration : 500
					});
				}
			} else {
				//var text = '\uf0e7' + " " + kpiData[x].kpiValue[kpiData[x].kpiCode];
				
				var valueVW = Ti.UI.createView({
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE,
					layout : 'horizontal'
				});
				containerVW.add(valueVW);
				var iconLbl = Ti.UI.createLabel({
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE,
					color : "#fba23f",
					text : "\uf0e7",
					font : {
						fontFamily : "FontAwesome",
						fontSize : Alloy.Globals.size_18
					}
				});
				valueVW.add(iconLbl);
				var valueLbl = Ti.UI.createLabel({
					left : 10,
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE,
					color : "white",
					//attributedString:(kpiData[x].kpiStatus == "OK")? formateString(text,kpiData[x].kpiValue[kpiData[x].kpiCode]):formateString(text,"00"),
					text : value,
					textAlign : 'center',
				});
				valueVW.add(valueLbl);
			}
			var label = Ti.UI.createLabel({
				top : Alloy.Globals.size_10,
				left : Alloy.Globals.size_5,
				right : Alloy.Globals.size_5,
				height : Ti.UI.SIZE,
				text : nameUnit,
				color : "#92ccc5",
				textAlign : 'center',
				font : {
					fontSize : Alloy.Globals.size_13
				},
				height : Alloy.Globals.size_35,
				verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
			});
			containerVW.add(label);

			//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
			var values = {
				title : kpiData[x].kpiUnit
			};

			//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
			items.push({
				view : mainVW,
				data : values
			});
		};
		$.gridVW.addGridItems(items);
}




function formateString(text,value) {
	value = Number(value).toFixed(2);
	var attr = Titanium.UI.createAttributedString({
		text : text,
		attributes : [{
			type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value : '#fba23f',
			range : [0, 1]
		}, {
			type : Titanium.UI.ATTRIBUTE_FONT,
			value : {
				fontSize : Alloy.Globals.size_18,
				fontFamily : 'FontAwesome'
			},
			range : [0, 1]
		}, {
			type : Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
			value : '#fff',
			range : [text.indexOf(value), (value).length]
		}, {
			type : Titanium.UI.ATTRIBUTE_FONT,
			value : {
				fontSize : Alloy.Globals.size_15
			},
			range : [text.indexOf(value), (value).length]
		}]
	});
	return attr;
}


//Function for render value of progress bar at run time
function fakeProgress(obj,mainValue){
    var val = 0;
     var pInterval = setInterval(function(){
        obj.setValue(val++); 
     if (val >= parseInt(mainValue)){
     	obj.setValue(mainValue);
     	clearInterval(pInterval); 
     } 
    }, 30);
}
function getRandomColor() {
	var colors = ['#e2aaed', '#00abfd', '#f7e31b', '#fba23f','#fffaf0','#f4a460','#ba55d3','#9370db','#f08080','#f0fff0'];
	return colors[Math.floor(Math.random() * colors.length)];
} 
  
//Static occurrence array
var rows = [
  {'title': 'Daily'},
  {'title': 'Weekly'},
  {'title': 'Monthly'},
  {'title': 'Yearly'},
];

var currentDate = new Date();


function didClickRow(row) {
	OCCURRENCE_INDEX = row.index;
	currentDate = new Date();
	if(filteredDataSet.length>0){
		Alloy.Globals.commonFilterFunction(true,filteredDataSet);
	}
	
};
function getOccurrence(index){
	switch(index) {
	case 0:
		//Daily
		calculateFilterDate(0);
		break;
	case 1:
		//Weekly
		calculateFilterDate(7);
		break;
	case 2:
		//Monthly
		calculateFilterDate(30);
		break;
	case 3:
		//Yearly
		calculateFilterDate(365);
		break;
	}
}

function calculateFilterDate(days){
	var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		if(date.getMinutes()<10){
			var min = "0"+date.getMinutes();
		}else{
			var min = date.getMinutes();
		}
		consoleLog("Minutes",min);
		occurrenceDateObj = {
			'fromDate' : Alloy.Globals.moment(last).format('YYYY-MM-DD'),
			'fromTime' : "00:00",
			'toDate' : Alloy.Globals.moment(date).format('YYYY-MM-DD'),
			'toTime' : date.getHours() + ':' + min,
		};
		
}
 calculateFilterDate(0);
//Initailize the occurrence drop-down picker
function init(){
  var config = {
    initialMessage: 'Daily',
    rows: rows,
    right:Alloy.Globals.size_10 ,
    styles: {
      dropdown: { // Optional 
        backgroundColor: Alloy.CFG.color.buttonBackgroundColor,
        color: 'white',
      },
      row: {
        height:  Alloy.Globals.size_35, 
        top: Alloy.Globals.size_5,
        width: Alloy.Globals.size_150,
        backgroundColor: Alloy.CFG.color.lineColor, // Optional 
        selectionColor: '#ddd', // Optional 
        color: Alloy.CFG.color.backgroundColor, // Optional 
        font: { // Optional 
          fontSize: Alloy.Globals.size_12,
          fontFamily:Alloy.CFG.font.robotoRegular
        }
      }
    }
  };
  $.trendDropDown.init(config);
};
$.trendDropDown.on('didClickRow', didClickRow);
init();

Alloy.Globals.commonFilterFunction = function(isApply,filteredData) {
	if(!isApply){
		filteredDataSet = [];
		createGrid(filteredDataSet);
		$.filterLbl.text = L('nofilter_txt');
		return;
	}
	filteredDataSet = filteredData;
	$.filterLbl.text = L('filtered_apply_text'); 
	var KPI_LIST_API_REQUEST = createFinalRequestObject(filteredDataSet);
	Alloy.Globals.commonService.getKpiList(JSON.stringify(KPI_LIST_API_REQUEST), function(response) {
		consoleLog("RESPONSE",JSON.stringify(response));
		createGrid(response);
	});
}; 

function createFinalRequestObject(filteredData) {
	var finalData = [];
	getOccurrence(OCCURRENCE_INDEX);
	for (var i = 0; i < filteredData.length; i++) {
		finalData.push({
			"plantId" : filteredData[i].plantId,
			"instanceId" : filteredData[i].instanceId,
			"instanceType" : filteredData[i].instanceType,
			"kpiCode" : filteredData[i].kpiCode,
			"fromDate" : occurrenceDateObj.fromDate,
			"fromTime" : occurrenceDateObj.fromTime,
			"toDate" : occurrenceDateObj.toDate,
			"toTime" : occurrenceDateObj.toTime,
			"operation" : filteredData[i].operation
		});
	};
	consoleLog('Final', JSON.stringify(finalData));
	return finalData;
}

