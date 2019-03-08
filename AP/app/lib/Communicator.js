/**
 * Communicator.js
 *
 * This file handles all the complexity related to network communication. It connects to the server and returns the response.
 * It also checks for the internet connection, errors in response and handles them gracefully.
 */

/**
 * This is a generic function for performing GET requests
 */
exports.get = function(url, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(40000);

		// Define the callback.
		httpClient.onload = function(e) {
			consoleLog("S GET",JSON.stringify(e));
			if (e.success) {
				if (this.status == 200) {
					if (this.responseText != null && this.responseText.trim().length > 0) {
						var result = {};
						result.success = true;
						result.response = this.responseText;
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						Alloy.Globals.loader.close();
						callback(result);
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
					Alloy.Globals.loader.close();
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
				Alloy.Globals.loader.close();
			}
		};
		httpClient.onerror = function(e) {
			consoleLog("E GET",JSON.stringify(e));
			var result = {};
			result.success = false;
			result.message = errorCode(e.code);
			callback(result);
			Alloy.Globals.loader.close();
		};
		httpClient.open('GET', url);
		// Send the request data.
		httpClient.setRequestHeader("Accept", "application/json");
		httpClient.setRequestHeader("Content-Type", "application/json");
		//Below code applicable if n only if access_token available means you are logged in.
		if (Ti.App.Properties.getString("access_token")) {
			consoleLog('AccessTokenGet',Ti.App.Properties.getString("access_token"));
			httpClient.setRequestHeader("Authorization", "Bearer " + Ti.App.Properties.getString("access_token"));
		}
		httpClient.send();
		Alloy.Globals.loader.close();
	} else {
		consoleLog("N2");
		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
		Alloy.Globals.loader.close();
	}
};

/**
 * This is a generic function for performing POST requests
 */
exports.post = function(url, data, callback) {
	if (Titanium.Network.online) {
		// Create an HTTPClient.
		var httpClient = Ti.Network.createHTTPClient();
		httpClient.setTimeout(40000);
		// Define the callback.
		httpClient.onload = function(e) {
		 consoleLog("S",JSON.stringify(e));
			if (e.success) {
				if (this.status == 200) {
					if (this.responseText != null && this.responseText.trim().length > 0) {
						var result = {};
						result.success = true;
						result.response = this.responseText;
						callback(result);
					} else {
						var result = {};
						result.success = false;
						var MSG_NO_DATA = Alloy.Globals.Constants.MSG_NO_DATA;
						result.message = MSG_NO_DATA;
						callback(result);
						Alloy.Globals.loader.close();
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE ;
					callback(result);
					Alloy.Globals.loader.close();
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
				Alloy.Globals.loader.close();
			}
		};
		httpClient.onerror = function(e) {
			consoleLog("E",JSON.stringify(e));
			var result = {};
			result.success = false;
			result.message = errorCode(e.code);
			callback(result);
			Alloy.Globals.loader.close();
		};
		httpClient.open('POST', url);
		// Send the request data.
		httpClient.setRequestHeader("Accept", "application/json");
		httpClient.setRequestHeader("Content-Type", "application/json");
		//Below code applicable if n only if access_token available means you are logged in.
		if (Ti.App.Properties.getString("access_token")) {
			consoleLog('AccessToken',Ti.App.Properties.getString("access_token"));
			httpClient.setRequestHeader("Authorization", "Bearer " + Ti.App.Properties.getString("access_token"));
		}
		httpClient.send(data);
	} else {
		consoleLog("N1");
		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
		Alloy.Globals.loader.close();
	}
};
function errorCode(code){
	switch(code){
		case 404:
		return Alloy.Globals.Constants.MSG_NO_KPICODE_DATA;
		break;
		case -1001:
		return Alloy.Globals.Constants.MSG_TIME_OUT;
		break;
		case -1:
		return Alloy.Globals.Constants.MSG_TIME_OUT;
		break;
		case 401:
		return Alloy.Globals.Constants.MSG_UNAUTHOURIZED_OUT;
		break;
		default:
		return Alloy.Globals.Constants.MSG_STATUS_CODE ;
	}
}
