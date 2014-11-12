Backbone.Router.extend({
    routes: {
        "users": "showUsers"
    },

    showUsers: function(){
        UserController.showUsers();
    }
});

var UserController = {
    showUsers: function(){
        var usersView = new UsersView();
        usersView.render();
        $("#user_list").html(usersView.el);
    }
}