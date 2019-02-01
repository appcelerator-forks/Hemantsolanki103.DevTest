// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/*
 * This screen common for showing notification detail as well as insight detail
 */

if (args.from == "news") {
	$.DetailScreen.title = L("insight_detail_txt");
	$.img_type.image = (args.news_type == "good") ? '/commonImages/goodIcon.png' : (args.news_type == "bad") ? '/commonImages/badIcon.png' : (args.news_type == "weather") ? '/commonImages/weather.png' : (args.news_type == "maintenance") ? '/commonImages/maintenanceIcon.png' : (args.news_type == "industry") ? '/commonImages/factory.png' : '/commonImages/newsIcon.png';
	$.titleLbl.text = args.news_title;
	$.descLbl.text = args.news_desc;
} else {
	$.DetailScreen.title = L("noti_detail_txt");
	$.img_type.image = (args.noti_type == "alert") ? '/commonImages/alertIcon.png' : (args.noti_type == "alarm") ? '/commonImages/alarmIcon.png' : (args.noti_type == "warning") ? '/commonImages/warningIcon.png' : (args.noti_type == "emergency") ? '/commonImages/emergencyIcon.png' : 'none';
	$.titleLbl.text = args.noti_title;
	$.descLbl.text = args.noti_desc;
}

function openFunc(e) {
	if (OS_ANDROID) {
		var activity = $.DetailScreen.getActivity();
		if (activity) {
			if (args.from == "news") {
				Alloy.Globals.abx.title = L('insight_detail_txt');
			} else {
				Alloy.Globals.abx.title = L('noti_detail_txt');
			}
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
					
					// icon: "/commonImages/helios_logo.png",
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
		},Alloy.Globals.currentWindow);
	
}
