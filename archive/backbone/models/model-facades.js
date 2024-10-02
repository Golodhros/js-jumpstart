// Create Facades to objects
var Hotel = Backbone.Model.extend({
   defaults: {
       "availableRooms": ["a"],
       "rooms": {
           "a": {
               "size": 1200,
               "bed": "queen"
           },
           "b": {
               "size": 900,
               "bed": "twin"
           },
           "c": {
               "size": 1100,
               "bed": "twin"
           }
       },

       getRooms: function() {
           $.extend(true, {}, this.get("rooms"));
       },

       getRoomsByBed: function(bed) {
           return _.where(this.getRooms(), { "bed": bed });
       }
   }
});