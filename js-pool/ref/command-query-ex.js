var Obj = (function(){
	return function(){
		var docRoot = '/somewhere';
		this.validateDocRoot = function(val){
			// validation logic - throw Exception if not OK
		};
		this.setDocRoot = function(val){
			this.validateDocRoot(val);
			docRoot = val;
		};
		this.getDocRoot = function(){
			return docRoot;
		};
		Object.preventExtensions(this);
	};
}());

