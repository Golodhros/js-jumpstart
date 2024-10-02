var User = Backbone.Model.extend();

// Users Collection
var Users = Backbone.Collection.extend({
    model: User
});

// Add some data in the collection
var users = new Users([{
    id: 1,
    name: 'John Doe'
},{
    id: 2,
    name: 'Dan Smith'
}]);

var UserItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( '<%= name %>'),
    events: {
        'click': 'showUserName'
    },
    render: function(){
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    showUserName: function(){
        console.log('Clicked user\'s name =', this.model.get('name'));
    }
});

var UsersView = Backbone.View.extend({
    tagName: 'ul',
    render: function(){
        // create a document fragment
        var fragment = document.createDocumentFragment();

        this.collection.each(function(model){
            // add each view element to the document fragment
            fragment.appendChild(new UserItemView({
                model: model
            }).render().el);
        }, this);

        // append the fragment to the DOM
        this.$el.html(fragment);
        return this;
    }
});

var usersView = new UsersView({
    collection: users
});

// Display the view
$(document.body).append(usersView.render().el);


// Rendering Parent Views
// In most cases, as you re-render a parent view, it should not re-initialize
// its child views every time. So, it is preferable to initialize the child
// views in the initialize() method of the parent view, and add them in an
// array that can later be used in the render() method
var ParentView = Backbone.View.extend({
    initialize: function(){
        this.subViews = [];

        // Initializing the child views
        this.subViews.push(new ChildView(), new ChildView());
    },

    render: function(){
        this.$el.html(this.template);

        // Render each child view
        _(this.subViews).each(function(view){
            this.$el.append(view.render().el);
        }, this);

        return this;
    },

    remove: function(){
        _(this.subViews).each(function(view){
            this.stopListening(view);
            view.remove();
        }, this);

        Backbone.View.prototype.remove.call(this, arguments);
    }
});