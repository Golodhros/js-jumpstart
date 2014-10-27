// We can use Ajax to grab those individual pieces of content and add them
// into the web page. The process of placing one hypertext document
// into another has a very exciting and sexy name: transclusion.

// HTML
// <a href="most-read.html" class="js-transclude">Most Read</a>

// JS
$('.js-transclude').each(function(this) {
    var elm = this;
    $.ajax(elm.attr('href'), {
        success: function(response) {
            elm.html(response);
        }
    });
});