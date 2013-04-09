//	request_test.js
(function(){
	var ajax = coco.ajax;

	function forceStatusAndReadyState(xhr, status, rs){
		var success = stubFn();
		var failure = stubFn();
		var complete = stubFn();
		ajax.get('/url', { 
			success: success, 
			failure: failure,
			complete: complete
		});
		xhr.complete(status, rs);
		return {
			success: success.called,
			failure: failure.called,
			complete: complete.called
		};
	}
	function setUp(){
		this.cocoUrlParams = coco.util.urlParams;
		this.cocoIsLocal = coco.isLocal;
		this.ajaxCreate = ajax.create;
		this.xhr = Object.create(fakeXMLHttpRequest);
		ajax.create = stubFn(this.xhr);
	}
	function tearDown(){
		coco.util.urlParams = this.cocoUrlParams;
		coco.isLocal = this.cocoIsLocal;
		ajax.create = this.ajaxCreate;
	}

	TestCase("GetRequestTest", {
		setUp: setUp,
		tearDown: tearDown,
		"test should define get method": function(){
			assertFunction(ajax.get);
		}
	});

	TestCase("PostRequestTest", {
		setUp: function(){
			this.ajaxRequest = ajax.request;
		},
		tearDown: function(){
			ajax.request = this.ajaxRequest;
		},
		"test should define post method": function(){
			assertFunction(ajax.post);
		},
		"test should call request with POST method": function(){
			ajax.request = stubFn();
			ajax.post("/url");
			assertEquals("POST", ajax.request.args[1].method);
		}
	});

	TestCase("ReadyStateHandlerTest", {
		setUp: setUp,
		tearDown: tearDown,
		"test should call success handler for status 200": function(){
			this.xhr.readyState = 4;
			this.xhr.status = 200;
			var success = stubFn();
			ajax.request('/url', {success: success});
			this.xhr.onreadystatechange();
			assert(success.called);
		},
		"test should not throw error without success handler": function(){
			this.xhr.readyState = 4;
			this.xhr.status = 200;
			ajax.request('/url');
			assertNoException(function(){
				this.xhr.onreadystatechange();
			}.bind(this));
		},
		"test should call complete handler for status 200": function(){
			var request = forceStatusAndReadyState(this.xhr, 200, 4);
			assert(request.complete);
		},
		"test should call complete handler for status 400": function(){
			var request = forceStatusAndReadyState(this.xhr, 400, 4);
			assert(request.complete);
		},
		"test should call complete handler for status 0": function(){
			var request = forceStatusAndReadyState(this.xhr, 0, 4);
		}
	});

	TestCase("RequestTest", {
		setUp: setUp,
		tearDown: tearDown,
		"test should use specified request method": function(){
			ajax.request("/uri", { method: "POST" });
			assertEquals("POST", this.xhr.open.args[0]);
		},
		"test should throw eror without url": function(){
			assertException(function(){
				ajax.request();
			}, "TypeError");
		},
		"test should obtain an XMLHttpRequest object": function(){
			ajax.request("/url");
			assert(ajax.create.called);
		},
		"test should call open with method, url, async flag": function(){
			var url ="/url";
			ajax.request(url);
			assertEquals(["GET", url, true], this.xhr.open.args);
		},
		"test should add onreadystatechange handler": function(){
			ajax.request("/url");
			assertFunction(this.xhr.onreadystatechange);
		},
		"test should call send": function(){
			ajax.request("/url");
			assert(this.xhr.send.called);
		},
		"test should pass null as argument to send": function(){
			ajax.request("/url");
			assertNull(this.xhr.send.args[0]);
		},
		"test should reset onreadystatechange when complete": function(){
			this.xhr.readyState = 4;
			ajax.request("/url");
			this.xhr.onreadystatechange();
			assertSame(coco.noop, this.xhr.onreadystatechange);
		},
		"test should call success handler for local request": function(){
			coco.isLocal = stubFn(true);
			var request = forceStatusAndReadyState(this.xhr, 0, 4);
			assert(request.success);
		},
		//	Old version, without helper
		// "test should call success handler for local request": function(){
		// 	this.xhr.readyState = 4;
		// 	this.xhr.status = 0;
		// 	var success = stubFn();
		// 	coco.isLocal = stubFn(true);
		// 	ajax.request("file.html", {success: success});
		// 	this.xhr.onreadystatechange();
		// 	assert(success.called);
		// },
		//	TODO: Check the rest of the possible status
		"test should call success handler for status 200": function(){
			var request = forceStatusAndReadyState(this.xhr, 200, 4);
			assert(request.success);
		},
		"test should encode data": function(){
			coco.util.urlParams = stubFn();
			var object = { 
				field: "13",
				field2: "Lots of data!"
			};
			ajax.request("/url", {data: object, method: "POST"});
			assertSame(object, coco.util.urlParams.args[0]);
		},
		"test should send data with send() for POST": function(){
			var object = { 
				field: "$13",
				field2: "Lots of data!"
			};
			var expected = coco.util.urlParams(object);
			ajax.request("/url", {data: object, method: "POST"});
			assertEquals(expected, this.xhr.send.args[0]);
		},
		"test should send data on URL for GET": function(){
			var url = "/url";
			var object = { 
				field: "$13",
				field2: "Lots of data!"
			};
			var expected = url + "?" + coco.util.urlParams(object);
			ajax.request(url, {data: object, method: "GET" });
			assertEquals(expected, this.xhr.open.args[1]);
		},
		// TODO: test for request headers feature
		// "test should add a request header": function(){
		// 	ajax.request('/url', )
		// }
		
	});

}());