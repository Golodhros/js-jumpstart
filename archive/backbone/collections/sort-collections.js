// Sorting Collections
var Book = Backbone.Model.extend({});

var Books = Backbone.Collection.extend({
    model: Book,

    // comparator: 'year'

    // Underscore's sortBy() comparator
    // comparator: function(model){
    //     // This collection should be order by its year attribute
    //     return model.get('year');
    // }

    // Underscore's sort() comparator
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

    // Sorting a collection with multiple attributes
    comparator: function(model1, model2){
        // if year is same, then sort by title
        if(model1.get('year') === model2.get('year')){
            return model1.get('title') > model2.get('title');
        }else{
            return model1.get('year') > model2.get('year');
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