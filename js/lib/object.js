// if (typeof Object.create !== 'function') {
//     Object.create = function (o) {
//         function F() {}
//         F.prototype = o;
//         return new F();
//     };
// }

if(!Object.create){
	(function(){
		function F(){}
		Object.create = function(object){
			F.prototype = object;
			return new F();
		}
	}());
}