// Track basic JavaScript errors
window.addEventListener('error', function(e) {
    _gaq.push([
        '_trackEvent',
        'JavaScript Error',
        e.message,
        e.filename + ':  ' + e.lineno,
        true
    ]);
});

// Track AJAX errors (jQuery API)
$(document).ajaxError(function(e, request, settings) {
    _gaq.push([
        '_trackEvent',
        'Ajax error',
        settings.url,
        e.result,
        true
    ]);
});


// Now, with Universal Analytics
// https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#exception
ga('send', 'exception', {
  'exDescription': 'DatabaseError'
});

ga('send', 'exception', {
  'exFatal': true
});