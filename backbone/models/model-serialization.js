// We can override the parse() method to modify the
// raw server response

// If the server response is
// {
// "user": {
//        "name": "John Doe",
//        "email": "johndoe@example.com"
//      }
// }
var User = Backbone.Model.extend({
    url: 'server.json',
    defaults: {
        name: '',
        email: ''
    },

    // Returns the attribute hash
    parse: function(response){
        return response.user;
    },

    toJSON: function(){
        return {
            user: _.clone(this.attributes)
        }
    }
});

var user = new User();
user.fetch({
    success: function(){
        console.log(user.get('name'));
    }
})