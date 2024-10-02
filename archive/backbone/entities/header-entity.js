ContactManager.module("Entities",function(Entities,ContactManager, Backbone,Marionette,$,_){

    Entities.Header = Backbone.Model.extend({
        initialize: function(){
            var selectable = new Backbone.Picky.Selectable(this); _.extend(this, selectable);
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function(){
            var singleSelect = new Backbone.Picky.SingleSelect(this); _.extend(this, singleSelect);
        }
    });

    var initializeHeaders = function() {
        Entities.headers = new Entities.HeaderCollection([
            { name: "Contacts", url: "contacts" },
            { name: "About", url: "about" }
        ]);
    };

    var API = {
        getHeaders: function(){
            if(Entities.headers === undefined){
                initializeHeaders();
            }
            return Entities.headers;
        }
    };

    ContactManager.reqres.setHandler("header:entities", function(){
        return API.getHeaders();
    });

});


ContactManager.module("HeaderApp.List",function(List,ContactManager, Backbone,Marionette,$,_){

    List.Header = Marionette.ItemView.extend({
        template: "#header-link",
        tagName: "li",
        onRender: function(){
            if(this.model.selected){
                // add class so Bootstrap will highlight
                // the active entry in the navbar
                this.$el.addClass("active");
            }
        },
        events: {
            "click a": "navigate"
        },
        navigate: function(e){
            e.preventDefault();
            this.trigger("navigate", this.model);
        }
    });

    List.Headers = Marionette.CompositeView.extend({
        template: "#header-template",
        className: "navbar navbar-inverse navbar-fixed-top",
        childView: List.Header,
        childViewContainer: "ul"
    });

});


ContactManager.module("HeaderApp.List",function(List,ContactManager, Backbone,Marionette,$,_){
    List.Controller = {
        listHeader: function(){
            var links = ContactManager.request("header:entities");
            var headers = new List.Headers({collection: links});
            ContactManager.headerRegion.show(headers);
        },
        setActiveHeader: function(headerUrl){
            var links = ContactManager.request("header:entities");
            var headerToSelect = links.find(function(header){
                return header.get("url") === headerUrl;
            });
            headerToSelect.select();
            links.trigger("reset");
        }
    };
});


ContactManager.module("HeaderApp",function(Header,ContactManager, Backbone,Marionette,$,_){

    var API = {
        listHeader: function(){
            Header.List.Controller.listHeader();
        }
    };

    ContactManager.commands.setHandler("set:active:header", function(name){
        ContactManager.HeaderApp.List.Controller.setActiveHeader(name);
    });

    Header.on("start", function(){
        API.listHeader();
    });

});


List.Headers = Marionette.CompositeView.extend({
    template: "#header-template",
    className: "navbar navbar-inverse navbar-fixed-top",
    childView: List.Header,
    childViewContainer: "ul",

    events: {
        "click a.brand": "brandClicked"
    },

    brandClicked: function(e){
        e.preventDefault();
        this.trigger("brand:clicked");
    }

});

ContactManager.execute("set:active:header", "contacts");
ContactManager.execute("set:active:header", "about");