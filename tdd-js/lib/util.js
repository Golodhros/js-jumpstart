// util.js
(function(){
	if(typeof encodeURIComponent == "undefined"){
		return;
	}
	function urlParams(object){
		if(!object){
			return "";
		}
		if(typeof object == "string"){
			return encodeURI(object);
		}
		var pieces = [];
		coco.each(object, function(prop, val){
			pieces.push(encodeURIComponent(prop) + "=" + encodeURIComponent(val));
		});
		return pieces.join("&");
	}
	coco.namespace("util").urlParams = urlParams;
}());