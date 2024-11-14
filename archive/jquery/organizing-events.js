/*
 * JQuery Event Organization
 * Using Object Literals
 * Reference: http://www.position-absolute.com/articles/organizing-events-with-jquery/?utm_source=javascriptweekly&utm_medium=email
 */
 APP.exampleModule = {

    config: {
        btn1Class: '.class',
        btn2Class: '.class_alt'
    },

    addEvents: function(){
        var $dashboard = $(".dashboard");

        if(!$dashboard.length) return;

        $dashboard
            .on("click", this.config.btn1Class, $.proxy(this.handleSelectedOption, this))
            .on("click", this.config.btn1Class, $.proxy(this.handleDoSomething, this, variable));
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