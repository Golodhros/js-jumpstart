// ItemView represents a single view for an item, it can be a model or a collection
// It provides custom events like:
// 'render'/onRender; 'before:render'/onBeforeRender; 'close'/onClose; 'before:close'/onBeforeClose

var UserItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template('<%= firstName %> <%= lastName %>'),

    onRender: function(){
        // After render functionality here
    },

    onClose: function(){
        // Do some cleanup here
    }
});

var userItemView = new UserItemView({
    model: new Backbone.Model({
        firstName: 'Monster',
        lastName: 'QueTeComo'
    })
});

$(document.body).append(userItemView.render().el);

// Close and destroy after 2 seconds
setTimeout(function(){
    userItemView.close();
}, 2000)