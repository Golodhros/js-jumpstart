// Removes any class that starts with 'segment-'
function cleanSegmentClass($el){
    var regex = /\bsegment-.+?\b/g;

    $el[0].className = $el[0].className.replace(regex, '');
}