var args = arguments[0] || {};

// Custom properties that can/should be set in the TSS of the view where you're putting the value bar
var width = args.width || '90%', 
	title = args.title || "",
	//unitLbl= args.unitLbl || "10000MW",
    titleAlign = args.titleAlign || "left",
	valueColor = args.valueColor || "#9F4CF2",
	backgroundColor = args.backgroundColor || "#B285F5",
    barHeight = args.barHeight || '12dp',
    titleFont = args.titleFont || (OS_IOS ? {
		fontFamily: 'Avenir-Light',
		fontSize: 17
	} : {
		fontSize: '17dp'
	}),
    // User wants to show values inside the valueBar?
    showValuesInside = args.showValuesInside || true,
	valueText = args.valueText || "",
	valueTextColor = args.valueTextColor || "#0f2d30",
    valueTextFont = args.valueTextFont || (OS_IOS ? {
		fontFamily: 'Avenir-Light',
		fontSize: 8
	} : {
		fontSize: '8dp'
	});

// Internal value for holding total
var g_total = 100;

// Transforms values into percentages
function valToPct(value) {
    return String(parseInt(100 * value / g_total)) + "%";
}

// Initializes the widget
exports.init = function(value, total,unitLbl,titleText,valueWrapperColor,valueColor) {
    // Set config
    
    $.wrapper.width = width;
    $.title.text = titleText;
    $.unitLbl.text=unitLbl;
    $.title.textAlign = titleAlign;
    $.valueWrapper.backgroundColor = valueWrapperColor;
    $.valueWrapper.height = barHeight;
    $.value.backgroundColor = valueColor;
    $.value.font = titleFont;
    // Set global total
    g_total = total;
    // Set value
    exports.setVal(value);
};

// Defines a new total
exports.setTotal = function(total) {
    g_total = total;
};

// Defines the % of bar to fill
exports.setVal = function(value) {
    if (showValuesInside) {
        $.valueText.color = valueTextColor;
        $.valueText.font = valueTextFont;

        if (valueText === '') {
            // Set, automatically, value/total and %
            //$.valueText.text = value + "/" + g_total + " (" + valToPct(value) + ")";
            $.valueText.text =  " (" + valToPct(value) + ")";
        } else {
            // Set user text
            $.valueText.text = valueText;
        }
    }
    // Set value
    $.value.width = valToPct(value);
};

// Defines a new valueText (useful to update valueText after the initial value)
exports.setValueText = function(text) {
    valueText = text;
};
