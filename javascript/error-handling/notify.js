/*
 * Notifications Module
 * Original Project: HMP
 *
 * APP.notify exposes a simple API in order to manage all kind of notifications
 *
 * APP.notify.JSerror( "Message", "low/med/high");     // Red notification box
 * APP.notify.IOerror( "Message", "log/med/high");     // Red notification box
 * APP.notify.DOMerror( "Message", "log/med/high");    // Red notification box
 * APP.notify.UIinfo( "Message", "log/med/high");      // Blue notification box
 * APP.notify.UIsuccess( "Message", "log/med/high");   // Green notification box
 *
 */
APP.notify = {

    config: {
        mainContentClass            : '.main-content',
        sOverlayClass               : '.notification-overlay',
        sNotificationsCloseClass    : '.close'
    },

    compiledNotificationTmpl: Mustache.compile( this.notificationsTemplate ),

    init: function(oConfigOptions){
        // We extend the configuration with the custom options given
        this.config = $.extend( this.config, oConfigOptions );
        this.ajax = oConfigOptions.ajax || $.ajax;
        this.hub = $(oConfigOptions.hub) || $(document);

        APP.log("----- Log ----- Loading APP.notify");
        this.addEvents();
    },

    addEvents: function(){
        this.hub
            .on('click', this.config.sNotificationsCloseClass, $.proxy(this.handleNotificationClosing, this))
            .on('AppNotification', $.proxy(this.handleNotifications, this));

        //Generic and Requirejs specific errors
        $( window ).on( 'error', $.proxy(this.JSError, this));
        // requirejs.onError = this.handleRequireJSerror;
    },

    closeNotification: function(el){
        var $alertBox = $(el).parent();

        $alertBox.fadeOut().remove();
    },

    DOMerror: function(sMsg, sSeverity){
        var msg = sMsg || "DOMerror",
            severity = sSeverity || "low";

        this.hub.trigger('AppNotification', { type: 'DOMerror', data: { msg: msg, severity: severity }});
    },

    JSerror: function(sMsg, sSeverity){
        var msg = sMsg || "JSerror",
            severity = sSeverity || "low";

        this.hub.trigger('AppNotification', { type: 'JSerror', data: { msg: msg, severity: severity }});
    },

    IOerror: function(sMsg, sSeverity){
        var msg = sMsg || "IOerror",
            severity = sSeverity || "low";

        this.hub.trigger('AppNotification', { type: 'IOerror', data: { msg: msg, severity: severity }});
    },

    UIsuccess: function(sMsg, sSeverity){
        var msg = sMsg || "UIsuccess",
            severity = sSeverity || "low";

        this.hub.trigger('AppNotification', { type: 'UIsuccess', data: { msg: msg, severity: severity }});
    },

    UIinfo: function(sMsg, sSeverity){
        var msg = sMsg || "UIinfo",
            severity = sSeverity || "low";

        this.hub.trigger('AppNotification', { type: 'UIinfo', data: { msg: msg, severity: severity }});
    },

    handleDOMerror: function(data){
        if(typeof data.msg === 'string'){
            APP.log('DOMerror: ' + data.msg);
        }

        if(data.severity === 'med' || data.severity === 'high'){
            this.showUserNotification('error', data.msg);
            APP.analytics.trackEvent({category: 'Error' , action: 'DOMError'});
        }
    },

    handleIOerror: function(data){
        if(typeof data.msg === 'string'){
            APP.log('IOerror: ' + data.msg);
        }

        if(data.severity === 'med' || data.severity === 'high'){
            this.showUserNotification('error', data.msg);
            APP.analytics.trackEvent({category: 'Error' , action: 'IOError'});
        }
    },

    handleJSerror: function(data){
        if(typeof data.msg === 'string'){
            APP.log('JSerror: ' + data.msg);
        }

        if(data.severity === 'med' || data.severity === 'high'){
            this.showUserNotification('error', data.msg);
            APP.analytics.trackEvent({category: 'Error' , action: 'JSError'});
        }
    },

    handleNotifications: function(e, payload){
        var oErrorType = {
            DOMerror      : this.handleDOMerror,
            JSerror       : this.handleJSerror,
            IOerror       : this.handleIOerror,
            UIsuccess     : this.handleUIsuccess,
            UIinfo        : this.handleUIinfo
        },
        error = function(){
            this.hub.trigger('AppNotification', { type: 'JSerror', data: { msg:'Notification triggered without a type', severity:'low' }});
        };

        if(oErrorType[payload.type]){
            oErrorType[payload.type].call(this, payload.data);
        }else{
            error();
        }
    },

    //  When the User closes the notification window (from bootstrap)
    handleNotificationClosing: function(e){
        e.preventDefault();
        this.closeNotification(e.target);
    },

    handleRequireJSerror: function(e){
        if (e && e.requireType === 'timeout') {
            APP.log('--- RequireJs Loading Error ---', e.requireType);
            APP.log('modules: ' + e.requireModules);
        }
        $(document).trigger('AppNotification', { type: 'JSerror', data: { msg:'Dependency Loading Error, please try again later!', severity: 'high' }});
    },

    handleUIsuccess: function(data){
        if(typeof data.msg === 'string'){
            this.showUserNotification('success', data.msg);
        }
    },

    handleUIinfo: function(data){
        if(typeof data.msg === 'string'){
            this.showUserNotification('info', data.msg);
        }
    },

    notificationsTemplate: function(){
        // Add here notifications template
        return '<div class="alert alert-{{type}}">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '{{message}}' +
                '</div>';
    },

    showUserNotification: function( sType, sMsg ){
        var $main = $(this.config.mainContentClass),
            html = '';

        if($main.length){
            html = this.compiledNotificationTmpl({type: sType, message: sMsg});
            $main.prepend(html);
        }
    }

};