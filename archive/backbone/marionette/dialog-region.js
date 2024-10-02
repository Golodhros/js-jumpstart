// From David Sulc's Marionette, a gentle introduction
Marionette.Region.Dialog = Marionette.Region.extend({

    onShow: function(view){
        var self = this;

        this.listenTo(view, "dialog:close", this.closeDialog);
        this.$el.dialog({
            modal: true,
            title: view.title, width: "auto",
            close: function(e, ui){
                self.closeDialog();
            }
        });
    },

    closeDialog: function(){
        this.stopListening(); this.empty(); this.$el.dialog("destroy");
    }

});


// app
App.addRegions({
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
        el: "#dialog-region"
    })
});


// use
App.dialogRegion.show(view);