// A CompositeView is a combination of ItemView and CollectionView, where it accepts
// a model that represents a single dataset and a collection that displays multiple data

var Company = Backbone.Model.extend({
    defaults: {
        name: '',
        specialty: ''
    }
});

var Employee = Backbone.Model.extend({
    defaults: {
        name: ''
    }
});

var Employees = Backbone.Collection.extend({
    model: Employee
});

var EmployeeItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template('<%= name %>')
});

var CompanyView = Marionette.CompositeView.extend({
    template: _.template(['<h2><%= name %></h2>',
        '<span><%= specialty %> </span>',
        '<ul class="employees"></ul>'
    ].join('')),
    itemView: EmployeeItemView,
    itemViewContainer: '.employees',

    // Add a company details to this view's model and collection
    addCompany: function(data){
        if (!data) return;

        if (data.employees){
            this.collection = new Employees(data.employees);
        }

        delete data.employees;
        this.model = new Company(data);
    }
});

var companyView = new CompanyView();

// Add a company details
companyView.addCompany({
    name: 'Innofied',
    specialty: 'Team of JS Specialists',
    employees: [{
        name: 'Monster'
    },{
        name: 'Coco'
    }]
});

$(document.body).append(companyView.render().el);