// Nested Collections
var Note = Backbone.Model.extend({});

var Notes = Backbone.Collection.extend({
    model: Note,
    initialize: function(models, options){
        this.doc = options.doc;
    },
    url: function(){
        return this.doc.url() + '/notes'; // /documents/2/notes
    }
});

var Document = Backbone.Model.extend({
    initialize: function(){
        this.notes = new Notes([], { doc: this });
    },
    addNote: function(text){
        this.notes.create({text: text});
    }
});

var Documents = Backbone.Collection.extend({
    model: Document,
    url: '/documents',
    initialize: function() {
        this.on('reset', this.getNotes, this);
    },
    getNotes: function(){
        this.each(function(doc){
            doc.notes = new Notes([], { doc: doc });
            doc.notes.fetch();
        });
    }
});

ds = new Documents();
ds.fetch();
