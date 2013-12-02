	/**
	 * Returns the natural days between two given dates
	 */
	daysBetween : function( now, from ) {
		//Set 1 day in milliseconds
		var one_day = 1000*60*60*24,
	    daysBetween = Math.ceil( ( from-now )/(one_day) );

	    return daysBetween;
	},

	/**
	 * Returns the day Suffix for the given day number
	 * @param nDay
	 * @returns {String}
	 */
	getDaySuffix: function( nDay ){
		if( ARB.betterTypeOf( nDay ) === "Number"){
			switch ( nDay ){
				case 1:
					return nDay + 'st';
				case 2:
					return nDay + 'nd';
				case 3:
					return nDay + 'rd';
				case 21:
					return nDay + 'st';
				case 22:
					return nDay + 'nd';
				case 23:
					return nDay + 'rd';
				default:
					return nDay + 'th';
			}
		}
	},

	/**
	 * Returns the current time in AM/PM format
	 * @returns {String}
	 */
	getTime: function (){
		var dNow = new Date(),
		dNowMinutes = dNow.getMinutes() > 9 ? dNow.getMinutes() : '0' + dNow.getMinutes(),
		dNowHours = dNow.getHours() > 12 ? (parseInt( dNow.getHours(), 10) - 12 ) : dNow.getHours(),
		sSuffix = dNow.getHours() > 12 ? 'PM' : 'AM';

    	return dNowHours + ':' + dNowMinutes + sSuffix;
    },

    /**
	 * Returns the actual date in a yyyy-mm-dd format
	 * @returns {String} -yyyy-mm-dd
	 */
	getTodayFmtDate: function(){
		var now = new Date(),
		nNowYear = now.getFullYear(),
		nNowMonth = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1),
		nNowDay = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();

		return nNowYear + '-' + nNowMonth + '-' + nNowDay;
	},