// start the app
MyApp.start();

var FooModule = function(o){
    // Constructor for FooModule
};

MyApp.addInitializer(function(options) {
    MyApp.fooModule = new FooModule(options);
});

// later, start the module
MyApp.fooModule.start();