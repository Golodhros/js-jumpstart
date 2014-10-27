// Live Collections
var Update = Backbone.Model.extend({});

var Updates = Backbone.Collection.extend({
    model: Update,
    url: '/updates',
    update: function (){
        // Adds new models to the server by comparing the models ids
        // and adds the new ones
        this.fetch({
            add: true
        });
    }
});

var UpdateView = Backbone.View.extend({
    tagName: "li",
    render: function(){
        this.el.innerText = this.model.get('text');
        return this;
    }
});

var UpdatesView = Backbone.View.extend({
    tagName: "ul",
    initialize: function (){
        this.collection.on('reset', this.render, this);
        this.collection.on('add', this.addUpdate, this);

        this.collection.fetch();
        setInterval(_.bind(this.collection.update, this.collection), 3000);
    },
    render: function(){
        this.collection.each(this.addUpdate, this);
        return this;
    },
    addUpdate: function(model){
        this.$el.append(new UpdateView({ model: model}).render().el);
    }
});

var updatesView = new UpdatesView({ collection: new Updates });
$('#main').append(updatesView.render().el);