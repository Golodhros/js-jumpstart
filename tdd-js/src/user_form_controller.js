(function(){

	if( typeof coco == "undefined" ||
		typeof document == "undefined"){
		return;
	}

	var dom = coco.dom;
	var util = coco.util;
	var chat = coco.namespace("chat");

	if(!dom || !dom.addEventHandler || !util ||
		!util.observable || !Object.create ||
		!document.getElementsByTagName || 
		!Function.prototype.bind){
		return;
	}

	function setView(element){
		element.className = "js-chat";
		var handler = this.handleSubmit.bind(this);
		dom.addEventHandler(element, "submit", handler);
		this.view = element;
	}

	function setModel(model){
		this.model = model;
	}

	function handleSubmit(event){
		event.preventDefault();
		if(this.view){
			var input = this.view.getElementsByTagName("input")[0];
			var userName = input.value;

			if(!userName){ return; }
			this.view.className = "";
			this.model.currentUser = userName;
			this.notify("user", userName);
		}
	}

	chat.userFormController = coco.extend({}, util.observable);
	chat.userFormController.setView	       = setView;
	chat.userFormController.setModel	   = setModel;
	chat.userFormController.handleSubmit   = handleSubmit;

}());