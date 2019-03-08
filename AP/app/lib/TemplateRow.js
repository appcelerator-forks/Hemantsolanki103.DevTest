exports.createRow = function(datasource, type, tbl, from) {

	var tableRow = [];

	for (var i = 0; i < datasource.length; i++) {
		if (type == "all" || (from == "news" && type == datasource[i].news_type) || (from == "notification" && type == datasource[i].noti_type)) {
			var row = Titanium.UI.createTableViewRow({
				height : Alloy.Globals.size_120,
				touchFeedback : true,
				touchFeedbackColor : Alloy.CFG.color.lineColor,
				detail : datasource[i],
				focusable : true,
				//	backgroundSelectedColor : 'gray',

			});
			if (OS_IOS) {
				row.selectionStyle = Titanium.UI.iOS.TableViewCellSelectionStyle.NONE;
			}

			row.add(Ti.UI.createImageView({
				height : Alloy.Globals.size_22,
				width : Alloy.Globals.size_22,
				top : Alloy.Globals.size_10,
				left : Alloy.Globals.size_10,
				touchEnabled : false,

			}));
			if (from == "notification") {
				row.getChildren()[0].image = (datasource[i].noti_type == "alert") ? '/commonImages/alertIcon.png' : (datasource[i].noti_type == "alarm") ? '/commonImages/alarmIcon.png' : (datasource[i].noti_type == "warning") ? '/commonImages/warningIcon.png' : (datasource[i].noti_type == "emergency") ? '/commonImages/emergencyIcon.png' : '/commonImages/bell.png';
			} else {
				row.getChildren()[0].image = (datasource[i].news_type == "good") ? '/commonImages/goodIcon.png' : (datasource[i].news_type == "bad") ? '/commonImages/badIcon.png' : (datasource[i].news_type == "weather") ? '/commonImages/weather.png' : (datasource[i].news_type == "maintenance") ? '/commonImages/maintenanceIcon.png' : (datasource[i].news_type == "industry") ? '/commonImages/factory.png' : '/commonImages/newsIcon.png';
			}

			//Title Label
			row.add(Ti.UI.createLabel({
				top : Alloy.Globals.size_8,
				left : Alloy.Globals.size_40,
				right : Alloy.Globals.size_40,
				height : Alloy.Globals.size_24,
				font : {
					fontFamily : Alloy.CFG.font.robotoMedium,
					fontSize : Alloy.Globals.size_18
				},
				text : (from == "notification") ? datasource[i].noti_title : datasource[i].news_title,
				color : Alloy.CFG.color.listTitleColor,
				maxLines : 1,
				ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
				touchEnabled : false,
			}));
			//Description Label
			row.add(Ti.UI.createLabel({
				top : Alloy.Globals.size_38,
				left : Alloy.Globals.size_40,
				right : Alloy.Globals.size_40,
				height : Alloy.Globals.size_75,
				font : {
					fontFamily : Alloy.CFG.font.robotoMedium,
					fontSize : Alloy.Globals.size_14
				},
				text : (from == "notification") ? datasource[i].noti_desc : datasource[i].news_desc,
				color : Alloy.CFG.color.lineColor,
				maxLines : 4,
				ellipsize : Titanium.UI.TEXT_ELLIPSIZE_TRUNCATE_END,
				touchEnabled : false,
				verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
				textAlign : Titanium.UI.TEXT_ALIGNMENT_JUSTIFY
			}));
			//Description Label
			row.add(Ti.UI.createLabel({
				right : Alloy.Globals.size_10,
				font : {
					fontFamily : 'FontAwesome',
					fontSize : Alloy.Globals.size_24,
					fontWeight : "bold"
				},
				text : '\uf105',
				color : Alloy.CFG.color.lineColor,
				touchEnabled : false,
			}));
			tableRow.push(row);
		}
	};
	tbl.setData(tableRow);
}; 