/**
 * Error Handling Module
 * From Nicholas Zakas ProJS for Web Developers
 * Ch17 - Error Handling and Debugging
 **/

var core = core === undefined ? {} : core; 

core.error = {
	config : {
		debug: true
	},
	
	/**
     * Takes a condition that should be true and throws an error if the condition is false
     * @param condition
     * @param message
     */
    assert: function (condition, message){
    	if (!condition){
    		throw new Error(message);
		}
    },
    
    /**
	 * Nofifies a message in the console if we are in debug mode
	 */
	log: function(message){
		if( core.error.config.debug ){
			if (typeof console == "object"){
				console.log(message);
			} else if (typeof opera == "object"){
				opera.postError(message);
			} else if (typeof java == "object" && typeof java.lang == "object"){
				java.lang.System.out.println(message);
			}
		}
	},
	
	/**
     * Log errors to an specific area of the page 
     * that messages are written to
     * @param message
     */
    logError: function (message){
    	var console = document.getElementById(error.config.errorContainer);
		if( core.error.config.debug ){
			if (console === null){
	    		console = document.createElement("div");
	    		console.id = error.config.errorContainer;
	    		console.style.background = "#dedede";
	    		console.style.border = "1px solid silver";
	    		console.style.padding = "5px";
	    		console.style.width = "400px";
	    		console.style.position = "absolute";
	    		console.style.right = "0px";
	    		console.style.top = "0px";
	    		document.body.appendChild(console);
			}
			console.innerHTML += " < p > " + message + " < /p > ";
		}
    },
	
    /**
     * Logs Error to Server-side
     * @param sev - severity of the error
     * @param msg
     */
    logErrorInternally : function (sev, msg){
		var img = new Image();
		img.src = "log.php?sev=" + encodeURIComponent(sev) + " & msg=" + encodeURIComponent(msg);
    },
    
    /**
     * Provide information about why an error occurred, 
     * when there is nothing we can do with this error
     * @param msg
     */
    throwError : function(msg) {
    	throw new Error(msg);
    }
}