/**
 * Forms Module for jqm Mobile Page
 * Requires jquery.validation plugin
 */
(function(YP, $, undefined){
	"use strict";
	jqm.forms = {
		//	Configuration Object for the feature
		config: {
			sName1FormId				:'#whatever',
			sDisplacedErrorFieldsName	:'displaced-error-field',
			sCurrentForm				:null
		},
		
		//	Options loading and initial events set
		init: function(oConfigOptions){
			// We extend the configuration with the custom options given
			this.config = $.extend( jqm.forms.config, oConfigOptions );

			// We add the events to the page
			jqm.log("----- Log ----- Loading jqm.forms");
			this.addEvents();
		},
		
		//	We wait until pageshow event in order to...
		addEvents: function(){
			var $page = $('#' + jqm.forms.config.sCurrentForm );

			if( !$page.length ){return;}
			switch (jqm.forms.config.sCurrentForm){
				case 'form-name1':
					jqm.log("----- Log ----- Loading Name1 Form Initialization");
					jqm.forms.initName1Form();
				break;
				case 'sign-up':
					jqm.log("----- Log ----- Loading Name2 Form Initialization");
					jqm.forms.initName2Form();
				break;
				default:
					jqm.log("----- Log ----- Loading Default Form Initialization");
					jqm.log("----- Log ----- Config Object is ", this.config);
			}
			$page.jqmData('initialized', true);
		},
		
		initName1Form: function(){
			jqm.forms.validateName1Form();
			jqm.forms.initFormElements();
		},
		
		//	We set the rules and messages for the form validation
		validateName1Form: function( sFormId ){
			var oRules = {
					'field1name'	: "required",
					'field2name'	: "required"
				},
				oMessages = {
					'field1name'	: "message1",
					'field2name'	: "message2"
				};
			
			$(this.config.sName1FormId).validate({
				ignore			: "",		//In order to validate hidden inputs we need this
				rules			: oRules, 
				messages		: oMessages,
				//groups			: 'children-month children-year',
				errorPlacement	: jqm.forms.checkErrorPlacement,
				submitHandler	: function(form) {
					form.submit();
				}
			});
		},
		
		//	Callback for the error placement method
		checkErrorPlacement: function ( error, element ){
			if (element.hasClass(jqm.forms.config.sDisplacedErrorFieldsName)){
				error.appendTo( $(element).parents('.ui-field-contain'));
			}else{
				error.insertAfter(element);
			}
		}
	};
	
}(window.jqm = window.jqm || {}, jQuery));
