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

if (args.from == "news") {
	var winTitle = L('insight_detail_txt');
} else {
	var winTitle = L('noti_detail_txt');
}
function openFunc(e) {
	if (OS_ANDROID) {
		var actionBarMenu = [{
			'type' : "icon",
			'text' : L('home_txt'),
			'code' : 0xf015,
			'fontFamily' : 'FontAwesome'
		}];
		Alloy.Globals.createActionBarMenu.createActionBarMenu($.DetailScreen, winTitle, actionBarMenu, function(e) {
			if (e.source.title == L('home_txt')) {
				backToHomeFunc();
			}
		});
	}
}

function backToHomeFunc() {
	Alloy.Globals.navWin.popToRootWindow({
		animated : true
	}, Alloy.Globals.currentWindow);

}
