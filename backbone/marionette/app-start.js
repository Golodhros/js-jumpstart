MyApp = new Backbone.Marionette.Application();
MyApp.start();

MyApp.on('initialize:before', function(options) {
    options.anotherThing = true; // Add more data to your options
});

MyApp.on('start', function(options) {

});

MyApp.on("initialize:after", function(options){
    console.log('Initialization Finished');
    if (Backbone.history){
        Backbone.history.start();
    }
});