/*** Require ***/
var moment = require("alloy/moment");
var args = arguments[0] || {};
var onDone = args.onDone;

/* Initialize the Widget */
init();

/*** Functions ***/
function init() {
	if (OS_IOS) {
		$.widget.height = args.height || 255;
		$.widget.bottom = args.bottom || -265;
	}
	if (args.type == "val") {
		if (OS_IOS) {

			var data = [];
			for (var i = 0; i < args.value.length; i++) {
				var row = Ti.UI.createPickerRow({
					title : (args.from == 'graph') ? args.value[i].chartName : args.value[i],

				});
				data.push(row);

			};

			$.picker.setSelectedRow(0, args.selectedIndex, false);
			$.picker.add(data);
		} else {
			var optionsDialog = Ti.UI.createOptionDialog({
				options :  ["TIME VS SPECIFIC YIELD","TRIGGER VOLTAGE VS MPPT EFFICIENCY"],
				buttonNames : ['Cancel'],
				title : "Select Option",
				selectedIndex : args.selectedIndex
			});
			optionsDialog.show();
			optionsDialog.addEventListener('click', function(e) {

				if (e.button === true && e.index === 0) {

				} else if (e.index != -1) {
					done(e.source.options[e.index], e.index);
				}

			});
		}

		

	} else {

		if (OS_IOS) {
			/* Must set the type of the picker programmatically for iOS
			 to prevent conflict with the Android picker dialog. The
			 Android version will be taken care of in the function
			 showDatePicker().
			 */
			if (args.type == "time") {
				$.picker.setType(Titanium.UI.PICKER_TYPE_TIME);
			} else {
				$.picker.setType(Titanium.UI.PICKER_TYPE_DATE);
			}

		}
		/* Set the value, if applicable */
		if (args.value) {

			$.picker.setValue(args.value);
		}

		/* Set the minimum and maximum dates, if applicable */
		if (args.minDate) {
			if (OS_IOS) {
				$.picker.setMinDate(args.minDate);
			}
			if (OS_ANDROID) {
				$.picker.minDate = args.minDate;
			}
		}

		if (args.maxDate) {
			if (OS_IOS) {
				$.picker.setMaxDate(args.maxDate);
			}
			if (OS_ANDROID) {
				$.picker.maxDate = args.maxDate;
			}
		}
	}
}
function createArrayForAndroid(data){
	var options = [];
	for (var i=0; i < data.length; i++) {
	  options.push(data[i].chartName);
	};
	consoleLog('options',JSON.stringify(options));
	return options;
	
}

function showPicker() {

	if (OS_IOS) {
		/* The iOS Picker will be slide up and
		 * down the screen.
		 */
		$.widget.animate(Ti.UI.createAnimation({
			bottom : 0,
			duration : 300
		}));

	} else if (OS_ANDROID) {
		/* The Android picker will be a pop-up
		 * dialog. */
		if (args.value) {

			$.picker.setValue(args.value);
		}

		/* Set the minimum and maximum dates, if applicable */
		if (args.minDate) {
			if (OS_IOS) {
				$.picker.setMinDate(args.minDate);
			}
			if (OS_ANDROID) {
				$.picker.minDate = args.minDate;
			}
		}

		if (args.maxDate) {
			if (OS_IOS) {
				$.picker.setMaxDate(args.maxDate);
			}
			if (OS_ANDROID) {
				$.picker.maxDate = args.maxDate;
			}
		}

		if (args.type == "time") {
			$.picker.showTimePickerDialog({

				format24 : true,
				callback : function(e) {
					if (e.cancel) {
						Ti.API.info('User canceled dialog');
					} else {
						done(e, 0);
					}
				}
			});
		} else {
			$.picker.showDatePickerDialog({
				value : (args.value) ? args.value : new Date(),
				callback : function(e) {
					if (e.cancel) {
						Ti.API.info('User canceled dialog');
					} else {
						done(e, 0);
					}
				}
			});

		}
	}
}

var selectedValueIOS = '',
    selectedIndexIOS = 0;
function pickerChangeFunc(e) {

	if (args.type == "time" || args.type == "date") {

		selectedValueIOS = e.value;
		selectedIndexIOS = 0;
	} else {
		consoleLog("e", JSON.stringify(e));
		selectedValueIOS = e.selectedValue[0];
		selectedIndexIOS = e.rowIndex;
	}

}

function done(e, index) {

	/* This function is called when the user has decided to
	 * select a date and desires to apply to the designated
	 * textfield. Pass the picker as parameters to get the
	 * value and be formatted.
	 */
	if (OS_IOS) {
		hidePicker();
		if (args.type == "time" || args.type == "date") {
			onDone(selectedValue($.picker), index);
		} else {
			consoleLog("selectedValueIOS", selectedValueIOS);
			onDone(selectedValueIOS, selectedIndexIOS);
		}
	} else if (OS_ANDROID) {
		if (args.type == "time" || args.type == "date") {
			if (!e.cancel) {
				onDone(selectedValue(e), index);
			}
		} else {
			onDone(e, index);
		}

	}

}

function hidePicker() {
	/* This how to hide the iOS Picker. Hiding the Android
	 * Picker is taken care of the Picker's
	 * showDatePickerDialog property
	 */
	$.widget.animate(Ti.UI.createAnimation({
		bottom : '-265dp',
		duration : 300
	}));

}

function selectedValue(picker) {
	/* Get the selected date and format using moment.js */
	if (args.type == "time" || args.type == "date") {
		return moment(picker.value);
	}

}

if (OS_IOS) {
	/*** Make accessable outside the widget ***/
	$.widget.showPicker = showPicker;
	$.widget.hidePicker = hidePicker;
}

