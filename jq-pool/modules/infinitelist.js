define(
    'infinitelist',
    [
        'jquery',
        'mustache',
        'core'
    ],

    function ($, Mustache, HMP){

        HMP.infinite = {

            config:{
                role               : 'infinite-list',
                listContainerClass : '.list-container',
                loadItemClass      : '.load-item',
                itemsPerPage       : 20,
                jsonItem           : 'messages',
                loadBtnId          : '#load-btn',
                hiddenClassName    : 'is-hidden',
                noResultTemplate   : null,
                initialLoadCallback: null,
                userLoadCallback   : null,
                loadMoreTemplate   : '',
                numberPageThreshold: 3 //Number of pages we want to load in the list at the same time
            },

            msg: {
                reachedEnd: "You have reached the end!",
                actionSeeMore: "Press the button to see more items!",
                noResults: "No results!"
            },

            mode: null,
            page: 0,
            pagesShowed: 0,
            resultTmpl: null,

            init: function(config){
                HMP.log('----- Log ----- INIT - Infinite List Component');

                //Configuration
                this.config = $.extend(this.config, config);
                this.setUpAjax();
                this.setUpMode();

                this.addEvents();
            },

            addEvents:function(){
                $(document)
                    .on('click', this.config.loadBtnId, $.proxy(this.handleLoadMoreContent, this));
            },

            buildInitialList: function(data){
                var $wallList = $("[data-role=" + this.config.role +"]"),
                    html, counter=0;
                if($wallList.length){
                    if(data[this.config.jsonItem].length){
                        
                        new_data = {
                            'data': data,
                            'incrementCounter' : function() {
                                return function (text) {
                                    counter++;
                                }
                            },
                            'resetCounter' : function() {
                                return function (text) {
                                    counter = 0;
                                }
                            },
                            'iterateCountAndCutText' : function () {
                                return function (text, render) {
                                    // note that counter is in the enclosing scope
                                    // console.log("text" + text);
                                    var rendered = render(text);
                                    var uncuttext =render(text);
                                    if (counter < 2) {
                                        if (rendered.length > 9) {
                                            rendered = rendered.substr(0,8) + '...';
                                        }
                                        else {
                                            rendered = rendered;
                                        }
                                        return '<li class="active"><a href="#" title="'+uncuttext+'" alt="'+uncuttext+'">'+rendered+'</a></li>';
                                    } else {
                                        return '.';
                                    }
                                }
                            },
                             'shortenStringsTwoLines' : function () {
                                return function (text, render) {
                                    var rendered = render(text);
                                    
                                    if (rendered.length > 55) {
                                        rendered = rendered.substr(0,54) + '...';
                                    }
                                    return rendered;    
                                }
                            }
                        };


                        html = Mustache.to_html( this.resultTmpl, new_data);
                        if(new_data.data[this.config.jsonItem].length === this.config.itemsPerPage){
                            html += Mustache.to_html( this.config.loadMoreTemplate, {msg: this.msg.actionSeeMore});
                        }
                        $wallList.html(html);
                    }else if(this.config.noResultTemplate){
                        html = Mustache.to_html( this.config.noResultTemplate, {isEnd: true, msg: this.msg.noResults});
                        $wallList.html(html);
                    }
                    this.triggerInitialCallback();
                }
            },

            //TODO: Review Load More logic
            buildMoreListItems: function(data){
                var $wallList = $("[data-role=" + this.config.role +"]"),
                    $loadItem = $wallList.find(this.config.loadItemClass),
                    html;

                $loadItem.remove();
                if(data[this.config.jsonItem].length){
                    this.manageFeedListLongitude();
                    html = Mustache.to_html( this.resultTmpl, data );

                    if(data[this.config.jsonItem].length < this.config.itemsPerPage){
                        html += Mustache.to_html( this.config.loadMoreTemplate, {isEnd: true, msg: this.msg.reachedEnd});
                        $wallList.append(html);
                        this.hideLoadBtn();
                    }else{
                        html += Mustache.to_html( this.config.loadMoreTemplate, {msg: this.msg.actionSeeMore});
                        $wallList.append(html);
                    }
                    this.triggerUserLoadCallback();
                }else if(this.config.noResultTemplate){
                    html = Mustache.to_html( this.config.loadMoreTemplate, {isEnd: true, msg: this.msg.reachedEnd});
                    $wallList.append(html);
                    this.hideLoadBtn();
                 }
            },

            hideLoadBtn: function(){
                $(this.config.loadBtnId).addClass(this.config.hiddenClassName);
            },

            callNewList: function(url){
                var sURL;

                if(url){
                    this.url = url;
                    this.resetPageCounts();
                }
                sURL = this.getURL();

                this.ajax({
                    type: "GET",
                    url: sURL,
                    dataType: 'json',
                    success: function(data){
                        HMP.infinite.buildInitialList(data);
                    }
                });
            },

            callMoreItems: function(){
                var sURL;

                this.page++;
                sURL = this.getURL();

                this.ajax({
                    type: "GET",
                    url: sURL,
                    dataType: 'json',
                    success: function(data){
                        HMP.infinite.buildMoreListItems(data);
                    }
                });
            },

            detectEndDiv: function(el){
                var $el = $(el);

                if($el.scrollTop() + $el.innerHeight() >= $el[0].scrollHeight) {
                    this.unListenToListScroll();
                    this.callMoreItems();
                }
            },

            getPaginationString: function(){
                var offset = this.page * this.config.itemsPerPage;

                return '&offset=' + offset + '&limit=' + this.config.itemsPerPage;
            },

            getURL: function(){
                if(this.mode === 'search'){
                    return this.url + this.getPaginationString();
                }else{
                    return this.url + '/' + this.page;
                }
            },

            handleLoadMoreContent: function(e){
                this.callMoreItems();
            },

            handleListScrolling: function(e){
                this.detectEndDiv(e.target);
            },

            //We are not using this anymore
            listenToListScroll: function(){
                $(this.config.listContainerClass).bind('scroll', $.proxy(this.handleListScrolling, this));
            },

            manageFeedListLongitude: function(){
                if(this.pagesShowed > this.config.numberPageThreshold){
                    this.removeItems();
                    this.pagesShowed--;
                }else{
                    this.pagesShowed++;
                }
            },

            removeItems: function(){
                var items = $("[data-role=" + this.config.role +"]").find('li');

                items.slice(0, this.config.itemsPerPage).remove();
            },

            render: function(tmpl, url){
                this.resultTmpl = tmpl;
                this.url = url;

                this.callNewList();
            },

            resetPageCounts: function(){
                this.page = 0;
                this.pagesShowed = 0;
            },

            setUpMode: function(){
                this.mode = this.config.mode || 'list';
            },

            setUpAjax: function(){
                this.ajaxConf = this.config.ajaxConf || {};
                this.ajax = $.ajax;
                $.ajaxSetup(this.ajaxConf);
            },

            triggerInitialCallback: function(){
                if(this.config.initialLoadCallback){
                    this.config.initialLoadCallback();
                }
            },

            triggerUserLoadCallback: function(){
                if(this.config.userLoadCallback){
                    this.config.userLoadCallback();
                }
            },

            unListenToListScroll: function(){
                $(this.config.listContainerClass).unbind('scroll');
            }

        };

        return HMP;
    }
);
