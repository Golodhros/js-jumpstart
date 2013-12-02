// REF: http://responsivenews.co.uk/post/18948466399/cutting-the-mustard?utm_source=Responsive+Design+Weekly&utm_campaign=b6383193ca-Responsive_Design_Weekly_767&utm_medium=email&utm_term=0_df65b6d7c8-b6383193ca-56530153
// The single line of JavaScript that decides whether or not the browser is HTML4 or HTML5 is this:
if('querySelector' in document
     && 'localStorage' in window
     && 'addEventListener' in window) {
     // bootstrap the javascript application
     }



// We can use Ajax to grab those individual pieces of content and add them
// into the web page. The process of placing one hypertext document
// into another has a very exciting and sexy name: transclusion.

// HTML
<a href="most-read.html" class="jstransclude">Most Read</a>
// JS
$('.js-transclude').each(function(this) {
    var elm = this;
    $.ajax(elm.attr('href'), {
        success: function(response) {
            elm.html(response);
        }
    });
});