// Create a region. It will control what's in the #container element.
var region = new Backbone.Marionette.Region({
    el: "#container"
});

// Add a view to the region. It will automatically render immediately.
region.show(new MyView());

// Close out the view that's currently there and render a different view.
region.show(new MyOtherView());

// Close out the view and display nothing in #container.
region.close();

// Closes any existing view displayed and deletes cached el
region.reset();

// Add Regions
MyApp.addRegions({
    container: "#container",
    footer:    "#footer"
});

// This is equivalent to
MyApp.container = new Backbone.Marionette.Region({el:"#container"});
MyApp.footer    = new Backbone.Marionette.Region({el:"#footer"});


// You can also create custom Regions
var ContainerRegion = Backbone.Marionette.Region.extend({
    el: "#container", // Must be defined for this syntax

    // Whatever other custom stuff you want
    onShow: function(view){
        // the view has been shown
    },

    onClose: function(){

    }
});