// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function openFunc(e) {
	if (OS_ANDROID) {
		var activity = $.PortfolioRank.getActivity();
		if (activity) {
			Alloy.Globals.abx.title = L('portfolioRank_txt');
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
//Calling function for populate the trend dropdown	
init();
//Create array for top n worst picker
createTopNWorstArray();
}

function closeFunc(){
	$.PortfolioRank.removeAllChildren();
}

function filterClickFunc() {
	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var obj = {
		'from' : 'PortfolioRank'
	};
	var filterScreen = Alloy.createController('FilterScreen', obj).getView();
	Alloy.Globals.navWin.openWindow(filterScreen, params);
}



function backToHomeFunc() {
	
		Alloy.Globals.navWin.popToRootWindow({
			animated : true
		},Alloy.Globals.currentWindow);
	
}
function showGraphFunc(e){
	var params = {};
	params.displayHomeAsUp = true;
	params.swipeBack = false;
	var obj = {
		'from' : 'PortfolioRank'
	};
	var graph = Alloy.createController('PortfolioGraph', obj).getView();
	Alloy.Globals.navWin.openWindow(graph, params);
	graph.oldWin = $.PortfolioRank;
	Alloy.Globals.currentWindow = graph;
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





var defaultRow = 3;
var per = [{
	'location' : 'Pune',
	'unit' : '20MW',
	'val' : 90
}, {
	'location' : 'Bhopal',
	'unit' : '1000MW',
	'val' : 85
}, {
	'location' : 'Amritsar',
	'unit' : '100MW',
	'val' : 67
}, {
	'location' : 'Mumbai',
	'unit' : '10000MW',
	'val' : 60
}, {
	'location' : 'Kolkata',
	'unit' : '20MW',
	'val' : 55
}, {
	'location' : 'Bihar',
	'unit' : '1000MW',
	'val' : 50
}, {
	'location' : 'Hyderabad',
	'unit' : '100MW',
	'val' : 40
}, {
	'location' : 'Delhi',
	'unit' : '10000MW',
	'val' : 30
}];
var filter_length = (per.length >= 3) ? 3 : per.length;

$.topLbl.text = "Top " + filter_length + ' Plant';
$.worstLbl.text = "Worst " + filter_length + ' Plant';

function worstPlant(tableSection, data, filterLength) {
	var k = 1;
	for (var i = data.length - 1; i >= 0; i--) {
		if (k <= filterLength) {
			var row = Ti.UI.createTableViewRow({
				height : Ti.UI.SIZE,
				zIndex : 10
			});
			var valueBar = Alloy.createWidget('com.mcvendrell.valuebar');
			row.add(valueBar.getView());

			valueBar.init(data[i].val, 100, data[i].unit, per[i].location, '#d6abab', '#f83d3e');
			tableSection.add(row);
		}
		k++;
	};
	$.rankTable.setData($.rankTable.data);
}

function topPlant(tableSection, data, filterLength) {

	for (var i = 0; i < filterLength; i++) {

		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			zIndex : 10
		});
		var valueBar = Alloy.createWidget('com.mcvendrell.valuebar');
		row.add(valueBar.getView());
		valueBar.backgroundColor = "red";
		valueBar.init(data[i].val, 100, data[i].unit, per[i].location, '#d7eddf', '#43db46');
		tableSection.add(row);

	};
	$.rankTable.setData($.rankTable.data);
}

topPlant($.rankTable.data[0], per, filter_length);
worstPlant($.rankTable.data[1], per, filter_length);

//Function for reset row of section: when select filter and remove all row of section and new one
function emptySection(tableView, sectionIndex) {
	var sectionRows = tableView.data[sectionIndex].rows;
	for (var i = 0; i < sectionRows.length; i++) {
		tableView.data[sectionIndex].remove(sectionRows[i]);
	};
	tableView.setData(tableView.data);
}

//Varibale define for selected index of picker by which whenever open the picker its by default show the previous one
var topPickerIndex = (OS_IOS)?0:-1;
    worstPickerIndex = (OS_IOS)?0:-1;

function openTopPicker(e) {
	openTopNWorstPicker(e);
}

function openWorstPicker(e) {
	openTopNWorstPicker(e);
}

//Function for open the picker for both top and worst level selection
function openTopNWorstPicker(e) {
	var sectionIndex = e.source.index;
	var plantPicker = Alloy.createWidget("general.picker", "widget", {
		onDone : function(selectedValue, index) {
			filter_length = index + 1;

			emptySection($.rankTable, sectionIndex);
			if (e.source.index == 0) {
				$.topLbl.text = selectedValue;
				topPickerIndex = index;
				topPlant($.rankTable.data[sectionIndex], per, filter_length);
			} else {
				$.worstLbl.text = selectedValue;
				worstPickerIndex = index;
				worstPlant($.rankTable.data[sectionIndex], per, filter_length);
			}
		},
		minDate : "",
		maxDate : "",
		value : (e.source.index == 0) ? topArray : worstArray,
		from:'rank',
		type : "val",
		selectedIndex : (e.source.index == 0) ? topPickerIndex : worstPickerIndex,

	});
	if (OS_IOS) {
		if ($.containerVW.getChildren().length > 1) {
			for (var i = 0; i < $.containerVW.getChildren().length; i++) {
				if ($.containerVW.getChildren()[i].id == "widget") {
					$.containerVW.remove($.containerVW.getChildren()[i]);
				}
			};
		}
		$.containerVW.add(plantPicker.getView());
		plantPicker.getView().showPicker();
	}
	
}

//Array define for creating dataset for top and worst plant filter
var topArray = [];
var worstArray = [];

//function will generate dataset for topArray and worstArray datasets
function createTopNWorstArray() {
	var k = 1;
	for (var i = 0; i < per.length; i++) {
		topArray[i] = "Top " + k + " plant";
		worstArray[i] = "Worst " + k + " plant";
		k++;
	};

}


