// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// $.portfolioSelectionLbl.text = "All Portfolio";


var rows = [
  {'title': 'Full Portfolio'},
  {'title': 'Plant: Pune'},
  {'title': 'Plant: Gujrat'},
  {'title': 'Plant: Mumbai'},
];


function didClickRow(row) {
  // Do something with the value from the clicked option
  Ti.API.info(JSON.stringify(row)); // Logs {title: 'tilteName', index: 3}
}

function init(){
  var config = {
    initialMessage: 'Full Portfolio',
    rows: rows,
    styles: {
      dropdown: { // Optional 
        backgroundColor: Alloy.CFG.color.buttonBackgroundColor,
        color: 'white',
        
      },
      row: {
        height:  Alloy.Globals.size_40, 
        top: Alloy.Globals.size_1,
        width: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.color.lineColor, // Optional 
        selectionColor: '#ddd', // Optional 
        color: Alloy.CFG.color.backgroundColor, // Optional 
        font: { // Optional 
          fontSize: Alloy.Globals.size_13,
          fontFamily:Alloy.CFG.font.robotoRegular
        }
      }
    }
  };
  $.portfolioDropDown.init(config);
  $.zone.init(config);
};
$.portfolioDropDown.on('didClickRow', didClickRow);

function openFunc(e){
	init();
	if (OS_ANDROID) {
	
			var activity = $.FilterScreen.getActivity();
	
			if (activity) {
	
				Alloy.Globals.abx.title = L('filter_title');
				Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);
	
				activity.onCreateOptionsMenu = function(e) {
	
					e.menu.clear();
					// Using MaterialIcons for MenuItems
					var resetItem = e.menu.add({
						itemId : 101, // don't forget to set an id here
						title : L("reset_txt"),
						color:"white",
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
					});
					
	
					// first, create the item...
					var applyFilter = e.menu.add({
						itemId : 102, // don't forget to set an id here
						title : L("apply_txt"),
						color:"#fffff",
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
					});
					resetItem.addEventListener('click', function(e) {
						resetFilterFunc();
					});
					applyFilter.addEventListener('click', function(e) {
						applyFilterFunc();
					});
				};
	
			}
		}
	
}

function applyFilterFunc(){
	
}

function resetFilterFunc(){
	
}
