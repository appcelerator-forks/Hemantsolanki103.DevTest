// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;


$.agentLbl.font={
	fontSize:11 * Alloy.Globals.scaleFactor
};
$.dateLbl.font={
	fontSize:11 * Alloy.Globals.scaleFactor
};
$.contactLbl.font={
	fontSize:9 * Alloy.Globals.scaleFactor
};
$.nameLbl.font={
	fontSize:13 * Alloy.Globals.scaleFactor
};
$.viewContactBtn.font={
	fontSize:9 * Alloy.Globals.scaleFactor
};
$.propertyLbl.font={
	fontSize:14 * Alloy.Globals.scaleFactor
};
$.amtLbl.font={
	fontSize:12 * Alloy.Globals.scaleFactor
};
$.amtstaticLbl.font={
	fontSize:11 * Alloy.Globals.scaleFactor
};
$.amtstaticLbl.height= 20 * Alloy.Globals.scaleFactor;
$.amtLbl.height= 30 * Alloy.Globals.scaleFactor;
$.locationLbl.font={
	fontSize:12 * Alloy.Globals.scaleFactor
}; 
$.locationstaticLbl.font={
	fontSize:11 * Alloy.Globals.scaleFactor
};
$.locationstaticLbl.height= 20 * Alloy.Globals.scaleFactor;
$.locationLbl.height= 30 * Alloy.Globals.scaleFactor;

$.configLbl.font={
	fontSize:12 * Alloy.Globals.scaleFactor
};
$.configstaticLbl.font={
	fontSize:11 * Alloy.Globals.scaleFactor
}; 
$.configstaticLbl.height= 20 * Alloy.Globals.scaleFactor;
$.configLbl.height= 30 * Alloy.Globals.scaleFactor;

$.statusLbl.font={
	fontSize:12 * Alloy.Globals.scaleFactor
};
$.statusstaticLbl.font={
	fontSize:11 * Alloy.Globals.scaleFactor
};
$.statusstaticLbl.height= 20 * Alloy.Globals.scaleFactor;
$.statusLbl.height= 30 * Alloy.Globals.scaleFactor;
$.nameLbl.height = 14 * Alloy.Globals.scaleFactor;

function openEnquiryScreen(e){
	var enquiryScreen = Alloy.createController("Enquiry").getView();
	if(OS_IOS){
		Alloy.Globals.navWin.openWindow(enquiryScreen);
	}else{
		enquiryScreen.open();
	}
	enquiryScreen.oldWin = $.ProductDetail;
	Alloy.Globals.currentWindow = enquiryScreen;
}
function openChatScreen(e){
	var chatScreen = Alloy.createController("Chat").getView();
	if(OS_IOS){
		Alloy.Globals.navWin.openWindow(chatScreen);
	}else{
		chatScreen.open();
	}
	chatScreen.oldWin = $.ProductDetail;
	Alloy.Globals.currentWindow = chatScreen;
}
