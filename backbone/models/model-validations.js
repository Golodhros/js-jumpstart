// Model Validations
var User = Backbone.Model.extend({
    defaults: {
        name: "",
        age: 0
    },
    validate: function(attrs){
        if(attrs.age < 0){
            return "Age must be 0 or higher";
        }
        if(attrs.name === ''){
            return "Must have a name";
        }
    }
});


// Handling Failed Model Attribute Validation

// Option 1: Return an Error Object
// Inside your model
validate: function(attrs) {
    var errors = [];

    if(attrs.a < 0) {
        errors.push({
            'message': 'Form field a is messed up!',
            'class': 'a'
        });
    }
    if(attrs.b < 0) {
        errors.push({
            'message': 'Form field b is messed up!',
            'class': 'b'
        });
    }

    if(errors.length) {
        return errors;
    }
}

// Inside your view
this.model.on('invalid', function(model, errors) {
    _.each(errors, function(error, i) {
        $(‘.’ + error.class).addClass('error');
        alert(error.message);
    });
});


// Option 2: Broadcast Custom Error Event
// Inside your model
validate: function(attrs) {

    if(attrs.a < 0) {
        this.trigger(‘invalid:a’, 'Form field a is messed up!', this);
    }
    if(attrs.b < 0) {
        this.trigger(‘invalid:b’, 'Form field b is messed up!', this);
    }
}

// Inside your view
this.model.on('invalid:a', function(error) {
        $(‘a’).addClass('error');
        alert(error);
});

this.model.on('invalid:b', function(error) {
        $(‘b’).addClass('error');
        alert(error);
});
