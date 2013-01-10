//	ajax.js
(function(){
	var xhr,
		ajax = coco.namespace("ajax"),
		options = [
			function(){
				return new ActiveXObject("Microsoft.XMLHTTP");
			},
			function(){
				// Works in IE7+, FF, Opera, Chrome and Safari
				return new XMLHttpRequest();
			}
		];

	for(var i = 0, l = options.length; i<l; i++){
		try{
			xhr = options[i]();
			if( typeof xhr.readyState == "number" &&
				coco.isHostMethod(xhr, "open") &&
				coco.isHostMethod(xhr, "send") &&
				coco.isHostMethod(xhr, "setRequestHeader")){
				ajax.create = options[i];
				break;
			}
		} catch (e){}
	}
}());