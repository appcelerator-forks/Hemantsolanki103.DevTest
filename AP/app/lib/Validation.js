exports.isTextFieldEmpty = function(str){
	if(str != null && str.trim().length>0){
		return true;
	}
	return false;
};

exports.isEmailValid = function(emailvalue){
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailvalue)) {
		return (true);
	}
	return (false);
};
 
exports.isTextLengthValid = function(str,minLength,maxLength){
	if(str.length >= minLength && str.length <= maxLength){
		return true;
	}
	return false;
};

