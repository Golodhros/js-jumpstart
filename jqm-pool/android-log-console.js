/*
 * Copy this code into your application or put it in an external .js file and load it from your application.
 * It replaces the dummy "console" object of the Android or Chrome browser with one that actually works.
 * You can see the console either by calling console.show() form your code, or by touching the document with three fingers at once.
 */
// REF: http://eclipsesource.com/blogs/2012/08/14/debugging-javascript-on-android-and-ios/

if( ( /android/gi ).test( navigator.appVersion ) ) {
    console = {
        "_log" : [],
        "log" : function() {
            var arr = [];
            for ( var i = 0; i < arguments.length; i++ ) {
                arr.push( arguments[ i ] );
            }
            this._log.push( arr.join( ", ") );
        },
        "trace" : function() {
            var stack;
            try {
                throw new Error();
            } catch( ex ) {
                stack = ex.stack;
            }
            console.log( "console.trace()\n" + stack.split( "\n" ).slice( 2 ).join( "  \n" ) );
        },
        "dir" : function( obj ) {
            console.log( "Content of " + obj );
            for ( var key in obj ) {
                var value = typeof obj[ key ] === "function" ? "function" : obj[ key ];
                console.log( " -\"" + key + "\" -> \"" + value + "\"" );
            }
        },
        "show" : function() {
            alert( this._log.join( "\n" ) );
            this._log = [];
        }
    };

    window.onerror = function( msg, url, line ) {
        console.log("ERROR: \"" + msg + "\" at \"" + "\", line " + line);
    };

    window.addEventListener( "touchstart", function( e ) {
        if( e.touches.length === 3 ) {
            console.show();
        }
    } );
}