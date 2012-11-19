$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1><strong>Thank you, we have received your information.</strong></h1></div>")
    .css({ "display":"block", "opacity":0.96, "top": $(window).scrollTop() + 100 })
    .appendTo( $("body") )
    .delay( 2500 )
    .fadeOut( 400, function(){
        $(this).remove();
    });
    
    
//Also implemented as
$(this.config.sPageContainer).on('tap', YP.forms.config.sRequiredDataBtnId, function(e){
	var $target	= $(e.target),
		iXPos	= $target.offset().left,
		iYPos	= $target.offset().top;
	
	$("<div class='ui-loader ui-overlay-shadow ui-body-a ui-corner-all mar1 pad05'><h2 class='h2 th-c-font'>Why do we ask for this?</h2><p>Your child can play as him/herself and for age-based app recommendations</p></div>")
	    .css({ "display":"block", "opacity":0.96, "left": iXPos,"top": iYPos - 84 })
	    .appendTo( $("body") )
	    .delay( 2500 )
	    .fadeOut( 400, function(){
	        $(this).remove();
	    });
	//alert('Why do we ask for this? Your child can play as him/herself and for age-based app recommendations.' );
} );    
