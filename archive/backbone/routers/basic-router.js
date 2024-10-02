var AppRouter = Backbone.Router.extend({
    routes: {
        'users': 'showUsers',
        'user/:id': 'showUserDetails',
        'user/:id/update': 'updateUser',
        'user/:id/remove': 'removeUser'
    },

    showUsers: function(){
        // Get all the user details from server and show the users view
    },

    showUserDetails: function(userId){
        // Get the user details for the user id as received
    },

    updateUser: function(userId){},
    removeUser: function(userId){}
});

var r = new AppRouter();

r.on('route:showUsers', function(){
    console.log('side effect code here!');
})