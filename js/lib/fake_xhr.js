var fakeXMLHttpRequest = {
	open: stubFn(),
	send: stubFn(),
	//TODO: Use this
	setRequestHeader: function(header, value){
		if(!this.headers){
			this.headers = {};
		}
		this.headers[header] = value;
	},
	readyStateChange: function(readyState){
		this.readyState = readyState;
		this.onreadystatechange();
	},
};