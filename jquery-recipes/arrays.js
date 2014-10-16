
// Removing an element from an array
var arr = ["jQuery","JavaScript","HTML","Ajax","Css"];
var itemtoRemove = "HTML";

arr.splice($.inArray(itemtoRemove, arr),1);


// Removing an specific value from an array
var y = [1, 2, 2, 3, 2]
var removeItem = 2;

y = jQuery.grep(y, function(value) {
    return value != removeItem;
});