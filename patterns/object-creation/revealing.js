/**
 * Revealing Pattern
 * 
 * Based on some investigations on how he could overcome some things he did not like about the module pattern, 
 * Christian Heilmann came up with something that he calls Revealing Module Pattern. 
 * As the name indicates, it is related to the Module Pattern, but might be a bit more structured and easier to understand, 
 * especially when it comes to handing over code to other developers in your team.
 *  
 * Reference: http://christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/
 */

var revealingModulePattern = function() {
	var privateVar = 1;
	function privateFunction() {
		alert('private');
	};

	var publicVar = 2;
	function publicFunction() {
		anotherPublicFunction();
	};

	function anotherPublicFunction() {
		privateFunction();
	};

	function getCurrentState() {
		return 2;
	};

	// reveal all things private by assigning public pointers
	return {
		init:publicFunction,
		count:publicVar,
		increase:anotherPublicFunction,
		current:getCurrentState()
	}
}();

alert(revealingModulePattern.current)
// => 2
revealingModulePattern.init();