/**
 * Constants.js
 *
 * This file contains all the constants used in the app.
 */

/**********************************Server Details*************************************/
//Saikat Machine IP
exports.DOMAIN_URL = 'http://192.168.3.187:8080/';
//Komal Machine IP
exports.DOMAIN_URL = 'http://192.168.4.103:8080/';

exports.SERVICE_LOGIN = 'auth/login';
exports.SERVICE_USER_DETAILS = "apolloauth/api/users/"; 
exports.SERVICE_USER_ORG_DETAILS = "apollodatamgmt/api/apollo-user-profiles/userId/";
exports.SERVICE_GET_PLANT_LIST = "apollodatamgmt/api/apollo-utility-plants/byorg/";
exports.SERVICE_GET_KPI_CODE_LIST = "apollokpimgmt/api/kpi-def/byplant/";
exports.SERVICE_GET_KPI_LIST = "apollokpimgmt/api/kpi/get-data";
exports.SERVICE_TOTAL_SHIFT = "GetTotalShift";
exports.SERVICE_TOTAL_COMPANY = "GetCompanies";
exports.SERVICE_TOTAL_SITE = "GetSites";
exports.SERVICE_ADD_CONTACT = "AddContact";
exports.SERVICE_TOTAL_ASSOCIATED_GUARDS = "GetSiteGuards";  
exports.SERVICE_GET_CONTRACT_LIST = "GetContractList";

/**********************************Message Constants*************************************/
exports.MSG_NO_NETWORK = "Please check your internet connection and try again";
exports.MSG_STATUS_CODE = "Network is down. Please try again later";
exports.MSG_NO_DATA = "No data received from server";   
exports.MSG_NO_DATA = "No data found";
exports.MSG_TIME_OUT = "The request timed out";
exports.MSG_NO_KPICODE_DATA = "No KPI code found";   
exports.MSG_RECORD_NOT_FOUND = "No records found";
exports.MSG_UNAUTHOURIZED_OUT = "Session expired, Please login again";