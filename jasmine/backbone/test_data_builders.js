// BuilderTemplate
function NAMEBuilder(config) {
    this.Klass = NAMEBuilder;

    this.config = _.defaults(config || {}, {
        // Default config
    });

    this.withFEATURE = function() {
        var attributes = _.extend({}, this.config, {
            // Specific config
        });

        return new this.Klass(attributes);
    };

    this.build = function() {
        return new NAMEOBJECT(this.config);
    };
}

return {
    NAMEBuilder: NAMEBuilder
};


// Example:
function TicketViewBuilder(config) {
    this.Klass = TicketViewBuilder;

    this.config = _.defaults(config || {}, {
        'el': '.js-container',
        'model': new TicketModelBuilder().build()
    });

    this.withTicketModel = function(model) {
        var attributes = _.extend({}, this.config, {
            model: model
        });

        return new this.Klass(attributes);
    };

    this.withContainer = function(selector) {
        var attributes = _.extend({}, this.config, {
            el: selector
        });

        return new this.Klass(attributes);
    };

    this.build = function() {
        return new TicketView(this.config);
    };
}