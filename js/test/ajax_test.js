//	ajax_test.js

TestCase("AjaxCreateTest", {
	"test should return XMLHttpRequest object": function(){
		var xhr = coco.ajax.create();

		assertNumber(xhr.readyState);
		assert(coco.isHostMethod(xhr, "open"));
		assert(coco.isHostMethod(xhr, "send"));
		assert(coco.isHostMethod(xhr, "setRequestHeader"));
	}
});