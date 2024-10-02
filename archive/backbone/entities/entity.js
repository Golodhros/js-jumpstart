ContactManager.module("Entities", function(Entities, ContactManager, Backbone,Marionette,$,_){

    Entities.Contact = Backbone.Model.extend({
        defaults: function() {
            name: ''
        },
        urlRoot: '/contacts'
    });

    Entities.ContactCollection = Backbone.Collection.extend({
        initialize: function(name) {
            if(name){
                this.url = '/contacts?search=' + name
            }
        },
        url: function() {
            return "/contacts";
        },
        model: Entities.Contact,
        comparator: "name",
        collectionMethod: function(){}
    });

    var API = {

        getContact: function(contactId){
            var contact = new Entities.Contact({
                    id: contactId
                }),
                defer = $.Deferred();

            contact.fetch({
                success: function(data){
                    defer.resolve(data);
                },
                error: function(data){
                    defer.resolve(undefined);
                }
            });

            return defer.promise();
        },

        getContacts: function(){
            var contacts = new Entities.ContactCollection(),
                defer = $.Deferred();

            contacts.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });

            return defer.promise;
        },

        getContactWithName: function(name){
            var contacts = new Entities.ContactCollection(name),
                defer = $.Deferred();

            contacts.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });

            return defer.promise;
        },

        newContact: function(){
            return new Entities.Contact();
        }

    };

    ContactManager.reqres.setHandler("contact:entities", function(){
        return API.getContacts();
    });

    ContactManager.reqres.setHandler("contact:entity", function(id){
        return API.getContact(id);
    });

    ContactManager.reqres.setHandler("new:contact:entity", function(){
        return API.newContact();
    });

    ContactManager.reqres.setHandler("contact:name:entity", function(name){
        return API.getContactWithName(name);
    });


});