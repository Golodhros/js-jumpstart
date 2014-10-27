var Person = Backbone.Model.extend({});

// Manually passing the helper function
var PersonView = Backbone.View.extend({
    template: _.template($("#personView").html()),
    render: function (){
        this.el.innerHTML = this.template({ person: this.model.toJSON(), twitterLink: this.twitterLink });
        return this;
    },
    twitterLink: function(handle){
        return "<a href='http://twitter.com/" + handle + "'>@" + handle + "</a>";
    }
});

// Using Mixins
var template = function (templateString){
    var templateFn = _.template(templateString);

    return function (context){
        return templateFn(_.extend({}, template.fn, context));
    }
};

template.fn = {};

template.fn.twitterLink = function(handle){
    return "<a href='http://twitter.com/" + handle + "'>@" + handle + "</a>";
};

PersonView = Backbone.View.extend({
    template: template($("#personView").html()),
    render: function (){
        this.el.innerHTML = this.template({ person: this.model.toJSON() });
        return this;
    }
});
