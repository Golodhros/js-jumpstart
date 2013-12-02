/*
 * No one wants their app-in-a-browser to look like a normal web page by displaying the address bar, so you can try to hide it:
 * This snippet doesn't work in all browsers but still works for many of the popular mobile device browsers. This snippet can make a giant difference in site perception!
*/

// When ready...
window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});