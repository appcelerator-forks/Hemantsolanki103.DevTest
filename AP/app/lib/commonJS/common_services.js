

/* Common API function for get plant list 
 * API for getting plant list with respect to organisationId i.e we will get from userData object
 * Where used: Map screen , filter screen 
 */
 exports.getPlantListByOrganizationIDDetails=function(data,callback) {
 	Alloy.Globals.loader.openLoader();
 	var userData = Ti.App.Properties.getObject("userData");
	//var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_GET_PLANT_LIST + userData.organisationId;
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_GET_PLANT_LIST +1;
	Alloy.Globals.Communicator.get(url, function(e) {
		if (e.success) {
			try {
				var response = JSON.parse(e.response);
				if (response != null) {
						callback(response);
						Alloy.Globals.loader.close();
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
					callback("");
				}
			} catch(e) {
				consoleLog('Error Filter plantList service', e.message);
				Alloy.Globals.loader.close();
				callback("");
				
			}
		} else {
			showAlert(e.message);
			callback("");
		}
	});
};

/* Common API function for get KPI code list of selected plant ID 
 * API for getting KPI list with respect to plantID
 * Where used: FilterScreen
 */
 exports.getKpiCodeList=function(selectedPlantId,callback) {
 	Alloy.Globals.loader.openLoader();
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_GET_KPI_CODE_LIST + selectedPlantId;
	Alloy.Globals.Communicator.get(url, function(e) {
		if (e.success) {
			try {
				var response = JSON.parse(e.response);
				if (response != null) {
						callback(response);
						Alloy.Globals.loader.close();
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
					callback("");
				}
			} catch(e) {
				consoleLog('Error Filter kpi code list service', e.message);
				Alloy.Globals.loader.close();
				callback("");
			}
		} else {
			showAlert(e.message);
			callback("");
		}
	});
};

/* Common API function for get KPI list of selected plant ID 
 * API for getting KPI list 
 * Where used: Portfolio KPI screen
 */
 exports.getKpiList=function(data,callback) {
 	Alloy.Globals.loader.openLoader();
 //	var userData = Ti.App.Properties.getObject("userData");
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_GET_KPI_LIST ;
	Alloy.Globals.Communicator.post(url,data, function(e) {
		if (e.success) {
			try {
				var response = JSON.parse(e.response);
				if (response != null) {
						callback(response);
					Alloy.Globals.loader.close();
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
					callback("");
				}
			} catch(e) {
				consoleLog('Error kpi list service', e.message);
				Alloy.Globals.loader.close();
				callback("");
			}
		} else {
			showAlert(e.message);
			callback("");
		}
	});
};
