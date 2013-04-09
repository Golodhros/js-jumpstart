/**
 * Sandbox Pattern
 * 
 * The sandbox pattern addresses the drawbacks of the namespacing pattern, namely:
 * - Reliance on a single global variable to be the application’s global. In the namespacing pattern, 
 * there is no way to have two versions of the same application or
 * library run on the same page, because they both need the same global symbol name, for example, MYAPP.
 * - Long, dotted names to type and resolve at runtime, for example, MYAPP.utilities.array.
 * As the name suggests, the sandbox pattern provides an environment for the modules to “play” 
 * without affecting other modules and their personal sandboxes.
 * 
 * Reference: Javascript Patterns by Stoyan Stefanov, pg 101
 */

// Module Creation
Sandbox.modules = {};
Sandbox.modules.dom = function (box) {
	box.getElement = function () {};
	box.getStyle = function () {};
	box.foo = "bar";
};
Sandbox.modules.event = function (box) {
	// access to the Sandbox prototype if needed:
	// box.constructor.prototype.m = "mmm";
	box.attachEvent = function () {};
	box.dettachEvent = function () {};
};
Sandbox.modules.ajax = function (box) {
	box.makeRequest = function () {};
	box.getResponse = function () {};
};

// Sandbox Implementation
function Sandbox() {
	// turning arguments into an array
	var args = Array.prototype.slice.call(arguments),
		// the last argument is the callback
		callback = args.pop(),
		// modules can be passed as an array or as individual parameters
		modules = (args[0] && typeof args[0] === "string") ? args : args[0],
		i;
		
	// make sure the function is called
	// as a constructor
	if (!(this instanceof Sandbox)) {
		return new Sandbox(modules, callback);
	}
	
	// add properties to `this` as needed:
	this.a = 1;
	this.b = 2;
	
	// now add modules to the core `this` object
	// no modules or "*" both mean "use all modules"
	if (!modules || modules === '*') {
		modules = [];
		for (i in Sandbox.modules) {
			if (Sandbox.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}
	
	// initialize the required modules
	for (i = 0; i < modules.length; i += 1) {
		Sandbox.modules[modules[i]](this);
	}
	
	// call the callback
	callback(this);
}

// any prototype properties as needed
Sandbox.prototype = {
	name: "My Application",
	version: "1.0",
	getName: function () {
		return this.name;
	}
};

// Usage
new Sandbox(function (box) {
	// your code here...
});
// Two ways of including modules
Sandbox(['ajax', 'event'], function (box) {
	// console.log(box);
});
Sandbox('ajax', 'dom', function (box) {
	// console.log(box);
});
// Includes all possible modules
Sandbox('*', function (box) {
	// console.log(box);
});