// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var items = [];
var sample_data = [{
	type : "value",
	title : 'Specific Yeild(kWh)',
	value : 4.6
}, {
	type : "value",
	title : 'Generation Export(GWH)',
	value : 5.23
}, {
	type : "value",
	title : 'Revenue Gain(R)',
	value : '26.23 M'
}, {
	type : "value",
	title : 'Revenue Loss(%)',
	value : '2.5%'
}, {
	type : "percent",
	title : 'Availability Grid(%)',
	value : "60"
}, {
	type : "percent",
	title : 'Availability Plant(%)',
	value : 16.60
}, {
	type : "percent",
	title : 'Performance Ration(%)',
	value : 78
}, {
	type : "percent",
	title : 'Capacity Utilization Factor CUF(%)',
	value : 56
}];

function openFunc(e) {
	if (OS_ANDROID) {
		var activity = $.PortfolioKPIScreen.getActivity();
		if (activity) {
			Alloy.Globals.abx.title = L('portfolioKpi_txt');
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

					// icon: "/commonImages/helios_logo.png",
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
function createGrid() {
	for (var x = 0; x < sample_data.length; x++) {

		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var mainVW = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			backgroundColor:Alloy.CFG.color.backgroundColor,
		
		});
		var containerVW = Ti.UI.createView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			
			layout : 'vertical'
		});
		mainVW.add(containerVW);
		if (sample_data[x].type == 'value') {
			var valueLbl = Ti.UI.createLabel({
				//top:Alloy.Globals.size_40,
				width : Ti.UI.SIZE,
				height : Ti.UI.SIZE,
				text : sample_data[x].value,
				color : "white",
				textAlign : 'center',
				font : {
					fontSize :  Alloy.Globals.size_15
				},

			});
			containerVW.add(valueLbl);

		} else {
			var progress = Alloy.createWidget("de.manumaticx.circularprogress");
			progressVW = progress.createView({
				margin : 0,
				//top:Alloy.Globals.size_20,
				height :  Alloy.Globals.size_50,
				width :  Alloy.Globals.size_50,
				backgroundColor : '#0F2D30',
				progressColor : '#31fff4',
				progressBackgroundColor : '#fba23f',
				progressWidth :  Alloy.Globals.size_12,
				showText : true,
				color : '#fff',
				font : {
					fontSize :  Alloy.Globals.size_11,
					fontFamily : 'Roboto Condensed',

				}
			});
			
			containerVW.add(progressVW);
			if(OS_IOS){
				fakeProgress(progress, sample_data[x].value);
			}else{
				progress.animate({
					value:  sample_data[x].value,
					duration: 500
				});
			}
			

		}
		var label = Ti.UI.createLabel({
			top : Alloy.Globals.size_10,
			left: Alloy.Globals.size_5,
			right: Alloy.Globals.size_5,
			height : Ti.UI.SIZE,
			text : sample_data[x].title,

			color : "#92ccc5",
			textAlign : 'center',
			font : {
				fontSize :  Alloy.Globals.size_13
			},
		height : Alloy.Globals.size_35,
		verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		containerVW.add(label);

		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title : sample_data[x].title,
			image : sample_data[x].image
		};

		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view : mainVW,
			data : values
		});
	};
	$.gridVW.addGridItems(items);
}
createGrid();
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
  




var rows = [
  {'title': 'Daily'},
  {'title': 'Weekly'},
  {'title': 'Monthly'},
  {'title': 'Yearly'},
];

function didClickRow(row) {
  // Do something with the value from the clicked option
  Ti.API.info(JSON.stringify(row)); // Logs {title: 'tilteName', index: 3}
}

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
