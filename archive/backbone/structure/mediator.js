define(['util'], function(Util){
    var Mediator = {
        getLoggedinUser: function(){
            return Util.getCookie('userid');
        },

        getUserCurrentLocation: function(){
            // returns user's current location
        }
    };

    return Mediator;
});

// User module
define(['app/mediator'], function(Mediator){
    var User = function(){};

    User.prototype.getUserDetails = function(){
        var userId = Mediator.getLoggedinUser();

        // Load user's details with the loggedin user id
    }

    return User;
});

// Event module
define(['app/mediator'], function(Mediator){
    var Event = function(){};

    Event.prototype.loadEvents = function(){
        var userLocation = Mediator.getUserCurrentLocation();

        // load events nearby user's location
    }

    Event.prototype.showEventDetails = function(){}

    return Event;
});