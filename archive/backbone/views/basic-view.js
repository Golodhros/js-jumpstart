var User = Backbone.Model.extend({});

// UserView definition
var UserView = Backbone.View.extend({
    // We will use Underscore template
    template: _.template('Hello <%= firstName %> <%= lastName %>!'),

    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
        // Or, this.model.on('change', this.render, this);
        // All events added with listenTo are unbinded when the view gets destroyed
    },

    render: function(){
        if(!this.model){
            throw "Model is not set for this view";
        }

        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }
});

var userView = new UserView({
    // Set a model for this view
    model: new User({
        firstName: 'Monster',
        lastName: 'The Killer'
    })
});

$('#container').append(userView.render().el);