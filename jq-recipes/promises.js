/*
 * Example of using when with jQuery
 * Original Project: Devolver
 *
 */

APP.exampleModule = {

    config: {
        firstURL: '/example/url',
        secondURL: '/example2/url'
    },

    promiseExample: function(){
        var firstCall = $.ajax(this.config.firstURL, {type: 'GET', cache: false}),
            secondCall = $.ajax(this.config.secondURL, {type: 'GET', cache: false});

        $.when(firstCall, secondCall)
            .done( $.proxy(this.doSomething, this) )
            .fail(function(){
                // Log Error
            });
    },

    doSomething: function(){
        // Do Something
    }
};