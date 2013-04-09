/**
 * Module Pattern
 * 
 * Taking the singleton pattern one step further leads us to what Douglas Crockford calls the “module pattern”. 
 * The idea is to have an encapsulated module, that cannot conflict with any other modules 
 * you or someone else has created. You can create public and private methods within that module.
 * 
 * Reference: http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
var dataContainer = (function () {
  var accIdx = null;
  
  return {
	  getAccIdx: function() {
		  return accIdx;
	  },
	  setAccIdx: function(id) {
		  accIdx = id;
		  return false;
	  }
  };
})();

dataContainer.setAccIdx('4');
var x = dataContainer.getAccIdx(); //x = 4

/**
 * Modified Module Pattern
 */ 
var dataContainer = {};
(function() {
	var accIdx = null;

	this.getAccIdx = function() {
		return accIdx;
	};
	this.setAccIdx = function(id) {
		accIdx = id;
		return false;
	};
	
}).apply(dataContainer);

dataContainer.setAccIdx('4');
var x = dataContainer.getAccIdx(); //x = 4	