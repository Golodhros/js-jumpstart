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


// Another way
// To use when using a subview is overkill
var User = Backbone.Model.extend({});

// UserView definition
var UserView = Backbone.View.extend({
    // We will use Underscore template
    template: _.template('Hello <%= name %> <%= address %>!'),

    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'change:address', this.showChangedAddress);
    },

    render: function(){
        if(!this.model){
            throw "Model is not set for this view";
        }

        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },

    showChangedAddress: function(){
        var html = this.template(this.model.toJSON()),
            // Selector or the element whose value needs to be updated
            addressElSelector = '.address',
            // Get only the element with "address" class
            addressElement = $(addressElSelector, html);

        // Replace only the contents of the .address element
        this.$(addressElSelector). replaceWith(addressElement);
    }
});

var userView = new UserView({
    // Set a model for this view
    model: new User({
        name: 'Monster',
        address: 'Treat'
    })
});

$('#container').append(userView.render().el);