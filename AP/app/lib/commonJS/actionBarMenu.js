//This JS file use for creating menu item for every screen because we have to write same code for each screen in Android

exports.createActionBarMenu = function(win, winTitle, numberOfBtn,callback) {
	if (OS_ANDROID) {

		var activity = win.getActivity();

		if (activity) {

			Alloy.Globals.abx.title = winTitle;
			Alloy.Globals.abx.setTitleColor(Alloy.CFG.color.lineColor);

			activity.onCreateOptionsMenu = function(e) {
				e.menu.clear();

				for (var i = 0; i < numberOfBtn.length; i++) {
					if (numberOfBtn[i].type == 'text') {
						var btnObj = e.menu.add({
							itemId : i, // don't forget to set an id here
							title : numberOfBtn[i].text,
							color : "white",
							showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
						});

					} else {
						var btnObj = e.menu.add({
							itemId : i, // don't forget to set an id here
							title : numberOfBtn[i].text,
							color : "white",
							showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
						});
						// ...then, let abx apply the custom font
						Alloy.Globals.abx.setMenuItemIcon({
							menu : e.menu,
							menuItem : btnObj,
							fontFamily : numberOfBtn[i].fontFamily,
							icon : String.fromCharCode(numberOfBtn[i].code),
							color : "#92ccc5",
							size : 26
						});
					}
					btnObj.addEventListener('click', function(e) {
						callback(e);
					});
				};
			};
		}
	}
};
