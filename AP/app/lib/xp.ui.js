if (!OS_IOS) {

	var NavigationWindow = function(args) {
		this.args = args;
	};

	NavigationWindow.prototype.open = function(params) {
		params = params || {};
		params.displayHomeAsUp = false;
		return this.openWindow(this.args.window, params);
	};

	NavigationWindow.prototype.close = function(params) {
		return this.closeWindow(this.args.window, params);
	};
	NavigationWindow.prototype.popToRootWindow = function(params,win) {

		try {
			if (win == null) {
				return;
			}
			if (win.oldWin != null) {
				this.popToRootWindow({animated:true},win.oldWin);
			}

			win.close();
		} catch(e) {
			consoleLog("Android popToRootWindow Error",e.message);
		}
	};

	NavigationWindow.prototype.openWindow = function(window, options) {
		var that = this;

		options = options || {};
		options.swipeBack = ( typeof options.swipeBack === 'boolean') ? options.swipeBack : that.args.swipeBack;
		options.displayHomeAsUp = ( typeof options.displayHomeAsUp === 'boolean') ? options.displayHomeAsUp : that.args.displayHomeAsUp;

		if (OS_ANDROID && options.animated !== false) {
			options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
			options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
		}

		if (options.swipeBack !== false) {
			window.addEventListener('swipe', function(e) {
				if (e.direction === 'right') {

					//that.closeWindow(window, options);
				}
			});
		}

		if (OS_ANDROID && options.displayHomeAsUp !== false && !window.navBarHidden) {
			window.addEventListener('open', function() {
				var activity = window.getActivity();
				if (activity) {
					var actionBar = activity.actionBar;
					if (actionBar) {
						actionBar.displayHomeAsUp = true;
						actionBar.onHomeIconItemSelected = function() {
							that.closeWindow(window, options);
						};
					}
				}
			});
		}

		return window.open(options);
	};

	NavigationWindow.prototype.closeWindow = function(window, options) {
		options = options || {};
		if (OS_ANDROID && options.animated !== false) {
			options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
			options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
		}
		return window.close(options);
	};
}

exports.createNavigationWindow = function(args) {
	var navWin = OS_IOS ? Ti.UI.iOS.createNavigationWindow(args) : new NavigationWindow(args);

	if (args && args.id) {
		Alloy.Globals[args.id] = navWin;
	}

	return navWin;
}; 