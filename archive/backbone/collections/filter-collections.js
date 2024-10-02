var users = new Backbone.Collection({
    {name: 'John', company: 'A'},
    {name: 'Bill', company: 'B'},
    {name: 'Rick', company: 'A'}
});

users.where({
    company: 'A'
});
// The result will be an array of two models that have A as their company.
// Note that filtering the collection does not change the original collection
// data at all; it just returns an array with the results. To solve it:

// Anti-pattern
var filteredData = users.where({
    company: 'A'
});

// Reset the collection with array with filtered data
users.reset(filteredData);

// A collection with only filtered data
console.log(users);

// If you want to refilter the collection it won't work. There are ways to solve it:

// Filter collection with a duplicate collection
var filteredData = users.where({
    company: 'A'
});

// Create a new collection that will only hold filtered data
var filteredCollection = new Backbone.Collection();

// Reset this collection every time
// there is a new set of filtered data
filteredCollection.reset(filteredData);

console.log(filteredCollection, users);
// Main Con: you need to create another new instance of the collection in order to filter it

// Self-filtering collection with full data pointers
var FilterCollection = Backbone.Collection.extend({
    _totalData: [],
    _isFiltered: false,

    initialize: function(data){
        // The initial data sent to collection will be saved
        if(data){
            this._setTotalData(data);
        }

        // If some data is added later,
        // that should reflect in _totalData
        this.on('add', function(){
            this._setTotalData();
        }, this);
    },

    // Every time a new data has been added to the collection
    _setTotalData: function(data){
        this._totalData = data || this.toJSON();
    },

    // Apply a new filter to the collection
    applyFilter: function(criteria){
        // Clear the previous filter
        this.clearFilter();

        // Apply new filter
        this.reset(this.where(criteria));

        // Mark this as filtered
        this._isFiltered = true;
    },

    // Clear all filters applied to this collection
    clearFilter: function(){
        // skip first reset event while the collection has the original data
        if(this._isFiltered){
            // Reset the collection with complete data set
            this.reset(this._totalData);
            this._isFiltered = false;
        }
    }
});

// Use example
var filteredCollection = new FilterCollection([
    { name: 'John', company: 'A'},
    { name: 'Bill', company: 'B'},
    { name: 'Rick', company: 'A'}
]);

// Add another data to check whether add event is working or not
filteredCollection.add({
    name: 'John',
    company: 'C'
});

// Filter with company
filteredCollection.applyFilter({
    company: 'A'
});

// Filter with name
filteredCollection.applyFilter({
    name: 'John'
});

console.log(filteredCollection);
// Shows two data both with name: 'John'

// NOTE: this is not production ready, it needs to update _totalData
// It can be a mixin