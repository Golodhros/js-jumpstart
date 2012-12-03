//	util_test.js
(function(){
	var util = coco.util;
	
	TestCase("urlParmsTest", {
		setUp: function(){
			this.urlParams = util.urlParams;
		},
		tearDown: function(){
			util.urlParams = this.urlParams;
		},
		"test should define urlParams function": function(){
			assertNoException(function(){
				util.urlParams();
			}.bind(this));
		}
	});
}())