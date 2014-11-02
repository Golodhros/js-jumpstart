// Models provide methods for interacting with the server

var User = Backbone.Model.extend({
    url: '/users'
});

// Create a Model
var user = new User({
    name: 'Ashim De',
    age: 55
});

// As no id attribute was provided, a POST request will be done
user.save({
    success: function(){},
    error: function(){}
});

// Update
var user = new User({
    id:  23,
    name: 'Monster',
    age: 14
});

// Sends a PUT request
user.save();

// Fetching
var user = new User({
    id: 23
});

// Sends a GET request to /users/23
user.fetch();

// Delete
var user = new User({
    id: 23
});

// Sends a DELETE request
user.destroy({
    success: function(){}
});
