// requests.js
coco.noop = function(){};

(function(){
	var ajax = coco.namespace("ajax");

	if(!ajax.create){
		return;
	}

	function requestComplete(options){
		var transport = options.transport;
		if(isSuccess(transport)){
			if(typeof options.success == "function"){
				options.success(transport);
			}
		}else{
			if(typeof options.failure == "function"){
				options.failure(transport);
			}
		}
		if(typeof options.complete == "function"){
			options.complete(transport);
		}
	}

	function isSuccess(transport){
		var status = transport.status;
		return ( status >= 200 && status < 300) || status == 304 || (coco.isLocal() && !status);
	}

	// If no data must be sent, we send null
	function setData(options) {
		if(options.data){
			options.data = coco.util.urlParams(options.data);
			if(options.method == "GET"){
				var hasParams = options.url.indexOf("?") >= 0;
				options.url += hasParams ? "&" : "?";
				options.url += options.data;
				options.data = null;
			}
		} else {
			options.data = null;
		}
	}

	function defaultHeader(transport, headers, header, val){
		if(!headers[header]){
			transport.setRequestHeader(header,val);
		}
	}

	function setHeaders(options){
		var headers = options.headers || {};
		var transport = options.transport;
		coco.each(headers, function(header,value){
			transport.setRequestHeader(header,value);
		});
		if(options.method == "POST" && options.data){
			defaultHeader(transport, headers, "Content-Type", "applicaiton/x-www-form-urlencoded");
			defaultHeader(transport, headers, "Content-Lenght", options.data.length);
		}
		defaultHeader(transport, headers, "X-Requested-With", "XMLHttpRequest");
	}

	// Public methods
	//	TODO: setting request headers and exposing the transport's abort method
	function request(url, options){
		if(typeof url != "string"){
			throw new TypeError("URL should be string");
		}
		options = coco.extend({}, options);
		options.url = url;
		setData(options);

		var transport = coco.ajax.create();
		options.transport = transport;
		// Whenever the readyState property changes, the readystatechange event is fired
		// we set it before open() for crossbrowser compatibility
		transport.onreadystatechange = function(){
			// readyState indicates what phase of the request/response cycle is currently active
			// where: 0 -> Uninitialized (open() not called yet); 1 -> Open; 2 -> Sent; 
			// 3 -> Receiving; 4 -> Complete (all response data retrieved)
			if(transport.readyState == 4){
				requestComplete(options);
				transport.onreadystatechange = coco.noop;
			}
		};
		// xhr.open() accepts three arguments: type of request, URL and if is asynchronous
		// open does not send the resquest, it prepares a request to be sent
		// URL must be from the same origin (same domain, same port and same protocol)
		transport.open(options.method || "GET", options.url, true);
		// Sends the specified request, where the argument is the data to be sent
		transport.send(options.data);
	}
	ajax.request = request;

	function get(url, options){
		options = coco.extend({}, options);
		options.method = "GET";
		ajax.request(url, options);
	}
	ajax.get = get;

	function post(url, options){
		options = coco.extend({}, options);
		options.method = "POST";
		ajax.request(url, options);
	}
	ajax.post = post;
}());