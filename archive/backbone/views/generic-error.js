// Generic Error Display
var AlertView = Backbone.View.extend({
    set: function(typeOfError, message) {
        var alert = $(‘.in-page-alert’).length ? $(‘.in-page-alert’): $(‘.body-alert’);
        alert
            .removeClass(‘error success warning’)
            .addClass(typeOfError)
            .html(message)
            .fadeIn()
            .delay(5000)
            .fadeOut();
    }
});

// Usage:
var alert = new AlertView();

this.model.on('error', function(model, error) {
    alert.set('TYPE-OF-ERROR', error);
});