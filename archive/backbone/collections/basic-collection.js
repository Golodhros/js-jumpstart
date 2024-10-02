var User = Backbone.Model.extend({
    initialize: function(){
        this.on('change', function(){
            console.log('User model changed!');
        });
    }
});

var Users = Backbone.Collection.extend({
    model: User,
    url: '/users',
    initialize: function(){
        this.on('change', function(){
            console.log('Users collection changed!');
        });
    }
});

var users = new Users(),
    newUser = new User({
        name: "Monster",
        age: 32
    });

users.add([newUser]);

// Change an attribute of the model
newUser.set('age', 22);

// Fetching data from the server
users.fetch();

// Saving dtat to the server
// Collections do not have a method to store data as a whole to the server.
// Instead, the save() method of each model should be called
var user = users.get(1);
user.save();