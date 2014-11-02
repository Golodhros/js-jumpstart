// Avoiding object references in the defaults property
// Make sure not to use any object or array in the defaults,
// as they get shared by reference in JavasScript

var User = Backbone.Model.extend({
    defaults : {
        hobbies : []
    }
});

var user1 = new User(),
user2 = new User();

user1.get('hobbies').push('photography');
user2.get('hobbies').push('biking');

console.log(user1.get('hobbies'));
// Output => ["photography", "biking"]

// The solution is to use a fucntion for the defaults property instead
defaults: function() {
    return {
        hobbies: []
    }
}
console.log(user1.get('hobbies'));
// Output => ["photography"]