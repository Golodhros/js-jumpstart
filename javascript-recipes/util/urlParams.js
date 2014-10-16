// Retrieves params from the url
// Ref: http://stackoverflow.com/questions/1403888/get-escaped-url-parameter

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

