//
//	HTML5 contains a large amount of JavaScript APIs designed for use with the markup additions.
//
//	Part of these APIs overlap with the DOM and define DOM extensions that browsers should provide.
//	Ref: Professional Javascript by Nicholas Zakas

// getElementsByClassName
//getElementsByClassName() method has been implemented as a native for performance reasons
//returns a NodeList.

var allCurrentUsernames = document.getElementsByClassName('username current');

var selected = document.getElementById('myDiv').getElementsByClassName('selected');


// classList
//the addition of the classList property for all elements introduces a way to manipulate class names
//in a much simpler and safer manner. It is a collection type named DOMTokenList

//Methods:
div.classList.remove('disabled');
div.classList.add('current');
div.classList.toggle('user');
div.classList.contains('bd'); // returns boolean

if (div.classList.contains('bd') && !div.classList.contains('disabled')){
	//do something
}
for (var i=0, len=div.classList.length; i<len; i++){
	doSomething(div.classList[i]);
}
//	classList makes it unnecessary to access the className property unless to remove all the classes


// Accessibility Functions
// activeElement
//document.activeElement contains a pointer to the DOM element that currently has focus.
var button = document.getElementById('myButton');
button.focus();

alert(document.activeElement == button); //true

// hasFocus
//document.hasFocus() returns a Boolean value indicating if the document has focus
var button = document.getElementById('myButton');
button.focus();
alert(document.hasFocus());	//true


// document.readyState
//readyState property has two possible values: loading and complete
if (document.readyState == "complete"){
	//do something
}


// dataset
//via de dataset property of an element we can access to a data attribute
<div id="myDiv" data-appId="12345" data-myname="coco"></div>
var div = document.getElementById('myDiv');

//get the values
var appId = div.dataset.appId;
var myName = div.dataset.myname;

//set de value
div.dataset.appId = 2345;
div.dataset.myname = "Cokete";

//is there a "myname" value?
if(div.dataset.myname){
	alert('Hello, ' + div.dataset.myname);
}