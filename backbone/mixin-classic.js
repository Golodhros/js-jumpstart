// A simple object with some methods
var DraggableMixin = {
    startDrag: function(){
        // It will have the context of the main class
        console.log('Context = ', this);
    },
    onDrag: function(){}
}

// UserItemView already extends BaseView
var UserItemView = BaseView.extend({
    tagName: 'div',
    template: '<%= name %>'
});

//  We just copy the Mixin's properties into the View
_.extend(UserItemView.prototype, DraggableMixin, {
    otherFn: function(){}
});

var itemView = new UserItemView();

// Call the mixin's method
itemView.startDrag();

// Sometimes you may not want to copy all the methods of a mixin in your class.
// In that case, simply create a property in your class and copy the required
// function from the mixin in that property

UserItemView.prototype.startDrag = DraggableMixin.startDrag;