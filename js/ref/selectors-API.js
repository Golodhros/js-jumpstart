//	The Selectors API was started by the W3C to specify native support for CSS queries in browsers
//	Ref: Professional Javascript by Nicholas Zakas

//	Selectors API Level 1
//	At the core of Selectors API Level 1 are two methods: querySelector() and querySelectorAll()
//	Implemented in IE8+, FF 3.5+, Safari 3.1+, Chrome and Opera 10+

//querySelector() method accepts a CSS query and retruns the first descendant element that matches 
//the pattern or null if ther is no matching element. Ex:

var body = document.querySelector("body");

var myDiv = document.querySelector("#myDiv");

var selected = document.querySelector(".selected");

var img = document.body.querySelector("img.button");

//querySelectorAll() method accepts a CSS query but returns all matching nodes instead of just one. 
//this method returns a static instance of NodeList.

var ems = document.getElementById('myDiv').querySelectorAll('em');

var selecteds = document.querySelectorAll('.selected');

var strongs = document.querySelectorAll('p strong');

//	The resulting NodeList object may be iterated over using either item() or bracket notation

var i, len, strong;
for( i=0, len=strongs.length; i<len; i++){
	strong = strongs[i];	//or strongs.item(i)
	strong.className = 'important';
}

//	Both querySelector() and querySelectorAll() throws an error when the CSS selector is not supported
//	by the browser or if there's a syntax error in the selector

//	Selectors API Level 2
//matchesSelector() method accepts a single argument, a CSS selector, and returns true if the given
//element matches the selector or false if not. Ex:

if(document.body.matchesSelector('body.page1')){
	//true
}

//	To make use of this method now:

function matchesSelector( element, selector ){
	if(element.matchesSelector){
		return element.matchesSelector( selector );
	} else if (element.msMatchesSelector){
		return element.msMatchesSelector( selector );
	} else if (element.mozMatchesSelector){
		return element.mozMatchesSelector( selector );
	} else if (element.webKitMatchesSelector){
		return element.webKitMatchesSelector( selector );
	} else {
		throw new Error("Not supported");
	}
}

if (matchesSelector(document.body, "body.page1")){
	//do something
}