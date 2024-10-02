var Employee = Backbone.Model.extend();
var Developer = Employee.extend();
var Manager = Employee.extend();

var Employees = Backbone.Collection.extend({
    url: 'employees.json',
    model: function(attrs, options){
        // For each data, check the attribute type
        switch(attrs.type){
            case "Developer":
                return new Developer(attrs, options);
                break;
            case "Manager":
                return new Manager(attrs, options);
                break:
        }
    }
});

var employees = new Employees();
employees.fetch();
console.log(employees);