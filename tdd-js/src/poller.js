(function(){
	if( typeof coco == "undefined"){ return; }
	var ajax = coco.namespace("ajax");
	if(!ajax.request || !Object.create){ return; }
	function start(){
		if(!this.url){
			throw new TypeError("Must specify URL to poll");
		}
		var interval = 1000;
		if(typeof this.interval == "number"){
			interval = this.interval;
		}
		var poller = this;
		var requestStart = new Date().getTime();
		ajax.request(this.url + "?" + requestStart, {
			complete: function(){
				var elapsed = new Date().getTime() - requestStart;
				var remaining = interval - elapsed;
				setTimeout(function(){
					poller.start();
				}, Math.max(0, remaining));

				if(typeof poller.complete == "function"){
					poller.complete();
				}
			},
			headers: poller.headers,
			success: poller.success,
			failure: poller.failure
		});
	}
	ajax.poller = {
		start: start
	};

	function poll(url, options){
		var poller = Object.create(ajax.poller);
		poller.url = url;
		options = options || {};
		poller.headers = options.headers;
		poller.success = options.success;
		poller.failure = options.failure;
		poller.complete = options.complete;
		poller.interval = options.interval;
		poller.start();
		return poller;
	}
	ajax.poll = poll;

}());