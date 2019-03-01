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
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			result.message = e.error;
			callback(result);
		};
		httpClient.open('GET', url);
		// Send the request data.
		httpClient.setRequestHeader("Accept", "application/json");
		httpClient.setRequestHeader("Content-Type", "application/json");
		//Below code applicable if n only if access_token available means you are logged in.
		if (Ti.App.Properties.getString("access_token")) {
			httpClient.setRequestHeader("Authorization", "Bearer " + Ti.App.Properties.getString("access_token"));
		}
		httpClient.send();
	} else {
		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
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
					}
				} else {
					var result = {};
					result.success = false;
					var MSG_STATUS_CODE = Alloy.Globals.Constants.MSG_STATUS_CODE;
					result.message = MSG_STATUS_CODE + this.status;
					callback(result);
				}
			} else {
				var result = {};
				result.success = false;
				result.message = e.error;
				callback(result);
			}
		};
		httpClient.onerror = function(e) {
			var result = {};
			result.success = false;
			result.message = e.error;
			callback(result);
		};
		httpClient.open('POST', url);
		// Send the request data.
		httpClient.setRequestHeader("Accept", "application/json");
		httpClient.setRequestHeader("Content-Type", "application/json");
		//Below code applicable if n only if access_token available means you are logged in.
		if (Ti.App.Properties.getString("access_token")) {
			httpClient.setRequestHeader("Authorization", "Bearer " + Ti.App.Properties.getString("access_token"));
		}
		httpClient.send(data);
	} else {
		var result = {};
		result.success = false;
		var MSG_NO_NETWORK = Alloy.Globals.Constants.MSG_NO_NETWORK;
		result.message = MSG_NO_NETWORK;
		callback(result);
	}
};
