MyApp = new Backbone.Marionette.Application();

MyApp.vent.on("foo", function(){
    alert("bar");
});

MyApp.vent.trigger("foo"); // => alert box "bar"