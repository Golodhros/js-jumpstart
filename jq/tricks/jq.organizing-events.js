/**
 * JQuery Event Organization
 * Using Object Literals
 * Reference: http://www.position-absolute.com/articles/organizing-events-with-jquery/?utm_source=javascriptweekly&utm_medium=email
 */
var myapp.dashboard = {
     loadEvents: function(){
      // Check if we are in the right section
      var $dashboard = $(".dashboard");
      if(!$dashboard.length) return;
      // Delegate give a context to our events
      $dashboard
       .delegate("#myButton","click",  $.proxy(this.selectedOption, this));
       .delegate("#myButton2","click",  $.proxy(this.doSomething, this));
       //where this is not the target but the event
     },
     selectedOption : function(el){
      $(el.target).addClass("selected");
     },
     doSomething : function(el){
     
     }
};
     
$(document).ready(function(){ myapp.dashboard.loadEvents() })


/**
 * On this line: var $dashboard = $(".dashboard"); if(!$dashboard.length) return; 
 * we check if the dashboard element exist, and if it does not, we do not load the events, 
 * It can save you a lot of overhead at practically no cost. 
 * Then we use delegate instead of bind, so if we want to convert this app
 * to an ajaxy app, events would be automatically destroyed if we removed the dashboard element.
 */
