var userData = Ti.App.Properties.getObject("userData");

/* Common clouser function for get plant list 
 * API for getting plant list with respect to organisationId i.e we will get from userData object
 * Where used: Map screen , filter screen 
 */
 exports.getPlantListByOrganizationIDDetails=function(data,callback) {
	var url = Alloy.Globals.Constants.DOMAIN_URL + Alloy.Globals.Constants.SERVICE_GET_PLANT_LIST + userData.organisationId;
	Alloy.Globals.Communicator.get(url, function(e) {
		if (e.success) {
			try {
				var response = JSON.parse(e.response);
				if (response != null) {
						callback(response);
				} else {
					showAlert(Alloy.Globals.Constants.MSG_NO_DATA);
				}
			} catch(e) {
				consoleLog('Error Filter plantList service', e.message);
			}
		} else {
			showAlert(Alloy.Globals.Constants.MSG_STATUS_CODE);
		}
	});
};
