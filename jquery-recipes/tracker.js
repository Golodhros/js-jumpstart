/**
 * Tracking module to track on different services
 * TODO: Clean of Sparked references
 */
var SP = {};


// $(document).trigger('SP:event', {page: document.location.href});
// $(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Reasons Explorer - sort by ' + field});

/**
 * Event Tracking Module
 */
SP.tracker = {
	config: {
		googleAnalyticsID: 'UA-30735663-6',
		mixPanelToken    : 'f9e07e33bb6beb37566763cc5d2f1f69',
		funnelEndPointURL: 'https://funnel.sparked.com/push'
	},
	// Possible services are: 'mixpanel', 'elasticsearch', 'ga'
	defaultServices: ['mixpanel'],
	activeServices: [],
	serviceMethods: {
		'ga'           : 'trackGAEvent',
		'mixpanel'     : 'trackMixPanelEvent',
		'elasticsearch': 'trackESEvent'
	},
	serviceInitMethods: {
		'ga'           : 'initGA',
		'mixpanel'     : 'initMixPanel',
		'elasticsearch': 'initES'
	},
	init: function(services){
		// Setup services
		if(services && services.length){
			this.activeServices = _.union(this.defaultServices, services);
		}else{
			this.activeServices = this.defaultServices;
		}
		this.initServices();
		this.addEvents();
	},
	initServices: function(){
		var self = this;

		_.each(this.activeServices, function(service){
			if(self.serviceInitMethods[service]){
				self[self.serviceInitMethods[service]]();
			}
		});
	},
	initGA: function(){
		/* jshint ignore:start */
		(function(i,s,o,g,r,a,m){
			i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments); }, i[r].l=1*new Date(); a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		/* jshint ignore:end */
		ga('create', this.config.googleAnalyticsID, 'auto');
	},
	initMixPanel: function(){
		/* jshint ignore:start */
		(function(f,b){
			if(!b.__SV){
				var a,e,i,g;
				window.mixpanel=b;
				b._i=[];
				b.init=function(a,e,d){
					function f(b,h){
						var a=h.split(".");
						2==a.length&&(b=b[a[0]],h=a[1]);
						b[h]=function(){
							b.push([h].concat(Array.prototype.slice.call(arguments,0)));
						};
					}
					var c=b;
					"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";
					c.people=c.people||[];
					c.toString=function(b){
						var a="mixpanel";
						"mixpanel"!==d&&(a+="."+d);
						b||(a+=" (stub)");
						return a;
					};
					c.people.toString=function(){
						return c.toString(1)+".people (stub)";
					};
					i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
					for(g=0;g<i.length;g++)f(c,i[g]);
					b._i.push([a,e,d]);
				};
				b.__SV=1.2;
				a=f.createElement("script");
				a.type="text/javascript";
				a.async=!0;
				a.src="//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";
				e=f.getElementsByTagName("script")[0];
				e.parentNode.insertBefore(a,e);
			}
		})(document,window.mixpanel||[]);
		/* jshint ignore:end */
		mixpanel.init(this.config.mixPanelToken);
	},
	initES: function(){
		var funnelCustomerId = this.getFunnelCustomerId();
		var userId = this.getUserId();
		var _saq = _saq || [];

		console.log('initElasticSearch!');
	   	_saq.push(['_register', funnelCustomerId]);
	   	_saq.push(['_identity', userId]);

	   	window._saq = _saq;

	   	(function() {
	    	var sa = document.createElement('script'); sa.type = 'text/javascript'; sa.async = true;
	       	sa.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'funnel.sparked.com/static/js/sa.min.js';
	       	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sa, s);
	   	})();
	},
	addEvents: function(){
		$(document)
			.on("SP:event", $.proxy(this.handleEvent, this));
	},
	// TODO
	getFunnelCustomerId: function(){
		return 1;
	},
	// TODO
	getUserId: function(){
		return 1;
	},
	handleEvent: function(e, payload){
		this.trackEvent(payload);
	},
	trackEvent: function(params){
		var self = this;

		_.each(this.activeServices, function(service){
			self.trackEventOnService(service, params);
		});
	},
	trackEventOnService: function(service, params){
		if(this.serviceMethods[service]){
			this[this.serviceMethods[service]](params);
		}
	},
	// params: {category: '', action: '', label: '', value: '', page: ''}
	trackGAEvent: function(params){
		// Default value is ""
		params.value = params.value || "";

		//console.log('Tracking GA Event!', params);
	    if (typeof ga === "function"){
	    	if(params.page){
		    	// PageView
		        ga('send', 'pageview', params.page);
	    	}else{
		        // Event
	        	ga('send', 'event', params.category, params.action, params.label, params.value);
		        // ga('send', 'event', 'button', 'click', 'nav buttons', 4);
	    	}
	    }else{
	    	console.error('Google Analytics object not detected!');
	    }
	},
	trackMixPanelEvent: function(params){
		// Default value is ""
		params.value = params.value || "";

		//console.log('Tracking MixPanel Event!', params);
		if(typeof mixpanel.track === "function"){
			if(params.page){
				mixpanel.track( "Pageview: " + params.page );
			}else{
				mixpanel.track( params.category + " " + params.action + "; " + params.label + " " + params.value );
			}
		}
	},
	trackESEvent: function(params){
		// Default value is ""
		params.value = params.value || "";

		//console.log('Tracking ES Event!', params);
		if(typeof _saq.push === "function"){
			if(params.page){
				_saq.push(['_trackPageview']);
			}else{
				// This is just a first version
				var data = {
				    "customerId": this.getFunnelCustomerId(),
				    "time": new Date().toISOString(),
				    "goal": params.category + " " + params.action,
				    "source": "webapp",
				    "identity": params.label + " " + params.value,
				    "data": {
				        "device": navigator.userAgent
				    }
				},
				dataJSON = encodeURIComponent(JSON.stringify(data)),
				URL = this.config.funnelEndPointURL + "?data=" + dataJSON;

				$.get(URL)
					.done(function(data){})
					.fail(function(error){
						console.log('failed!', error);
					});
			}
		}
	}
};