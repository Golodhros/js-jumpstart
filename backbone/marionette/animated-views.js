

List.Contact=Marionette.ItemView.extend({

    remove: function(){
        var self = this;

        this.$el.fadeOut('slow', function(){
            Marionette.ItemView.prototype.remove.call(self);
        });
    }

});

