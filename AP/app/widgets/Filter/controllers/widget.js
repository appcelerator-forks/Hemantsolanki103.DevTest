exports.filter_init = function(data){
	consoleLog("Test",data);
};


function postLayoutFunc() {
	Alloy.Globals.commonService.getPlantListByOrganizationIDDetails('', function(response) {
		plantArray = createCompatibleArrayForPlantFilter(response, 'All Portfolio');
		$.containerVW.visible = true;
		consoleLog('plantArray', JSON.stringify(response));
		init(plantTitle, plantArray, $.portfolioDropDown);
	});
}

function init(msg, data, dropDownObj) {
	var config = {
		initialMessage : msg,
		rows : data,
		styles : {
			dropdown : {// Optional
				backgroundColor : Alloy.CFG.color.buttonBackgroundColor,
				color : 'white',
			},
			row : {
				height : Alloy.Globals.size_40,
				top : Alloy.Globals.size_1,
				width : Ti.UI.FILL,
				backgroundColor : Alloy.CFG.color.lineColor, // Optional
				selectionColor : '#ddd', // Optional
				color : Alloy.CFG.color.backgroundColor, // Optional
				font : {// Optional
					fontSize : Alloy.Globals.size_13,
					fontFamily : Alloy.CFG.font.robotoRegular
				}
			}
		}
	};
	dropDownObj.init(config);
};
init("Full Portfolio", [], $.portfolioDropDown);
$.portfolioDropDown.on('didClickRow', selectPlant);
function selectPlant(row) {
	// Do something with the value from the clicked option
	Ti.API.info(JSON.stringify(row));
	plantTitle = row.title;
	if (plantId == row.id) {
		return;
	}
	plantId = row.id;
	if (row.id == 0 || row.id == undefined) {
		if (kpiArray.length > 1) {
			kpiArray = [];
			filterDataForKpi = [];
			$.kpiTable.setHeight(0);
			$.kpiTable.setData([]);
			$.kpiTable.toggle = false;
			$.dropdownIcon.text = "\uf13a";
			renderKpiRow(kpiArray);
		}
		return;
	}
	Alloy.Globals.commonService.getKpiCodeList(plantId, function(response) {
		kpiArray = [];
		filterDataForKpi = [];
		if (response) {
			kpiArray = createCompatibleArrayForKpiFilter(response);
			renderKpiRow(kpiArray);
			consoleLog('KPI LIST', JSON.stringify(response));
		} else {
			renderKpiRow(kpiArray);
		}
	});
}

function createCompatibleArrayForPlantFilter(res, firstIndexMsg) {
	var arry = [{
		'title' : firstIndexMsg,
		'id' : 0
	}];
	for (var i = 0; i < res.length; i++) {
		arry.push({
			'title' : res[i].displayName,
			'id' : res[i].id
		});
	};
	return arry;
}

var kpiTableData = [];
function renderKpiRow(data) {
	kpiTableData = [];
	for (var i = 0; i < data.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : Alloy.Globals.size_40,
			backgroundColor : Alloy.CFG.color.lineColor,
			detail : data[i],
			check : data[i].hasCheck,
			tintColor : Alloy.CFG.color.backgroundColor,
			selectedBackgroundColor : "#ddd"
		});
		var kpiLbl = Ti.UI.createLabel({
			left : Alloy.Globals.size_10,
			color : Alloy.CFG.color.backgroundColor,
			text : data[i].name,
			width : '80%',
			font : {
				fontSize : Alloy.Globals.size_13,
				fontFamily : Alloy.CFG.font.robotoRegular
			},
			focusable : false,
			touchEnabled : false
		});
		row.add(kpiLbl);
		var checkBox = Ti.UI.createImageView({
			right : Alloy.Globals.size_10,
			height : Alloy.Globals.size_20,
			width : Alloy.Globals.size_20,
			image : (data[i].hasCheck) ? "/commonImages/checked.png" : "/commonImages/uncheck.png",
			// color : Alloy.CFG.color.backgroundColor,
			// text : (data[i].hasCheck)?"\uf058":"\uf111",
			// font : {
			// fontSize : Alloy.Globals.size_20,
			// fontFamily : "FontAwesome",
			// fonType:"Regular"
			// },
			focusable : false,
			touchEnabled : false
		});
		row.add(checkBox);
		kpiTableData.push(row);
	};
	$.kpiTable.setData(kpiTableData);
	$.kpiVW.height = Alloy.Globals.size_40;
}

function createCompatibleArrayForKpiFilter(res) {
	var arry = [];
	for (var i = 0; i < res.length; i++) {
		arry.push({
			'plantId' : plantId,
			"instanceId" : plantId,
			"instanceType" : "PLANT",
			'name' : res[i].name,
			'kpiCode' : res[i].code,
			'id' : res[i].id,
			"hasCheck" : false,
			"operation" : "LAST"
		});
	};
	return arry;
}

function kpiToggleDropDown(e) {
	if (e.source.toggle) {
		$.kpiTable.setHeight(0);
		$.kpiTable.setData([]);
		e.source.toggle = false;
		$.dropdownIcon.text = "\uf13a";
	} else {
		$.dropdownIcon.text = "\uf139";
		$.kpiTable.setHeight(Ti.UI.SIZE);
		renderKpiRow(kpiArray);
		e.source.toggle = true;
	}
}

function kpiTableClickFunc(e) {
	if (e.row.check) {
		e.row.check = false;
		e.row.getChildren()[1].image = "/commonImages/uncheck.png";
		kpiArray[e.index].hasCheck = false;
	} else {
		e.row.check = true;
		e.row.getChildren()[1].image = "/commonImages/checked.png";
		kpiArray[e.index].hasCheck = true;
	}
	appendKpi(e.row.detail.id, e.row.detail);
}

function appendKpi(id, kpiJson) {
	var kpiIndex = getIndex(id);
	if (kpiIndex == -1) {
		kpiJson.hasCheck = true;
		filterDataForKpi.push(kpiJson);
		//consoleLog("add", JSON.stringify(filterDataForKpi));
	} else {
		filterDataForKpi.splice(kpiIndex, 1);
		//consoleLog("delete", JSON.stringify(filterDataForKpi));
	}
}

function getIndex(id) {
	for (var i = 0; i < filterDataForKpi.length; i++) {
		if (filterDataForKpi[i].id == id) {
			return i;
		}
	};
	return -1;
}