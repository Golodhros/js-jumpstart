/**
 * JQuery Event Organization
 * Using Object Literals
 * Reference: http://www.position-absolute.com/articles/organizing-events-with-jquery/?utm_source=javascriptweekly&utm_medium=email
 */
 var myapp.dashboard = {
    loadEvents: function(){
        var $dashboard = $(".dashboard");

        if(!$dashboard.length) return;

        $dashboard
            .on("click", "#myButton", $.proxy(this.handleSelectedOption, this))
            .on("click", "#myButton2", $.proxy(this.handleDoSomething, this, variable));
    },

    handleSelectedOption: function(e){
        e.preventDefault();
        this.selectOption(e.target);
    },

    handleDoSomething: function(variable, e){
        e.preventDefault();
        this.doSomething(e.target, variable);
    }

    selectOption : function(el){
        $(el).addClass("selected");
    },

    doSomething : function(el, variable){
        //Do Something
    }
};

$(document).ready(function(){ myapp.dashboard.loadEvents() })

