// Sorting Collections
var Book = Backbone.Model.extend({});

var Books = Backbone.Collection.extend({
    model: Book,
    // comparator: function(model){
    //     // This collection should be order by its year attribute
    //     return model.get('year');
    // }
    // comparator: function (a, b){
    //     return a.get('year') - b.get('year');
    // }
    comparator: function (a, b){
        var year = a.get('year') - b.get('year');

        if (year === 0){
            return a.get('title') < b.get('title') ? -1 : 1;
        } else {
            return year;
        }
    }
});

var books = new Books();
books.add({ title: "Book B", year: 2011 });
books.add({ title: "Book C", year: 2012 });
books.add({ title: "Book A", year: 2012 });
books.add({ title: "Book B", year: 2012 });
books.add({ title: "Book C", year: 2010 });
books.add({ title: "Book A", year: 2008 });


console.log(books.pluck('title'));
console.log(books.pluck('year'));