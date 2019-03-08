var CONFIG = arguments[0] || {};

$.animatedGIFView = null;

$.init = function(args) {
	
	var lbl = Ti.UI.createLabel({
		color:"white",
		text:"Loading..."
	});
  if (OS_IOS) {
    require('de.marcelpociot.imagefromgif');
    $.animatedGIFView = Ti.UI.createImageView({
      id: args.id || "animatedgif",
      gif: args.image || "/commonImages/loading_sun.gif",
      width: args.width || 100,
      height: args.height ||100,
    });
  } else {
    $.animatedGIFView = (require("com.miga.gifview").createGifView)({
        id: args.id || "animatedgif",
        autoStart: true,
        image: args.image || "/commonImages/loading_sun.gif",
        width: args.width ||120,
        height: args.height || 120,
    });
  }

  $.Wrapper.add($.animatedGIFView); // $.Wrapper.add(lbl);
};

$.image = function(_image) {
  if ($.animatedGIFView) {
    if (OS_IOS) {
      $.animatedGIFView.gif = _image;
    } else {
      $.animatedGIFView.image = _image;
    }
  }
};

$.init(CONFIG);

exports.openLoader = function (){
	$.widget.open({animated:false});
};
exports.close = function (){
	$.widget.close({animated:false});
};
function backAndroid(){
	
}
