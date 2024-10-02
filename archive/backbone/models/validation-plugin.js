// Backbone.Validation makes things easy
// Ref: http://thedersen.com/projects/backbone-validation/

// Built-in Validations:
// required
// acceptance
// min
// max
// range
// length
// minLength
// maxLength
// rangeLength
// oneOf
// equalTo
// pattern

var User = Backbone.Model.extend({
    validation: {
        // Standard built-in validation
        email: {
            required: true,
            pattern: 'email'
        },
        // Message for all rules
        address: {
            required: true,
            msg: 'Addess is required'
        },
        country: [{
            required: true,
            msg: 'Country is required'
        }, {
            pattern: 'whatever',
            msg: 'Please provide a valid country'
        }]
        // Custom: Do not return anything if validation is passed
        name: function(value, attr, computedState){
            if(!value){
                return 'Name is required';
            }
        },
        // Custom: The method will be called on model's scope
        age: 'validateAge'
    },

    validateAge: function(value, attr, computedState){
        if(!value) {
            return 'Email is required';
        }
    },

    defaults: {
        name: '',
        email: ''
    }
});