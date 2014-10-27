/*
 *
 * Ref: http://coding.smashingmagazine.com/2013/08/09/backbone-js-tips-patterns/
 */

// Performing deep copies
$.extend(true, {}, this.get("rooms"));

// Create Facades to objects
var Hotel = Backbone.Model.extend({
   defaults: {
       "availableRooms": ["a"],
       "rooms": {
           "a": {
               "size": 1200,
               "bed": "queen"
           },
           "b": {
               "size": 900,
               "bed": "twin"
           },
           "c": {
               "size": 1100,
               "bed": "twin"
           }
       },

       getRooms: function() {
           $.extend(true, {}, this.get("rooms"));
       },

       getRoomsByBed: function(bed) {
           return _.where(this.getRooms(), { "bed": bed });
       }
   }
});

// Rendering parts of the views instead of the whole thing
var View = Backbone.View.extend({
    initialize: function(options) {
        this.model.on('change:a', this.renderA, this);
        this.model.on('change:b', this.renderB, this);
    },

    renderA: function() {
        $(‘#a’, this.$el).html(this.model.get(‘a’));
        return this;
    },

    renderB: function() {
        $(‘#b’, this.$el).html(this.model.get(‘b’));
        return this;
    },

    render: function() {
        this
            .renderA()
            .renderB();
    }
});


// Parameter Search on Router
routes: {
    'base/:foo': 'search',
    'base/:bar': 'search',
    'base/:foo/:bar': 'search'
},

search: function() {
    var foo, bar, i;

    for(i = arguments.length - 1; i >= 0; i--) {

        if(arguments[i] === 'something to determine foo') {
            foo = arguments[i];
            continue;
        }
        else if(arguments[i] === 'something to determine bar') {
            bar = arguments[i];
            continue;
        }
    }
},


// Handling Failed Model Attribute Validation

// Option 1: Return an Error Object
// Inside your model
validate: function(attrs) {
    var errors = [];

    if(attrs.a < 0) {
        errors.push({
            'message': 'Form field a is messed up!',
            'class': 'a'
        });
    }
    if(attrs.b < 0) {
        errors.push({
            'message': 'Form field b is messed up!',
            'class': 'b'
        });
    }

    if(errors.length) {
        return errors;
    }
}

// Inside your view
this.model.on('invalid', function(model, errors) {
    _.each(errors, function(error, i) {
        $(‘.’ + error.class).addClass('error');
        alert(error.message);
    });
});


// Option 2: Broadcast Custom Error Event
// Inside your model
validate: function(attrs) {

    if(attrs.a < 0) {
            this.trigger(‘invalid:a’, 'Form field a is messed up!', this);
    }
    if(attrs.b < 0) {
            this.trigger(‘invalid:b’, 'Form field b is messed up!', this);
    }
}

// Inside your view
this.model.on('invalid:a’, function(error) {
        $(‘a’).addClass('error');
        alert(error);
});
this.model.on('invalid:b’, function(error) {
        $(‘b’).addClass('error');
        alert(error);
});


// Generic Error Display
var AlertView = Backbone.View.extend({
    set: function(typeOfError, message) {
        var alert = $(‘.in-page-alert’).length ? $(‘.in-page-alert’): $(‘.body-alert’);
        alert
            .removeClass(‘error success warning’)
            .addClass(typeOfError)
            .html(message)
            .fadeIn()
            .delay(5000)
            .fadeOut();
    }
});

// Usage:
var alert = new AlertView();

this.model.on('error', function(model, error) {
    alert.set('TYPE-OF-ERROR', error);
});


// Update Single-Page App Document Titles
Backbone.Router = Backbone.Router.extend({

    initialize: function(options){
        var that = this;

        this.on('route', function(router, route, params) {

            if(that.titles) {
                if(that.titles[router]) document.title = that.titles[router];
                else if(that.titles.default) document.title = that.titles.default;
                else throw 'Backbone.js Router Title Helper: No title found for route:' + router + ' and no default route specified.';
            }
        });
    }
});
