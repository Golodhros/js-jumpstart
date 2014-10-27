// Standard Module Definition
MyApp.module("myModule", function(myModule, App, Backbone, Marionette, $, _){
    // Private Data And Functions
    var privateData = "this is private data";

    var privateFunction = function(){
        console.log(privateData);
    }

    // Public Data And Functions
    myModule.someData = "public data";

    myModule.someFunction = function(){
        privateFunction();
        console.log(myModule.someData);
    }
});

// Accessing a module
var myModule = App.module("myModule");

// Creating Submodules
MyApp.module('myModule.newModule', function(){
    // ...
});

// Accessing submodules
var newModule = App.module('myModule.newModule');

// Image Catalog Example
MyApp.module("ImageCatalog", function(ImageCatalog, App){
    // Module initialization code

    App.commands.addHandler('catalog:add', function(image){
        allImages.add(image);
    });

    App.reqres.addHandler('catalog:get', function(){
        return allImages;
    });
});

// Lifecycle Management inside Modules
MyApp.module("myModule", function(myModule){
    myModule.startWithParent = false;

    var UsefulClass = function() {...}; // Constructor definition
    UsefulClass.prototype ... // Finish defining UsefulClass
    // ...

    myModule.addInitializer(function() {
        myModule.useful = new UsefulClass();
        // More setup
    });

    myModule.addFinalizer(function() {
        myModule.useful = null;
        // More tear down
    });
});

// When a module is defined, by default it will automatically start at the same time that its parent starts
// Set 'startWithParent' inside function
MyApp.module("myModule", function(){
    // Assign 'startWithParent' to false
    this.startWithParent = false;
});

// -- or --

// Pass in object
MyApp.module("myModule", {
    startWithParent: false,

    define: function(){
        // Define module here
    }
});

// Manually start the module
MyApp.module('myModule').start("Data that will be passed along");