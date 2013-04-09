// Instead of this
getAjaxURL: function( sCallId ){
    switch (sCallId){
        case 'userSearch':
            return '/users?query=';
        case 'userInfo':
            return '/user/';
        case 'helpRequestSearch':
            return '/help_requests?query=';
        case 'helpRequestInfo':
            return '/help_request/';
        default:
            $(document).trigger('hmpNotification', { type: 'JSerror', data: { msg:'No URLs for ' + sCallId, severity: 'med' }});
            break;
    }
},

//We'll use a lookup table like this
getCallURL: function( sCallId ){
    var lookup = {
        userSearch : '/users?query=',
        userInfo : '/user/',
        helpRequestSearch : '/help_requests?query=',
        helpRequestInfo : '/help_request/'
    },
    error = function(){
        $(document).trigger('hmpNotification', { type: 'JSerror', data: { msg:'No URLs for ' + sCallId, severity: 'med' }});
        return false;
    };

    return ( lookup[sCallId] ? lookup[sCallId] : error() );
},