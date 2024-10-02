// Shows a list of item for each model item in the specified collection
// Custom events: render/onRender; before:render/onBeforeRender; closed/collection:closed;
// before:item:added/after:item:added; item:removed; itemview:*
// Ref: http://marionettejs.com/docs/marionette.collectionview.html

// Create a collection view and pass the item view class
var UsersView = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: UserItemView
});

var usersView = new UsersView({
    collection: new Backbone.Collection([{
        firstName: 'Coco',
        lastName: 'cokete'
    },{
        firstName: 'Monster',
        lastName: 'mon'
    }])
});

$(document.body).append(usersView.render().el);