/**
 * Carousel Module for jqm Mobile Page
 * Requires jquery.easing 1.3 and jquery
 * smooth experience in mobile phones
 * also in plugin in github
 */
(function(jqm, $, undefined){
	"use strict";
	jqm.carousel = {
		//	Configuration Object for the feature
		config: {
			iSliderWidth			:0,
			iTransitionSpeed		:550,
			sTransitionType			:'easeOutCirc',
			sPageContainer			:'.ui-page',
			sContainer				:'.ui-page',
			sCarouselWrapper		:'.slider-wrapper',
			sCarouselElement		:'#carousel',
			iSliderPagePercentage	:0.8,
			sSlideClass				:'.slide',
			sContentClass			:'.detail-screenshot',
			sSlidePrefix			:'#slide-', 
			iNumSlides				:0,
			sCounterElements		:'#position em',
			sCounterOnClass			:'on',
			iAutoPlayInterval		:2000,
			isAutoPlay				:false,
			isSwipeSet				:false
		},
		iSlideCounter: 0,
		
		//	Options loading and initial events set
		init: function(oConfigOptions){
			// We extend the carousel configuration with the custom options given
			this.config = $.extend( jqm.carousel.config, oConfigOptions );

			jqm.log("----- Log ----- Loading jqm.carousel");
   			if(!this.config.isSwipeSet){
			    this.setSliderInfo();
				this.bindOrientationChange();
				this.config.isSwipeSet = true;
			}else{
				this.resetCarousel()
			}
		    this.bindSwipeEvents();
		    this.setAutoPlay();
		},	
		
		//	We obtain the width of the responsive carousel and apply it to the containers
		// 	of the slide elements and its content
		setSliderInfo: function(){
			this.config.iNumSlides = $(this.config.sCarouselElement).find(this.config.sSlideClass).length;
			this.config.iSliderWidth = parseInt($(this.config.sContainer).width() * this.config.iSliderPagePercentage, 10);
			$(this.config.sCarouselWrapper).css({width: this.config.iSliderPagePercentage*100 +'%'});
			$(this.config.sCarouselWrapper)
				.find(this.config.sSlideClass)
				.add(this.config.sContentClass)
				.css({width: this.config.iSliderWidth});
			$(this.config.sCarouselElement)
				.css({width: this.config.iSliderWidth*this.config.iNumSlides});
		},
		
		setAutoPlay: function(){
			if( this.config.isAutoPlay ){
				this.autoPlayInterval = setInterval(function() {
					if( jqm.carousel.isLastSlide() ){
						jqm.carousel.resetSlidesPosition();
					}else{
						jqm.carousel.handleLeftSwipe();
					}
				}, jqm.carousel.config.iAutoPlayInterval);
			}
		},
		
		isLastSlide: function(){
			return (jqm.carousel.iSlideCounter === jqm.carousel.config.iNumSlides - 1) ? true : false;
		},
		
		//	Resets the navigation dots on the bottom of the carousel
		resetDotCounter: function(){
			$(this.config.sCounterElements).each(function(item){ 
				$(jqm.carousel.config.sCounterElements).eq(item).removeClass(jqm.carousel.config.sCounterOnClass);
			});
		},
		
		//	Updates the navigation dots with the proper slide position
		updateDotCounter: function( iElement ){
			this.resetDotCounter();
			$(this.config.sCounterElements).eq( iElement ).addClass(this.config.sCounterOnClass);
		},
		
		//	Updates the Slide Counter integer
		updateSlideCounter: function( iPosition ){
			this.iSlideCounter = iPosition;
		},

		//	Setting of the callbacks for swipe events
		bindSwipeEvents: function(){
			if(!$(this.config.sCarouselElement).length){return;}
			$( document )
				.on( "swiperight", this.config.sCarouselElement,  $.proxy(this.handleRightSwipe, this))
				.on( "swipeleft", this.config.sCarouselElement,  $.proxy(this.handleLeftSwipe, this));
		},
		
		//	When an orientation change event occurs, we need to reset the carousel in order to have the proper widths for the slides
		bindOrientationChange: function(){
			$(document).on('orientationchange', this.config.sPageContainer, function(){
		    	jqm.carousel.resetCarousel();
			});
		},
		
		//	Depending on the animation direction we set the margin of the slide
		animateSlider: function( iElement, sDirection ){
			var margin = sDirection === 'right' ? 0 : - this.config.iSliderWidth;
			$(this.config.sSlidePrefix + iElement )
		        .animate({
					marginLeft: margin
				}, this.config.iTransitionSpeed, this.config.sTransitionType);
		},
		
		//	Callback for right oriented swipe movements
		handleRightSwipe: function(){
			var $this = jqm.carousel;
						
	        //First checks if we are at the start of the Carousel
	        if( $this.iSlideCounter === 0 ) { return; }

	        $this.iSlideCounter--;
	        $this.animateSlider( $this.iSlideCounter, "right" );
			$this.updateDotCounter( $this.iSlideCounter );
		},

		//	Callback for left oriented swipe movements
		handleLeftSwipe: function(){
			var $this = jqm.carousel;
			
			 // //First checks if we are at the end of the Carousel			
	        if( $this.iSlideCounter >= $this.config.iNumSlides - 1 ) { return; }

	        $this.animateSlider( $this.iSlideCounter, "left" );
	        $this.iSlideCounter++;
			$this.updateDotCounter( $this.iSlideCounter );
		},

		stopAutoPlay: function(){
			if(this.autoPlayInterval){
				window.clearInterval( this.autoPlayInterval );
			}
		},
		
		//	Resets the carousel by setting again the containers and content elements widths
		resetCarousel: function(){
			this.stopAutoPlay();
			this.resetSlidesPosition();
			this.setSliderInfo();
		},
		
		//	Moves the slider to the start position
		resetSlidesPosition: function(){
			var iCurrentSlide	= this.iSlideCounter;

			this.updateDotCounter( 0 );
			this.updateSlideCounter( 0 );

			if( iCurrentSlide !== 0){
				for(var i=iCurrentSlide; i>-1; i--){
					this.animateSlider( i, "right" );
				}			
			}
		}
			
	};

}(window.jqm = window.jqm || {}, jQuery));
