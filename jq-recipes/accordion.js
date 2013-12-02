/*
 * Simple Accordion Component
 * Original Project: DRC
 *
 */

 // Markup
 // <dl class="mlb-nav drc-comp" data-component="accordion">
 //     <dt class="js-accordion-header"><a href='#' class="mlb-link nav-link">Header</a></dt>
 //     <dd class="js-accordion-body is-hidden" data-position='1' >
 //         <ul class="plain-list mlb-news-list">
 //             <li class="item">
 //                 <a class="mlb-new-link">Body</a>
 //             </li>
 //         </ul>
 //     </dd>
 // </dl>

APP.accordion = {

    config: {
        classes : {
            isActived: 'active',
            headers: 'js-accordion-header',
            bodies: 'js-accordion-body',
        },
        initalSlide: 0
    },

    init: function(el){
        this.$el = $(el);
        this.headers = this.$el.find('.' + this.config.classes.headers);
        this.bodies = this.$el.find('.' + this.config.classes.bodies);
        APP.log('----- Log ----- APP.accordion.init');

        this.setDefaultBody();
        this.$el.data('ready', true);
    },

    show: function(accordionBody){
        this.hideAll();
        this.setActiveClass(accordionBody);
        accordionBody.removeClass('is-hidden').slideDown();
    },

    start: function(){
        APP.log('----- Log ----- APP.accordion.start');
        this.addEvents();
    },

    stop: function(){
        APP.log('----- Log ----- APP.accordion.stop');
        this.removeEvents();
    },

    addEvents: function(){
        $(document)
            .on('click', '.' + this.config.classes.headers + ' > .nav-link', $.proxy(this.handleHeaderClick, this))
            .on('keypress', $.proxy(this.handleNavigationKey, this))
            .on('accordion:init', $.proxy(this.handleAccordionInit, this))
            .on('accordion:prev', $.proxy(this.handleNavigation, this, 'prev'))
            .on('accordion:next', $.proxy(this.handleNavigation, this, 'next'));
    },

    swapActive: function(el, direction){
        var currentBodyId   = this.bodies.find('.' + this.config.classes.isActive).data('position'),
            newBodyId       = direction === 'next' ? currentAccordionId + 1 : currentAccordionId - 1,
            newBody         = this.bodies.filter("[data-position=" + newBodyId + "]");

        this.show(newBody);
    },

    clearPreviousTop: function(){
        this.slides.removeClass(this.config.classes.topSlide);
    },

    handleAccordionInit: function(e){
        var accordion = $("[data-component='accordion']");

        if (accordion.length && !accordion.data('ready')) {
            this.init(accordion);
        };
    },

    handleNavigation: function(direction, e){
        e.preventDefault();
        this.swapActive(e.target, direction);
    },

    handleNavigationKey: function(e){
        e.preventDefault();
        this.navigateAccordion(e.keyCode);
    },

    handleHeaderClick: function(e){
        e.preventDefault();
        this.toggleAccordionState(e.target);
    },

    navigateAccordion: function(key){
        if(key == 38){
            // User pressed "up" arrow
            $(document).trigger('accordion:prev');
        }else if(key == 40) {
            // User pressed "down" arrow
            $(document).trigger('accordion:next');
        }
    },

    setActiveClass: function(item){
        this.$el.find('.' + this.config.classes.isActive);
        item.addClass(this.config.classes.isActive);
    },

    toggleAccordionState: function(el){
        var selectedHeader    = $(el).hasClass(this.config.classes.headers) ? $(el) : $(el).parent('.' + this.config.classes.headers),
            selectedBody      = selectedHeader.next();

        this.show(selectedBody);
    },

    setDefaultBody: function(){
        this.show(this.bodies.eq(this.config.initalSlide));
    },

    removeEvents: function(){
        $(document)
            .off('click', '.' + this.config.classes.thumb, $.proxy(this.handleHeaderClick, this))
            .off('keypress', $.proxy(this.handleNavigationKey, this))
            .off('accordion:init', $.proxy(this.handleAccordionInit, this))
            .off('accordion:prev', $.proxy(this.handleNavigation, this, 'prev'))
            .off('accordion:next', $.proxy(this.handleNavigation, this, 'next'));
    },

    hideAll: function(){
        this.bodies.slideUp().addClass('is-hidden');
    }
};