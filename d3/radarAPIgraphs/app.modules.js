/**
 * App modules
 */

 // MODULE TEMPLATE
 // modName: {
 // 	selector: '.initModName',
 // 	config: {
 //         Place here the strings you gonna use
 // 	},
 // 	defaultParams: function(){
 //         return {};
 // 	},
 // 	init: function(idx, ele, params){

 // 	}
 // }


var graphColors = [
		'#6ad1df',
		'#f6d020',
		'#707d87',
		'#78B915',
		'#212F32',
		'#4572A7',
		'#AA4643',
		'#89A54E',
		'#80699B',
		'#3D96AE',
		'#DB843D',
		'#92A8CD',
		'#A47D7C',
		'#B5CA92'
	];

SP.modules.app = {
	config: {
		spinnerSelector: '.spinner-container'
	},
	init: function(){
		if (SP.events.core.isDomReady) {
			SP.modules.app.classIsReady();
		} else {
			$(document).bind("SP.events.core:isReady", function () {
				SP.modules.app.classIsReady();
			});
		}
	},
	classIsReady: function () {
		$(document).trigger("SP.modules.app.isReady");

		// show the success message if there is one
		if ($.cookie('success_msg')) {
			SP.notify($.cookie('success_msg'), 'success', '#pageContainer');
			$.cookie('success_msg', '', {path:'/'});
		}

		// Hide Spinner
		this.hideSpinner();
	},
	hideSpinner: function(){
		$(document).trigger("SP.spinner:off");
	},
	// Featured Account Slider
	featuredSlides: {
		selector: '.featuredSlides',
		init: function(idx, ele, params) {
			var slidesHeight = $(ele).find('.featured-account').height();

			$(ele).slidesjs({
				width: 388,
				height: slidesHeight,
				callback: {
					complete: function(number) {
						$(document).trigger("SP.event", {category: 'UI-slideshow', action: 'slideLoaded', label: 'Featured Slideshow', value: number});
				    }
				}
			});
		}
	},
	// SideNav Menu
	sideNavFlyoutMenu: {
		selector: '.js-sideNavFlyout',
		config: {
			activeClass: 'active'
		},
		init: function(idx, ele, params){
			$('.menu-link').click(this.toggleFlyoutMenu);
		},
		toggleFlyoutMenu: function(){
			var $menulink = $('.menu-link'),
			    $wrap = $('#wrap');

			$menulink.toggleClass('active');
			$wrap.toggleClass('active');
			return false;
		}
	},
	// Collapsible Sidebar Elements
	sideNav: {
		selector: '.js-sideNav',
		config: {
			activeClass: 'is-active',
			reducedMenuThreshold: 1080
		},
		init: function(idx, ele, params){
			var subnav = $(ele).parent().find('.subNav'),
				_this = this;

			if (subnav.css('display') == 'none') {
				subnav.find('a').click(function(event) {
					event.stopPropagation();
				});
				ele.click(function(event) {
					var elContainer = $(this).parent(),
						subnav = elContainer.find('.subNav'),
						isMenuOpen = ele.parents('.wrap').hasClass('active'),
						isMenuReduced = $(document).width() > _this.config.reducedMenuThreshold ? false : true;

					event.preventDefault();
					// MARCOS: This stinks a bit
					if(!isMenuOpen && isMenuReduced){
						SP.modules.app.sideNavFlyoutMenu.toggleFlyoutMenu();
					}

					_this.deactivateMenus();
					elContainer.addClass(_this.config.activeClass);

					subnav.slideDown(200, function() {
						$(window).click(function(event) {
							subnav.slideUp(200);
							_this.deactivateMenus();
							$(window).unbind('click');
						});
					});
				});
			}
		},
		deactivateMenus: function(){
			$('.js-sideNavContainer li').removeClass(this.config.activeClass);
		}
	},

	addThrobbersUi: {
		selector: '.initThrobbersUi',
		defaultParams: function (){
			return {};
		},
		init: function(idx,ele,params){},
		saveSuccessCb: function(r){
			var url = '/dashboard/';
			var key = $('.initForm').find('button').attr('key');
			loadingImages.remove(key);
			var successMsgLocation = $('.initForm').find('button');
			$('<span> Saved successfully</span>').insertAfter(successMsgLocation);
			switch(key){
				case 'prizeAddButton':
					url = url + 'prizes';
					break;
				case 'userCreateButton':
					if (r.data.params.role == 'admin' || r.data.params.role == 'superadmin'){
						url = url + 'admins';
					} else if (r.data.params.role == 'user') {
						url = url + 'advisors';
					}
					break;
				case 'companyCreateButton':
					url = url + 'companies';
					break;
			}
			window.location = url;
		},
		saveErrorCb: function(errors, ele, params){
			var key = $('.initForm').find('.initLoading').attr('key');
			loadingImages.remove(key);
		}
	},
	summaryTable: {
		selector: '.initSummaryTable',
		defaultParams: function(){
			return {
				offset: 0,
				limit: 10,
				field: 'date_created',
				sort_order: 'DESC',
				target_ele: '.top-users',
				action_url: '/api/users/list/',
				summary_field: 'total_users',
				total_results_label: '#total_results',
				tpl: 'dashboard/users/_user_table.tpl',
				auto_refresh: 0,
				filters: null,
				keywords: null,
				mode: null,
				filter: null,
				index: 'main',
				static_keywords: null,
				show_throbber: "true",
				auto: "true",
				index_type: null,
				type: null,
				extra_fields: null
			};
		},
		config: {
			fadingColumnBgDelay: 2000
		},
		fields: {},
		instance: {},
		activeField: null,
		ele: null,
		throbber: '<div class="throbber-container is-caligned clearfix"><img src="/static/images/spinner.gif" class="throbber" /></div>',
		init: function(idx, ele, params){
			var self = this;
			self.instance[idx] = {
				ele:ele,
				fields:{}
			};
			//if(!spUtils.isEmpty(params.filters)){
			//	params.filters = jQuery.parseJSON(params.filters);
			//}
			self.instance[idx].params = params;

			if (! spUtils.isEmpty(params.extra_fields)) {
				var extra_fields = $.parseJSON(params.extra_fields);
				$.extend(self.instance[idx].params, extra_fields);
			}

			if (params.auto == "true") {
				self.display(idx);
			}
		},
		animate: function(){
			var self = SP.modules.app.summaryTable;
			$("html, body").animate(
				{ scrollTop: ($(document).height() - $(window).height()) + 100},
				{
					easing: 'linear',
					duration: (SP.appData.customer.summary.total_users * self.params.auto_refresh),
					complete: function(){
						window.location=window.location;
						//alert('done');
					},
					progress: function(a,b,c){
						//console.log(a,b,c)
					}
				}
			);
		},
		display: function(idx, opts, hideThrobber){
			var self     = SP.modules.app.summaryTable,
				instance = self.instance[idx];

			$.extend(true, instance.params, opts);

			if (instance.params.show_throbber == "true") {
				$(instance.params.target_ele).html(self.throbber);
			}

			SP.post(instance.params.action_url, instance.params, function(r){
				if(!spUtils.isEmpty(r.html)){
					$(instance.params.target_ele).html(r.html);
					self.setField(idx);
					if(instance.auto_refresh > 0){
						self.animate(idx);
					}
					$(instance.params.total_results_label).html('('+spUtils.numberFormat(r.data.total_results)+')');
					self.bindEvents(idx);

					// If is displayed due to a change in the sort order
					if (instance.params.sort_order) {
						setTimeout(function(){
							// We add a class that makes the column color to fade
							$(instance.params.target_ele).find('table').addClass('fade-out-column');
						}, self.config.fadingColumnBgDelay);
					}
				}
			});
		},
		bindEvents: function(idx) {
			var self = SP.modules.app.summaryTable;
			var instance = self.instance[idx];
			// bind enter key on input
			$(instance.params.target_ele).find("#keywords").keyup(function (e) {
				if (e.keyCode == 13) {
					self.keywordSearch(idx);
				}
			});

			$(instance.params.target_ele).find('.table-search').on('click', function(e){
				e.preventDefault();
				self.keywordSearch(idx);
			});

			$(instance.params.target_ele).find('.table-clear').on('click', function(e){
				self.keywordSearch(idx, null);
			});

			// When user clicks on one of the sortable column labels
			$(instance.params.target_ele).find('.table-sort').on('click', function(e){
				var field =  $(this).data('field'),
					displayOpts = {
						offset: 0,
						field: field,
						sort_order: self.toggleSort(idx, field)
					};

				e.preventDefault();
				self.display(idx, displayOpts);
			});
		},
		keywordSearch: function(idx, keystring) {
			var self = this;
			var instance = this.instance[idx];
			var keywords = null;
			if (typeof keystring != 'undefined') {
				keywords = keystring;
			} else {
				keywords = $(instance.params.target_ele).find('#keywords').val();
			}
			var displayOpts = {
				offset: 0,
				keywords: keywords,
				field: 'relevance'
			};
			self.display(idx, displayOpts);
		},
		paginate: function(offset,limit,idx){
			var self = SP.modules.app.summaryTable;
			self.display(idx, {offset:offset});
		},
		setFields: function(idx){
			var self = this;
			var instance = this.instance[idx];
			$('.table-sort').each(function() {
				instance.fields[$(this).data('field')] = $(this);
			});
		},
		setField: function(idx){
			var self = this;
			var instance = this.instance[idx];
			self.setFields(idx);

			//clear all the icons
			instance.ele.find('.sort-order').remove();

			//add the proper ones
			/*var icon = 'icon-sort-by-attributes-alt';
			if(instance.params.sort_order == 'ASC'){
				icon = 'icon-sort-by-attributes';
			}
			if (typeof instance.fields[instance.params.field] != 'undefined') {
				instance.fields[instance.params.field].append(' <i class="' + icon + ' icon-small">');
			}*/
		},
		toggleSort: function(idx, field){
			var self 	 = SP.modules.app.summaryTable,
				instance = self.instance[idx];

			if(instance.params.field != field){
				return 'DESC';
			}
			if(instance.params.sort_order == 'DESC'){
				return 'ASC';
			}
			return 'DESC';
		}
	},
	summaryTableActions: {
		selector: '.initSummaryTableActions',
		defaultParams: function(){
			return {
				tableIndex: 'main'
			};
		},
		init: function(idx,ele,params) {

			$(ele).find('button').click(function(event) {
				var field = $(this).attr('field');
				event.preventDefault();

				$(this).closest('.initSummaryTableActions').find('button').removeClass('active');
				$(this).addClass('active');

				var displayOpts = {
					offset: 0,
					field: field,
					sort_order: $(this).attr('sort_order')
				};
				SP.modules.app.summaryTable.display(params.tableIndex, displayOpts);

				$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Reasons Explorer - sort by ' + field});
			});

		}
	},
	exportData: {
		selector: '.initExportData',
		defaultParams: function() {
			return {
				export_type: null,
				export_subtype: null
			};
		},
		init: function(idx,ele,params) {

			ele.on('click', function(e) {
				e.preventDefault();
				SP.get('/api/export/' + params.export_type, {
					type: params.export_subtype
				},
				function(r){}, true);

				// don't wait for return, just set timeout and redirect to exports page
				// SP.notify('Your file is being created! You will now be redirected to the exports page where you can view its status','success', '#adminContent');
				// setTimeout(function () {
				// 	window.location.href='/exports';
				// }, 5000);
			});
		}
	},
	exportFilteredData: {
		selector: '.initExportFiltered',
		config: {
			filterFieldSelector: '#accountsSearch',
			successMessage: 'Your file is being created. Please wait a bit to check your download on the Data/Exports tab.',
			rootURL: '/api/export/'
		},
		defaultParams: function() {
			return {
				export_type: null,
				export_subtype: null,
				messageContainerSelector: '#pageContent'
			};
		},
		init: function(idx,ele,params) {
			ele.on('click', $.proxy(this.handleExport, this, params));
		},
		handleExport: function(params, e){
			e.preventDefault();
			this.triggerExport(params);
		},
		triggerExport: function(params){
			var filters = $(this.config.filterFieldSelector).serialize();

			SP.get( this.config.rootURL + params.export_type, {
				type: params.export_subtype,
				filters: filters
			},
			function(r){}, true);

			SP.notify(this.config.successMessage,'success', params.messageContainerSelector);
			// this.redirectToExports();
		},
		redirectToExports: function(){
			setTimeout(function () {
				window.location.href='/exports';
			}, 5000);
		}
	},
	objectsTable: {
		selector: '.initObjectsTable',
		defaultParams: function(){
			return {
				objectType : 'users',
				dataType: null,  /* sometimes the data can't be stored in js the way we want so this allows us to specify a separate index for where the object is in data */
				objectKey: 'user_id',
				confirmField: 'full_name',
				api: null
			};
		},
		init: function(idx,ele,params){
			$('.disableObject').on('click', function(e){
				e.preventDefault();
				var ele = $(this);
				var object_id = ele.data('object_id');
				var object = {};
				if (!spUtils.isEmpty(params.dataType)) {
					object = SP.appData[params.dataType][object_id];
				} else {
					object = SP.appData[params.objectType][object_id];
				}
				var postData = {};
				postData[params.objectKey] = object_id;
				var sApi = params.api;
				if (sApi === null) {
					sApi = params.objectType;
				}

				if(confirm('Are you sure you want to remove ' + object[params.confirmField] + '?')){
					SP.post('/api/' + sApi + '/disable',postData,function(r){
						if(spUtils.isEmpty(r.data.errors)){
							ele.closest('tr').hide('slow').remove();
							SP.notify(object[params.confirmField] + ' Has been removed','success','.notifications');

							$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Exports remove file'});
						}
					});
				}
			});

			$('.deleteObject').on('click', function(e){
				e.preventDefault();
				var ele = $(this);
				var object_id = ele.data('object_id');
				var object = {};
				if (!spUtils.isEmpty(params.dataType)) {
					object = SP.appData[params.dataType][object_id];
				} else {
					object = SP.appData[params.objectType][object_id];
				}
				var postData = {};
				postData[params.objectKey] = object_id;
				var sApi = params.api;
				if (sApi === null) {
					sApi = params.objectType;
				}

				if(confirm('Are you sure you want to permanently delete ' + object[params.confirmField] + '? All user information will be lost, THIS CAN NOT BE UNDONE')){
					SP.post('/api/' + sApi + '/delete',postData,function(r){
						if(spUtils.isEmpty(r.data.errors)){
							ele.closest('tr').hide('slow').remove();
							SP.notify(object[params.confirmField] + ' Has been deleted','success','.notifications');

							$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Exports permanently delete file'});
						}
					});
				}
			});

			$('.download-link').on('click', function(e){
				$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Exports download file'});
			});
		}
	},
	// Deprecated
	segmentDetails: {
		selector: '.initSegmentDetails',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			$('.associateAction').on('click', function(){
				var text = $(this).html();
				if (text == 'Turn on'){
					$(this).html('Turn off');
					$(this).closest('.action-block').find('.selectpicker').prop('disabled',false).selectpicker('refresh');
					$(this).closest('.action-block').find('.save_action').prop('disabled',false);
					$(this).closest('.action-block').find('input[name="save_action"]').val('add');
				} else {
					$(this).closest('.action-block').find('input[name="save_action"]').val('remove');
					$(this).closest('.action-block').find('.initForm').submit();
					$(this).html('Turn on');
					$(this).closest('.action-block').find('.selectpicker').prop('disabled',true).selectpicker('refresh');
					$(this).closest('.action-block').find('.save_action').prop('disabled',true);
				}
			});
		},
		saveCb: function(r){
			var target = '#addemail';
			if (r.data.params.type_id == 2){
				target = '#addalert';
			}
			SP.notify('Success! Your preference has been saved.', 'success', target, true);
		}
	},
	importDisplay: {
		selector: '.initImportTable',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			$('.job-row').on('click',function(e){
				//console.log($(this).attr('jobid'),$('#job-' + $(this).attr('jobid')));
				e.preventDefault();
				$('#job-' + $(this).attr('jobid')).toggle('slow');
				$('#job-' + $(this).attr('jobid .well')).slideToggle('slow');
			});
		}
	},


	// Charts
	// D3 Chart
	rarChart: {
		selector: '#rarChart',
		config: {
			svgWidth          :'990px',
			svgHeight         :'567px',
			innerRadius       : 105,
			outerRadius       : 198,
			rarCharSVGSelector: '#rarChart svg',
			color 			  : ['#de516e', '#f6d020', '#98cb60']
		},
		currentTimeframe: 'month',
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){
			this.report = SP.appData.rar.report;

			if (this.report.hasOwnProperty('predictedValues') && this.report.predictedValues) {
				this.drawChart(this.report, 'predicted');
			}else{
				this.drawChart(this.report, 'manual');
			}
			this.addEvents(ele);
		},
		addEvents: function(ele){
			$(document).on('click', '.btn-timeframe', $.proxy(this.handleTimeframeBtn, this));
		},
		handleTimeframeBtn: function(e){
			e.preventDefault();
			this.changeTimeframe(e.target);
		},
		changeTimeframe: function(btn){
			var $btn = $(btn),
				timeframe = $btn.attr('data-timeframe');

			if(timeframe !== this.currentTimeframe){
				this.cleanActiveBtn();
				$btn.addClass('is-active');

				if(timeframe === 'month'){
					this.drawChart(this.report, 'manual');
				}else{
					this.drawChart(this.report, 'predicted');
				}
				this.currentTimeframe = timeframe;
			}
		},
		cleanActiveBtn: function(){
			$('.btn-timeframe').removeClass('is-active');
		},
		drawChart: function(report, chartType) {
			var data, chartDiv, dataset, pie, arc, path,
				self = this;

			data = report[chartType+'Values'];
			data.totalMrr = report.totalMrr;
			data.atRiskRevenue = report.atRiskRevenue;
			this.data = data;
			dataset = {
				apples: [data.red, data.yellow, data.green]
			};

			chartDiv = d3.select(this.config.rarCharSVGSelector);
			this.svg = d3.select('#rarChart svg g#rarPieChart')
					.attr("transform", "translate(224 278) rotate(-30)");

			// draw the pie chart
			pie = d3.layout.pie().sort(null);

			arc = d3.svg.arc()
				.innerRadius(this.config.innerRadius)
				.outerRadius(this.config.outerRadius);

			path = this.svg.selectAll("path")
				.data(pie(dataset.apples))
				.enter().append("path")
				.attr("fill", function(d, i) { return self.config.color[i]; })
				.attr("d", arc);
		}
	},
	// Dimple Chart
	retentionChart: {
		selector: '#retentionChart',
		config: {
			chartHeight: 350,
			chartXMargin: 40,
			chartYMargin: 10,
			temporalContainerSelector: '#retention-chart-placeholder'
		},
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){
			var data             = SP.appData.response.report.churnPercentageHist, // for right now just take the first 12 months in the report
				orderRule        = [],
				lowestPercentage = 100,
				_date            = new Date(),
				_userOffset      = _date.getTimezoneOffset()*60000 + 3600000,
				svg, x, y, s;

			// Process Data
			if (data.length > 12) {
				data = data.slice(data.length-13);
			}
			data.forEach(function(d){
				d.time = d3.time.format('%b %Y')(new Date((d.time * 1 + _userOffset)));
				var percentage = (1.0 - d.percentage) * 100;
				d.percentage = percentage + '%';
				orderRule.push(d.time);
				if (percentage < lowestPercentage) {
					lowestPercentage = percentage;
				}
			});

			// DISABLED -B/c the last month is incomplete, we remove that data
			// data.pop();

			svg = dimple.newSvg(this.config.temporalContainerSelector, '100%', this.config.chartHeight);

			this.myChart = new dimple.chart(svg, data);
			this.myChart.defaultColors = [
				new dimple.color('#7bba5a')
			];
			this.myChart.setBounds(this.config.chartXMargin, this.config.chartYMargin, '85%', this.config.chartHeight-90);

			x = this.myChart.addCategoryAxis("x", "time");
			this.myChart.defaultColors = [
				new dimple.color("#6ad1df")
			];
			x.addOrderRule(orderRule);

			y = this.myChart.addMeasureAxis("y", "percentage");
			y.overrideMin = lowestPercentage > 90 ? 90 : lowestPercentage;
			y.overrideMax = 100;

			s = this.myChart.addSeries(null, dimple.plot.line);
			s.lineMarkers = true;
			this.myChart.draw();
			// This changing of ubication is a hack to make it work on FF
			// Reference: http://stackoverflow.com/questions/22312355/ns-error-failure-in-firefox-when-drawing-dimple-js-chart-after-jquery
			$(this.config.temporalContainerSelector).appendTo(this.selector);
			this.addPercentageToAxis();
			this.rotateTimeLabels();

			$(window).on('resize', $.proxy(this.handleWindowResize, this));

			// override the dimple event handlers for rectangle chart items
			// right now we just need this for liklihood chart - eventually want to break
			// this out so this isn't a global override for any dimple chart using rects
			dimple.plot.line.enterEventHandler = function (e, shape, chart, series) {

				// The margin between the text and the box
				var textMargin = 10,
					// The margin between the ring and the popup
					popupMargin = 10,
					// The popup animation duration in ms
					animDuration = 750,
					// Collect some facts about the highlighted bubble
					selectedShape = d3.select(shape),
					cx = parseFloat(selectedShape.attr("cx")),
					cy = parseFloat(selectedShape.attr("cy")),
					r = parseFloat(selectedShape.attr("r")),
					opacity = dimple._helpers.opacity(e, chart, series),
					fill = selectedShape.attr("stroke"),
					dropDest = series._dropLineOrigin(),
					// Fade the popup stroke mixing the shape fill with 60% white
					popupStrokeColor = d3.rgb(
						d3.rgb(fill).r + 0.6 * (255 - d3.rgb(fill).r),
						d3.rgb(fill).g + 0.6 * (255 - d3.rgb(fill).g),
						d3.rgb(fill).b + 0.6 * (255 - d3.rgb(fill).b)
					),
					// Fade the popup fill mixing the shape fill with 80% white
					popupFillColor = d3.rgb(
						d3.rgb(fill).r + 0.8 * (255 - d3.rgb(fill).r),
						d3.rgb(fill).g + 0.8 * (255 - d3.rgb(fill).g),
						d3.rgb(fill).b + 0.8 * (255 - d3.rgb(fill).b)
					),
					// The running y value for the text elements
					y = 0,
					// The maximum bounds of the text elements
					w = 0,
					h = 0,
					t,
					box,
					rows = [],
					overlap;

				if (chart._tooltipGroup !== null && chart._tooltipGroup !== undefined) {
					chart._tooltipGroup.remove();
				}
				chart._tooltipGroup = chart.svg.append("g");

				// On hover make the line marker visible immediately
				selectedShape.style("opacity", 1);

				// Add a group for text
				t = chart._tooltipGroup.append("g");
				// Create a box for the popup in the text group
				box = t.append("rect")
					.attr("class", "tooltip");


				// BEGIN RADAR CODE
				rows.push(series.y._getFormat()(e.height) + '% retention');
				rows.push('during month of');

				// get the x category
				series.x.categoryFields.forEach(function (c, i) {
						// If the category name and value match don't display the category name

						rows.push(e.xField[i]);
					}, this);

				popupStrokeColor = d3.rgb('#414e59');
				popupFillColor = d3.rgb('#414e59');

				// Get distinct text rows to deal with cases where 2 axes have the same dimensionality
				rows = rows.filter(function(elem, pos) {
					return rows.indexOf(elem) === pos;
				});

				// Create a text object for every row in the popup
				t.selectAll(".textHoverShapes").data(rows).enter()
					.append("text")
						.attr("class", "tooltip")
						.text(function (d) { return d; })
						.style("font-family", "sans-serif")
						.style("font-size", "10px");

				// Get the max height and width of the text items
				t.each(function () {
					w = (this.getBBox().width > w ? this.getBBox().width : w);
					h = (this.getBBox().width > h ? this.getBBox().height : h);
				});

				// Position the text relatve to the bubble, the absolute positioning
				// will be done by translating the group
				t.selectAll("text")
					.attr("x", 0)
					.attr("y", function () {
						// Increment the y position
						y += this.getBBox().height;
						// Position the text at the centre point
						return y - (this.getBBox().height / 2);
					});

				// Draw the box with a margin around the text
				box.attr("x", -textMargin)
					.attr("y", -textMargin)
					.attr("height", Math.floor(y + textMargin) - 0.5)
					.attr("width", w + 2 * textMargin)
					.attr("rx", 5)
					.attr("ry", 5)
					.style("fill", popupFillColor)
					.style("stroke", popupStrokeColor)
					.style("stroke-width", 2)
					.style("opacity", 0.95);

				// Shift the ring margin left or right depending on whether it will overlap the edge
				overlap = cx + r + textMargin + popupMargin + w > parseFloat(chart.svg.node().getBBox().width);

				// Translate the shapes to the x position of the bubble (the x position of the shapes is handled)
				t.attr("transform", "translate(" +
					   (overlap ? cx - (r + textMargin + popupMargin + w) : cx + r + textMargin + popupMargin) + " , " +
					   (cy - ((y - (h - textMargin)) / 2)) +
					")");
			};
		},
		// TODO: This is kinda hacky
		// add % to axis labels
		addPercentageToAxis: function(){
			$('#retentionChart g.dimple-axis').eq(1).find('text').each(function() {
				var label = $(this).text();
				if (!isNaN(parseInt(label))) {
					$(this).text(label+'%');
				}
			});
		},
		rotateTimeLabels: function(){
			$(this.selector).find('.dimple-axis').eq(0).find('text').attr('transform', 'rotate(35)');
		},
		handleWindowResize: function(){
			this.myChart.setBounds(this.config.chartXMargin, this.config.chartYMargin, '85%', this.config.chartHeight-90);
			this.addPercentageToAxis();
			this.rotateTimeLabels();
		}
	},
	// Dimple Chart
	liklihoodChart: {
		selector: '#liklihoodChart',
		data      : [],
		rawData   : [],
		orderRule : [],
		reportData: {},
		defaultParams: function(){
			return {
				chartHeight : 350,
				// TODO: Modify this range of colors to add more contrast on the graph
			    colors : {
					'0' : '#89bf4f',
				   	'10' : '#98cb60',
				   	'20' : '#98cb60',
				   	'30' : '#acd97b',
				   	'40' : '#acd97b',
				   	'50' : '#bdea8c',
				   	'60' : '#ea8c99',
				   	'70' : '#e6627d',
				   	'80' : '#e6627d',
				   	'90' : '#de516e',
				   	'100' : '#ab364d'
			   	},
			   	animationSpeed: 750
			};
		},
		config: {
			zoomCount: 0
		},
		init: function(idx, ele, params){
			var self 			= this,
				mappedOrderRule = [],
				svg, myChart, mappedValue, x, y, s;

			SP.modules.app.liklihoodChart.selectedShape = null;

			this.getAndCleanData();

			// Creating chart
			svg = dimple.newSvg(this.selector, '100%', params.chartHeight);
			myChart = new dimple.chart(svg, this.data);
			myChart.setBounds(60, 10, '85%', params.chartHeight-50);
			x = myChart.addCategoryAxis("x", "Risk");

			// Sorting the order rule array and adding it to X axis
			this.orderRule.sort( function(a,b){return a-b;} );
			$.each(this.orderRule, function(index, value) {
				mappedOrderRule.push(value + '%');
			});
			x.addOrderRule(mappedOrderRule);

			y = myChart.addMeasureAxis("y", "Customers");

			// Chart Coloring
			// Coloring bars relative to green and yellowThreshold
			if (typeof (SP.appData.greenThreshold) != 'undefined' && typeof (SP.appData.yellowThreshold) != 'undefined') {
				var green = SP.appData.greenThreshold *100,
					yellow = SP.appData.yellowThreshold * 100;

			   	$.each(this.orderRule, function(index, value) {
					if (value < green){
						$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', '#89bf4f').css('stroke', '#89bf4f');
					} else if (value >= green && value < yellow) {
						$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', '#f1d40f').css('stroke', '#f1d40f');
					} else {
						$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', '#ab364d').css('stroke', '#ab364d');
					}
			   	});
			} else {
			   	$.each(this.orderRule, function(index, value) {
					mappedValue = Math.round(value/10)*10;
					$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', params.colors[mappedValue]).css('stroke', params.colors[mappedValue]);
			   	});
			}

			// Drawing the Chart
			s = myChart.addSeries(null, dimple.plot.bar);
			myChart.draw();

			// Caching Data
			this.myChart = myChart;
			this.myChartSeries = s;
			// We sort the data in order to get the right segments
			this.data.sort( function(a,b){
				return parseInt(a.Risk.slice(0, -1), 10) - parseInt(b.Risk.slice(0, -1), 10);
			} );
			// We clone the array and the objects inside it
			this.originalData = JSON.parse(JSON.stringify(this.data));
			this.originalOrderRule = this.orderRule;
			// Initialize Zoom slider
			this.initDragDealer();
			this.addEvents(myChart);
		},
		addEvents: function(myChart){
			// Adding events
			$(window).on('resize', $.proxy(this.handleScreenResize, this, myChart));
			dimple.plot.bar.enterEventHandler = this.handleMouseEnter;
			dimple.plot.bar.leaveEventHandler = this.handleMouseLeave;
		},
		getAndCleanData: function(){
			var self 			= this;

			this.rawData = SP.appData.response.report.mrrStats.atRiskCount;

			if ('0' in this.rawData) {
				delete this.rawData['0'];
			}

			// Calculating reportData and orderRule
			$.each(this.rawData, function(index, value) {
				self.reportData[index+'%'] = value;
				self.orderRule.push(index);
			});

			// Creating data by adding Risk% and # of Customers
			for (var key in this.reportData) {
				this.data.push({ "Risk": key, "Customers": self.reportData[key] });
			}
		},
		selectShape: function(shape) {
			if (SP.modules.app.liklihoodChart.selectedShape !== null) {
				SP.modules.app.liklihoodChart.deselectShape();
			}

			SP.modules.app.liklihoodChart.selectedShape = shape;
			var selectedFill = d3.rgb(shape.style('fill')).darker();
			shape.style('fill', selectedFill)
					.style('stroke', selectedFill);
		},
		changeAxes: function(ratio){
			var	self           = this,
				myChart        = this.myChart,
				s              = this.myChartSeries,
				originalData   = this.originalData,
				dataCopy       = JSON.parse(JSON.stringify(originalData)),
				animationSpeed = this.defaultParams().animationSpeed,
				orderRule      = this.originalOrderRule,
				newData, index;

			myChart.data.forEach(function (d) { d.Customers = 0; });
			s.afterDraw = function () {
				// TODO: Hacky but effective
				if(ratio > 0.95){ ratio = 0.95; }

				if(ratio != 1){
					index = Math.ceil(dataCopy.length * ratio);
					newData = dataCopy.filter(function(d, i) { return i >= index; });
				}
				myChart.data = newData;
		        s.afterDraw = null;
				myChart.draw(animationSpeed);

				// need this here to adjust the bar colors after resize
				$.each(orderRule, function(index, value) {
					if (typeof (SP.appData.greenThreshold) != 'undefined' && typeof (SP.appData.yellowThreshold) != 'undefined') {
						var green = SP.appData.greenThreshold *100;
						var yellow = SP.appData.yellowThreshold * 100;

						if (value < green){
							$(self.escapeDecimalIds(value)).css('fill', '#89bf4f').css('stroke', '#89bf4f');
						} else if (value >= green && value < yellow) {
							$(self.escapeDecimalIds(value)).css('fill', '#f1d40f').css('stroke', '#f1d40f');
						} else {
							$(self.escapeDecimalIds(value)).css('fill', '#ab364d').css('stroke', '#ab364d');
						}
					}
			   	});

			   	self.config.zoomCount++;
			   	if(self.config.zoomCount>1){
				   	$(document).trigger("SP.event", {category: 'UI-slider', action: 'swiped', label: 'Likelyhood Graph Zoom', value: ratio});
			   	}
		    };
			myChart.draw(animationSpeed);

			// need this here to adjust the bar colors after resize
			$.each(orderRule, function(index, value) {
				if (typeof (SP.appData.greenThreshold) != 'undefined' && typeof (SP.appData.yellowThreshold) != 'undefined') {
					var green = SP.appData.greenThreshold *100;
					var yellow = SP.appData.yellowThreshold * 100;
					if (value < green){
						$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', '#89bf4f').css('stroke', '#89bf4f');
					} else if (value >= green && value < yellow) {
						$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', '#f1d40f').css('stroke', '#f1d40f');
					} else {
						$(SP.modules.app.liklihoodChart.escapeDecimalIds(value)).css('fill', '#ab364d').css('stroke', '#ab364d');
					}
				}
		   	});
		},
		escapeDecimalIds: function(id){
			return "#All_" + id.replace( /(:|\.|\[|\])/g, "\\$1" ) + "\\%__";
		},
		deselectShape: function() {
			if (SP.modules.app.liklihoodChart.selectedShape !== null) {
				var selectedShape = SP.modules.app.liklihoodChart.selectedShape;
				var selectedFill = d3.rgb(selectedShape.style('fill')).brighter().brighter();
				selectedShape.style('fill', selectedFill)
						.style('stroke', selectedFill);
				SP.modules.app.liklihoodChart.selectedShape = null;
			}
		},
		initDragDealer: function(){
			this.dragDealer = new Dragdealer('demo-simple-slider');

			var _this = this;

			this.dragDealer = new Dragdealer('demo-simple-slider', {
			    x: 0,
			    //steps: 3,
			    animationCallback: function(x, y) {
			        var newValue = Math.round( x * 100);

			        $('#demo-simple-slider .value').text(newValue);
			        _this.changeAxes(x);
			    }
			});
		},
		// override the dimple event handlers for rectangle chart items
		// right now we just need this for liklihood chart - eventually want to break
		// this out so this isn't a global override for any dimple chart using rects
		handleMouseEnter: function (e, shape, chart, series) {
			// The margin between the text and the box
			var textMargin = 10,
				// The margin between the ring and the popup
				popupMargin = 10,
				// The popup animation duration in ms
				animDuration = 750,
				// Collect some facts about the highlighted bubble
				selectedShape = d3.select(shape),
				x = parseFloat(selectedShape.attr("x")),
				y = parseFloat(selectedShape.attr("y")),
				width = parseFloat(selectedShape.attr("width")),
				height = parseFloat(selectedShape.attr("height")),
				opacity = selectedShape.attr("opacity"),
				fill = selectedShape.attr("fill"),
				dropDest = series._dropLineOrigin(),
				// Fade the popup stroke mixing the shape fill with 60% white
				popupStrokeColor = d3.rgb(
					d3.rgb(fill).r + 0.6 * (255 - d3.rgb(fill).r),
					d3.rgb(fill).g + 0.6 * (255 - d3.rgb(fill).g),
					d3.rgb(fill).b + 0.6 * (255 - d3.rgb(fill).b)
				),
				// Fade the popup fill mixing the shape fill with 80% white
				popupFillColor = d3.rgb(
					d3.rgb(fill).r + 0.8 * (255 - d3.rgb(fill).r),
					d3.rgb(fill).g + 0.8 * (255 - d3.rgb(fill).g),
					d3.rgb(fill).b + 0.8 * (255 - d3.rgb(fill).b)
				),
				t,
				box,
				rows = [],
				// The running y value for the text elements
				yRunning = 0,
				// The maximum bounds of the text elements
				w = 0,
				h = 0,
				// Values to shift the popup
				translateX,
				translateY;

			// BEGIN RADAR CODE
			SP.modules.app.liklihoodChart.selectShape(selectedShape);
			// END RADAR CODE

			var selectedFill = selectedShape.style('fill');
			selectedShape.style('fill', d3.rgb(selectedFill).darker())
							.style('stroke', d3.rgb(selectedFill).darker());

			if (chart._tooltipGroup !== null && chart._tooltipGroup !== undefined) {
				chart._tooltipGroup.remove();
			}
			chart._tooltipGroup = chart.svg.append("g");

			// Add a group for text
			t = chart._tooltipGroup.append("g");
			// Create a box for the popup in the text group
			box = t.append("rect")
				.attr("class", "tooltip");

			// BEGIN RADAR CODE
			rows.push(series.y._getFormat()(e.height) + ' users are ');

			// get the x category
			series.x.categoryFields.forEach(function (c, i) {
					// If the category name and value match don't display the category name
					rows.push(e.xField[i] + ' likely to cancel');
				}, this);

			 popupStrokeColor = d3.rgb('#414e59');
			 popupFillColor = d3.rgb('#414e59');
			//END RADAR CODE


			// Get distinct text rows to deal with cases where 2 axes have the same dimensionality
			rows = rows.filter(function(elem, pos) {
				return rows.indexOf(elem) === pos;
			});

			// Create a text object for every row in the popup
			t.selectAll(".textHoverShapes").data(rows).enter()
				.append("text")
					.attr("class", "tooltip")
					.text(function (d) { return d; })
					.style("font-family", "sans-serif")
					.style("font-size", "10px");

			// Get the max height and width of the text items
			t.each(function () {
				w = (this.getBBox().width > w ? this.getBBox().width : w);
				h = (this.getBBox().width > h ? this.getBBox().height : h);
			});

			// Position the text relatve to the bubble, the absolute positioning
			// will be done by translating the group
			t.selectAll("text")
				.attr("x", 0)
				.attr("y", function () {
					// Increment the y position
					yRunning += this.getBBox().height;
					// Position the text at the centre point
					return yRunning - (this.getBBox().height / 2);
				});

			// Draw the box with a margin around the text
			box.attr("x", -textMargin)
				.attr("y", -textMargin)
				.attr("height", Math.floor(yRunning + textMargin) + 2)
				.attr("width", w + 2 * textMargin)
				.attr("rx", 3)
				.attr("ry", 3)
				.style("fill", popupFillColor)
				.style("stroke", popupStrokeColor)
				.style("stroke-width", 2)
				.style("opacity", 0.95);

			// Shift the popup around to avoid overlapping the svg edge
			if (x + width + textMargin + popupMargin + w < parseFloat(chart.svg.node().getBBox().width)) {
				// Draw centre right
				translateX = (x + width + textMargin + popupMargin);
				translateY = (y + (height / 2) - ((yRunning - (h - textMargin)) / 2));
				t.attr("transform", "translate(" + translateX + " , " + translateY + ")");
			} else if (x - (textMargin + popupMargin + w) > 0) {
				// Draw centre left
				translateX = (x - (textMargin + popupMargin + w));
				translateY = (y + (height / 2) - ((yRunning - (h - textMargin)) / 2));
				t.attr("transform", "translate(" + translateX + " , " + translateY + ")");
			} else if (y + height + yRunning + popupMargin + textMargin < parseFloat(chart.svg.node().getBBox().height)) {
				// Draw centre below
				translateX = (x + (width / 2) - (2 * textMargin + w) / 2);
				translateY = (y + height + 2 * textMargin);
				t.attr("transform", "translate(" +
					(translateX > 0 ? translateX : popupMargin) + " , " +
					translateY +
					")");
			} else {
				// Draw centre above
				translateX = (x + (width / 2) - (2 * textMargin + w) / 2);
				translateY = (y - yRunning - (h - textMargin));
				t.attr("transform", "translate(" +
					(translateX > 0 ? translateX : popupMargin) + " , " +
					translateY +
					")");
			}
		},
		handleMouseLeave: function(chart) {
			SP.modules.app.liklihoodChart.deselectShape();
			if (chart._tooltipGroup !== null && chart._tooltipGroup !== undefined) {
				chart._tooltipGroup.remove();
			}
		},
		handleScreenResize: function(myChart){
			myChart.setBounds(50, 10, '85%', this.defaultParams().chartHeight-50);
		}
	},
	// Highcharts Chart
	histogramChart: {
		selector: '.initHistogramChart',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){

			var agg 			= SP.appData.aggregations;
			var xLabel			= agg.x_label;
			var yLabel			= agg.y_label;
			var xRotation		= !spUtils.isEmpty(agg.y_rotation) ? agg.y_rotation : '0';
			var aggCategories 	= [];
			var aggData 		= [];
			for (var key in SP.appData.aggregations.agg_data) {
				aggCategories.push(key);
				aggData.push(parseInt(SP.appData.aggregations.agg_data[key]));
			}

			//console.log(aggCategories);
			//console.log(aggData);

			ele.highcharts({
				colors: graphColors,
				chart: {
			        renderTo:'container',
			        defaultSeriesType:'column',
			        backgroundColor:'#eee',
			        borderWidth:1,
			        borderColor:'#ccc',
			        plotBackgroundColor:'#fff',
			        plotBorderWidth:1,
			        plotBorderColor:'#ccc'
			    },
			    credits:{enabled:false},
			    exporting:{enabled:false},
			    title:{text:'Aggregation Results'},
			    legend:{
			        //enabled:false
			    },
			    tooltip:{
			        borderWidth:1,
			        formatter:function() {
			            return '<b>Range:</b><br/> '+ this.x +'<br/>'+
			            '<b>Count:</b> '+ this.y;
			        }
			    },
			    plotOptions:{
			        column:{
			            shadow:false,
			            borderWidth:.5,
			            borderColor:'#666',
			            pointPadding:0,
			            groupPadding:0,
			            colorByPoint: true
			        },
			        spline:{
			            shadow:false,
			            marker:{
			                radius:1
			            }
			        },
			        areaspline:{
			            //color:'rgb(69, 114, 167)',
			            //fillColor:'rgba(69, 114, 167,.25)',
			            shadow:false,
			            marker:{
			                radius:1
			            }
			        }
			    },
			    xAxis:{
			    	title:{text:xLabel, margin: 20},
			        categories: aggCategories,
			        labels:{
			        	rotation:xRotation,
			            y:15,
			            style: {
			                fontSize:'9px',
			                fontWeight:'normal',
			                color:'#333'
			            }
			        },
			        lineWidth:0,
			        lineColor:'#000',
			        tickLength:20,
			        tickColor:'#ccc'
			    },
			    yAxis:{
			        title:{text:yLabel},
			        //maxPadding:0,
			        gridLineColor:'#e9e9e9',
			        tickWidth:1,
			        tickLength:3,
			        tickColor:'#ccc',
			        lineColor:'#ccc',
			        tickInterval:25
			        //endOnTick:false,
			    },
			    series: [{
			        name:'Bins',
			        data: aggData
			    },{
			        name:'Curve',
			        type:'spline',
			        visible:false,
			        data: aggData
			        //color: 'rgba(204,204,255,.85)'
			    },{
			        name:'Filled Curve',
			        type:'areaspline',
			        visible:false,
			        data: aggData
			        //color: 'rgba(204,204,255,.85)'
			    }]
			});

		}
	},
	// Highcharts Chart
	actionsDateChart: {
		selector: '.initActionsDateChart',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			var data = [];

			var post_params = {};
			if (!spUtils.isEmpty(SP.appData.search)) {
				post_params = {search_id:SP.appData.search.search_id};
			}
			SP.post('/api/actions/datechart',post_params, function (r) {

				for(i=0; i<r.data.chart.length; i++){
					data.push([parseInt(r.data.chart[i].key),parseInt(r.data.chart[i].doc_count)]);
				}

				// Create a timer
				var start = + new Date();
				// Create the chart
				ele.highcharts('StockChart', {
					colors: graphColors,
					credits: {
					enabled: false
					},
					chart: {
						zoomType: 'x'
					},

					rangeSelector: {
						inputEnabled: ele.width() > 480,
						buttons: [ {
							type: 'week',
							count: 1,
							text: '1w'
						}, {
							type: 'month',
							count: 1,
							text: '1m'
						}, {
							type: 'month',
							count: 6,
							text: '6m'
						}, {
							type: 'year',
							count: 1,
							text: '1y'
						}, {
							type: 'year',
							count: 2,
							text: '2y'
						}, {
							type: 'all',
							text: 'All'
						}],
						selected: 3
					},
					yAxis: {
						title: {
							text: 'Events'
						}
					},

					title: {
						text: 'Events'
					},

					subtitle: {
						text: 'Events By Day' // dummy text to reserve space for dynamic subtitle
					},

					series: [{
						name: 'Actions',
						data: data,
						tooltip: {
							//valueDecimals: 1
						},
						marker: {
							fillColor: '#f5ffe9',
							lineWidth: 2,
							lineColor: '#98cb60'
						}
					}]
				});

			});

		}
	},
	// Highcharts Chart
	goalsPieChart: {
		selector: '.initGoalsPieChart',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			SP.post('/api/actions/goalschart',{}, function (r) {
				var data = [];
				for(i=0; i<r.data.chart.length; i++){
					data.push([r.data.chart[i].key,parseInt(r.data.chart[i].doc_count)]);
				}
				// Build the chart
				ele.highcharts({
						credits: {
							enabled: false
						},
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false
						},
						title: {
							text: 'Product usage events'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}% ({point.y} total)</b>'
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: false
								},
								showInLegend: true
							}
						},
						series: [{
							type: 'pie',
							name: 'Goal Percentage',
							data: data
						}]
					});
				});
		}
	},
	// NV Chart
	cohortSnapshot: {
		selector: '.cohortSnapshot',
		config: {
			dataURL					: '/api/accounts/segmentcompare',
			colorLegend             : '.colorLegend',
			labelsSelector          : '.cohortLabels',
			spinnerContainerSelector: '.throbberContainer',
			selectBoxesSelector     : '.cohortSelect select',
			searchIconASelector		: '.segment-a > span',
			searchIconBSelector		: '.segment-b > span',
			// colors                  : ['#454C99', '#06517F',  '#b2df8a'],
			colors                  : ['#06517F', '#0971B2', '#b2df8a'],
			// colors                  : ['#A874B1', '#5fbcc8', '#b2df8a'],
			graphTransitionDuration : 250,
			margin: {
				top: 30,
				right: 10,
				bottom: 35,
				left: 60
			},
			winnerMessages			: {
				subscription: 'Longer subscription length',
				money       : 'More money paid to date',
				revenue     : 'More revenue at risk',
				activity    : 'Higher activity',
				churn       : 'Higher churn rate',
				loyalty     : 'Higher loyalty',
				size        : 'More people',
				mrr         : 'Higher MRR'
			},
			tieMessages				: {
				subscription: 'Similar subscription length',
				money       : 'Similar money paid to date',
				revenue     : 'Similar revenue at risk',
				activity    : 'Similar activity',
				churn       : 'Similar churn rate',
				loyalty     : 'Similar loyalty',
				size        : 'Similar number of people',
				mrr         : 'Similar MRR'
			}
		},
		defaultParams: function (){
			return {
				currency: '$'
			};
		},
		init: function(idx,ele,params){
			this.currency = params.currency;
			this.initColors();
			this.drawGraphs(this.selectedCohorts());
			this.addEvents();
		},
		addEvents: function(){
			var self = this;

			$(this.config.selectBoxesSelector).each(function(){
				$(this).change(function(){
					var selectedCohorts = self.selectedCohorts(),
						labels = _.pluck(_.values(selectedCohorts), "label");

					self.drawGraphs(selectedCohorts);
					$(document).trigger('SP:event', {category: 'UI-SelectBox', action: 'Head to Head selection', label: labels.join(" vs ")});
				});
			});
		},
		// This method hides the current value of each selectbox on the other's selectbox options
		removeOtherBoxesValues: function(){
			var box1 = $(this.config.selectBoxesSelector).eq(0),
				box2 = $(this.config.selectBoxesSelector).eq(1),
				box1options = box1.find('option'),
				box2options = box2.find('option'),
				box1Val = box1.selectpicker('val'),
				box2Val = box2.selectpicker('val');

			// Show all options
			box1options.css("display", "block");
			box2options.css("display", "block");

			// We need to hide them, removing them will avoid us to use them later
			box1.find("option[value='" + box2Val + "']" ).hide();
			box2.find("option[value='" + box1Val + "']" ).hide();

			// Selectpicker needs a refresh to update the changes
			box1.selectpicker('refresh');
			box2.selectpicker('refresh');
		},
		initColors: function(){
			var self = this;

			$(this.config.colorLegend).each(function(i){
				$(this).css('color', self.config.colors[i]);
			});
		},
		// Gets the current selected cohorts to init the graph search with
		selectedCohorts: function() {
			var toReturn = [];

			$(this.config.selectBoxesSelector).each(function(){
				toReturn.push($(this).children('option:selected').attr('data-segmentid'));
			});
			return toReturn;
		},
		stagePage: function() {
			// I rhyme all the time / coding it up, using sublime ;)
			$(this.config.spinnerContainerSelector).show();
			$(this.selector).hide();

			$(this.config.labelsSelector).html('');
			$('svg').empty();
		},
		drawGraphs: function(segments) {
			var data = {'segments': segments};

			this.stagePage();
			SP.post(this.config.dataURL, data, $.proxy(this.handleGraphDataReceived, this));
			this.removeOtherBoxesValues();
		},
		handleGraphDataReceived: function(r){
			var tmp,
				graphs = {
					'#likelihoodToStayChart'	: r.data.statistics.likelihoodToStay,
					'#totalAccountsChart'		: r.data.statistics.segmentSize,
					'#activityChart'			: r.data.statistics.activity,
					'#averageMRRChart'			: r.data.statistics.avgMRR,
					'#toDateRevenueChart'		: r.data.statistics.toDateRevenue,
					'#futureRevenueChart'		: r.data.statistics.futureRevenue,
					'#lifespanChart'			: r.data.statistics.lifespan
					/*'#churnRateChart'			: r.data.statistics.churnRate*/
				},
				currency = this.currency,
 				a_results_html = '',
 				b_results_html = '',
				iconAClass, iconBClass, iconA, iconB;

			iconA = SP.appData.customer.info.search_icons[SP.appData.segments[0].search_id];
			if (spUtils.isEmpty(iconA)) {
				iconAClass = 'segment-Earth';
			} else {
				iconAClass = 'segment-'+iconA;
			}
			$(this.config.searchIconASelector).removeClass().addClass($(this.config.searchIconASelector).attr('data-classes')+' '+iconAClass);
			//$(this.config.searchIconASelector).addClass(iconAClass);

			iconB = SP.appData.customer.info.search_icons[SP.appData.segments[1].search_id];
			if (spUtils.isEmpty(iconB)) {
				iconBClass = 'segment-Earth';
			} else {
				iconBClass = 'segment-'+iconB;
			}
			$(this.config.searchIconBSelector).removeClass().addClass($(this.config.searchIconBSelector).attr('data-classes')+' '+iconBClass);
			//$(this.config.searchIconBSelector).addClass(iconBClass);

			$(this.selector).show();

			// Number Formatters
			var noDecimalFormat 	= d3.format(",.0f");
			var oneDecimalFormat	= d3.format(",.1f");
			var twoDecimalFormat	= d3.format(",.2f");
			var largeNumbersFormat	= d3.format(".4s");

			var oneDecimalPercentageFormat = function(d) {
				return oneDecimalFormat(d) + "%";
			};
			var currencyFormat = function(d) {
			    return currency + twoDecimalFormat(d);
			};
			var currencyNoDecimalFormat = function(d) {
			    return currency + noDecimalFormat(d);
			};

			var similar_margin = 5; // percent

			var results_html = {
				a_results_html : '',
				b_results_html : ''
			};

			function getChartResult(chartSelector, icon, format, messages_key, module) {

				tmp = graphs[chartSelector];
				tmp[0].label	= r.data.segments[0].name.substring(0, 16);
				tmp[1].label	= r.data.segments[1].name.substring(0, 16);
				//console.log(tmp);
				module.initBarChart(module.selector + " " + chartSelector, [{"values": tmp}], "", format);

				// calculate winner/tie messages

				// cast to float first so that our maths are legit
				var valA		= parseFloat(tmp[0].value);
				var valB 		= parseFloat(tmp[1].value);
				var difference	= parseFloat(Math.abs(((valA - valB) / valB) * 100));
				//console.log(chartSelector + ' difference = ' + difference + '%');

				if (difference <= similar_margin) { // close enough to be similar
					results_html.a_results_html += module.generateResultsRow(icon, module.config.tieMessages[messages_key]);
					results_html.b_results_html += module.generateResultsRow(icon, module.config.tieMessages[messages_key]);
				} else if (valA > valB) {
					results_html.a_results_html += module.generateResultsRow(icon, module.config.winnerMessages[messages_key]);
				} else {
					results_html.b_results_html += module.generateResultsRow(icon, module.config.winnerMessages[messages_key]);
				}
			}

			getChartResult('#likelihoodToStayChart', 'icon-heart', oneDecimalPercentageFormat, 'loyalty', this);
			getChartResult('#totalAccountsChart', 'icon-user-group', noDecimalFormat, 'size', this);
			getChartResult('#activityChart', 'icon-pulse', largeNumbersFormat, 'activity', this);
			getChartResult('#averageMRRChart', 'icon-arrow-circle-o-up', currencyFormat, 'mrr', this);
			getChartResult('#toDateRevenueChart', 'icon-money-bomb', currencyNoDecimalFormat, 'money', this);
			getChartResult('#futureRevenueChart', 'icon-money-bag', currencyNoDecimalFormat, 'revenue', this);
			getChartResult('#lifespanChart', 'icon-calendar', oneDecimalFormat, 'subscription', this);
			/*getChartResult('#churnRateChart', 'icon-light-bulb', oneDecimalPercentageFormat, 'churn', this);*/

			$('.segment-a-result').html(results_html.a_results_html);
			$('.segment-b-result').html(results_html.b_results_html);

			$(this.config.spinnerContainerSelector).hide();
		},
		generateResultsRow: function(icon, label) {
			return '<li class="result_row"><span class="'+icon+' mrs"></span>'+label+'</li>';
		},
		cohortLegend: function(i, cohort, totalAccounts, maxCount) {
			var graphSelector = 'cohortChart-' + i;
				self = this;

			// Hacked together html... should use handlebars or something like that in the future
			var toAppend = '<div class="col-md-6 col-sm-6">';
				toAppend += 	cohort.name + ": " + spUtils.numberFormat(cohort.count) + " accounts";
				toAppend += '	<div class="nchart small ' + graphSelector + '"><svg></svg></div>';
				toAppend += '	<br/>';
				toAppend += '</div>';

			$(this.config.labelsSelector).append(toAppend);

			width = 150;
			height = 150;

			var r = 75 * (1 - ((maxCount- parseInt(cohort.count)) / maxCount));

			var svgContainer = d3.select("." + graphSelector + " svg")
				.attr("width", width)
				.attr("height", height);

			var circle = svgContainer.append("circle")
				.attr("cx", '50%')
				.attr("cy", '50%')
				.attr("r", r)
				.attr("fill", this.config.colors[i]);
		},
		initBarChart: function(selector, data, title, formatFn) {
			var self = this;

			nv.addGraph(function() {
				var chart = nv.models.discreteBarChart()
					.x(function(d) { return d.label ? d.label : d.name; })
					.y(function(d) {
						return d.value ? parseFloat(d.value) : d.count;
					})
					.staggerLabels(false)
					.tooltips(false)
					.showValues(true)
					.showXAxis(true)
					.transitionDuration(self.config.graphTransitionDuration)
					.margin(self.config.margin)
					.color(self.config.colors);

				chart.yAxis.tickFormat(formatFn);
				chart.valueFormat(formatFn);

				d3.select(selector+ " svg").style('width', '100%').style('height','250px')
					.append("text")
					.attr("x", "50%")
					.attr("y", "15px")
					.style('font-size', '15px')
					.attr("text-anchor", "middle")
					.text(title);

				d3.select(selector + " svg")
					.datum(data)
					.call(chart);

				// add the deltas
				var column_labels = d3.selectAll(selector+ " svg .nv-x .tick");
				// Add some space on the chart labels
				column_labels.selectAll('text').attr('dy', '1.1em');

				// first column delta
				d3.select(column_labels[0].shift())
					.data(data)
					.append('text')
					.attr('y', '20')
					.attr('dy', '.71em')
					.attr('transform', 'translate(0,5)')
					.attr('x', '0')
					.attr('style', 'text-anchor: middle; font-size: 12px; fill: #91a0ad')
					.text(function(d){
						return d.values[0].change;
					});

				// second column delta
				column_labels
					.data(data)
					.append('text')
					.attr('y', '20')
					.attr('dy', '.71em')
					.attr('transform', 'translate(0,5)')
					.attr('x', '0')
					.attr('style', 'text-anchor: middle; font-size: 12px; fill: #91a0ad')
					.text(function(d){
						return d.values[1].change;
					});

				nv.utils.windowResize(chart.update);

				return chart;
			});
		}
	},

	// New Charts
	// Rank History Graph
	segmentRanksChart: {
		selector     	: '.initRankChart',
		containerWidth  : 0,
		thedata      	: null,
		svgcontainer 	: null,
		dataByWeek   	: null,
		dataBySegment   : null,
		linesHolder  	: null,
		selectedSegment : [],
		selectedWeek 	: null,
		latestWeek   	: null,
		currentRank		: 'size',
		keyPressSet		: false,
		// TODO: Add more colors here
		colors 			: [ '#89b656', '#5fbcc8', '#c93f5b', '#e4c018', '#e09bec', '#37414a'],
		// The config object is common, maybe should not be in the future
		config 			: {
			clearHighlightedBtnSelector: '.js-clear-highlighted',
			loaderSelector: '.js-spinner-container',
			aspectRatio     : 1,
			xOffset      	: -20, //x-axis adjustment
			yOffset      	: -20, //y-axis adjustment
			xPadding     	: 105, //Graph padding
			yPadding     	: 90,  //Graph padding
			weekWidth    	: 25,  //Space between lines on grid
			weekHeight   	: 25,
			numSegments  	: 25, //# of segments
			numWeeks	 	: 19,
			labelCharLimit	: 25,
			margin: {
				right : 0,
				left  : 0,
				top   : 0,
				bottom: 0
			}
		},
		dataSourceLookUp: {
			size    	: '/api/savedsearches/rankingsgraph?stat=population',
			revenue 	: '/api/savedsearches/rankingsgraph?stat=future_revenue',
			activity 	: '/api/savedsearches/rankingsgraph?stat=activity',
			loyalty	    : '/api/savedsearches/rankingsgraph?stat=loyalty'
		},
		defaultParams: function(){
	        return {
	        	numsegments: 25,
	        	numweeks   : 19,
	        	data       : 'size'
	        };
		},
		init: function(idx, ele, params){
		    this.containerWidth = ele.parent().width();
		    this.svgcontainer = d3.select(ele.find('svg')[0]);

		    if(params.numsegments){
			    this.config.numSegments = parseInt(params.numsegments, 10);
		    }
		    this.addEvents(ele);
		    this.fetchData();
		},
		addEvents: function(ele){
			var _this = this;

			$(ele)
				.on('click', this.config.clearHighlightedBtnSelector, $.proxy(this.handleClearHighlighted, this));

			// Keypress needs to be appended to the document, so it can't be set for each instance of the graph
			if(!this.keyPressSet){
				$(document).on('keydown', $.proxy(this.handleKeyPressed, this));
				this.keyPressSet = true;
			}

			$(document)
				.on('click', '.rank-chart-hd .btn', $.proxy(this.handleChangeRank, this));

			//Callback triggered by browser
			// window.onresize = function() {
			// 	var idx = _this.getCurrentGraphIdx();
			// 	_this.drawChartUI(idx);
			// };
		},
		addHighlightedSegment: function(segmentName){
			// If already there, we remove it
			if( $.inArray(segmentName, this.selectedSegment) > -1 ){
				this.selectedSegment.splice($.inArray(segmentName, this.selectedSegment) , 1);
			}else{
				if(!this.selectedSegment){
					this.selectedSegment = [];
				}
				this.selectedSegment.push(segmentName);
			}
		},
		buildEllipsis: function(string){
			if(string.length < this.config.labelCharLimit){
				return string;
			}else{
				return string.substr(0, this.config.labelCharLimit) + '...';
			}
		},
		buildGrid: function(){
			this.drawWeeksAndGridLines();
			this.drawRankLabelsAndGridLines();
			this.linesHolder = this.svgcontainer.append('g').attr('id','linesHolder').attr('transform','translate(0,0)');
			this.drawSegmentNames();
		},
		changeRank: function(el){
			var $el = $(el),
				rank = $el.attr('data-rank');

			this.clearActiveRank();
			$el.addClass('is-active');

			if(rank !== this.currentRank){
				this.currentRank = rank;
				this.fetchData();

				$(document).trigger('SP:event', {category: 'UI-button', action: 'click', label: 'Segments Ranking Graph - Criteria: ' + rank});
			}
		},
		clearActiveRank: function(){
			$('.rank-chart-hd .btn').removeClass('is-active');
		},
		drawChartUI: function(){
			var config = this.config,
				width = this.containerWidth - config.margin.left - config.margin.right,
			    // height = Math.ceil( (width * config.aspectRatio) - config.margin.top - config.margin.bottom);
			    height = Math.ceil( ( (parseInt(this.config.numSegments, 10) + 2) * this.config.weekHeight) + 105 - config.margin.top - config.margin.bottom);

			this.hideLoader();
			this.svgcontainer.selectAll("*").remove();
			this.svgcontainer.attr('width', width + 'px');
			this.svgcontainer.attr('height', height + 'px');
		    this.buildGrid();
		    this.setData();
		    this.setWeek(this.selectedWeek);
		},
		// draws grid lines for each visible week
		drawWeeksAndGridLines: function(){
			var self = this;

			// Weeks Label
			this.svgcontainer.append("text")
			       .attr('class','grayLabels')
			       .attr('x', this.config.xOffset + this.config.xPadding - 5)
			       .attr('y', this.config.yOffset + 52)
			       .style('text-anchor','end')
			       .text("Week:");

			for (var i=1; i<= this.latestWeek; i++) {
				var g = this.svgcontainer.append('g').attr('class','weekItemWrapper');

				g.append("rect")
			       	.attr('class','weekRects')
			       	.attr('x', this.config.xOffset + this.config.xPadding + (i*this.config.weekWidth) - this.config.weekWidth/2)
			       	.attr('y', this.config.yOffset + 31)
			        .attr("rx", 6)
			        .attr("ry", 6)
			        .attr("width", this.config.weekWidth)
			        .attr("height", this.config.weekHeight + 5)
			        .attr("num",i)
			        .on('click',function(){
			            self.setWeek(d3.select(this).attr('num'));
			        })
			        .on('mouseover',function(){
			            self.setWeek(d3.select(this).attr('num'));
			        });

			    g.append("text")
			       .attr('class','weekLabels')
			       .attr('x', this.config.xOffset + this.config.xPadding + (i*this.config.weekWidth))
			       .attr('y', this.config.yOffset + 52)
			       .style('text-anchor', function(){
			       		if(i == self.latestWeek){
			       			return 'left';
			       		}else{
			       			return 'middle';
			       		}
			       })
			       .text(i);

			    this.svgcontainer.append("line")
			       .attr('class','gridLines')
			       .attr('x1', this.config.xOffset + this.config.xPadding + (i*this.config.weekWidth))
			       .attr('y1', this.config.yOffset + this.config.yPadding)
			       .attr('x2', this.config.xOffset + this.config.xPadding + (i*this.config.weekWidth))
			       .attr('y2', this.config.yOffset + ( (parseInt(this.config.numSegments, 10) + 2) * this.config.weekHeight) + (105) );
			}
			// Adding Current Label
			$('.weekItemWrapper .weekRects').last().attr("width", 85);
			$('.weekItemWrapper .weekLabels').last().text('Current');
		},
		drawRankLabelsAndGridLines: function(){
			var svgcontainer = this.svgcontainer;

		    svgcontainer.append("text")
		       .attr('class','rankLabels')
		       .attr('x', this.config.xOffset + this.config.xPadding - 5)
		       .attr('y', this.config.yOffset + this.config.yPadding + 5)
		       .style('text-anchor','end')
		       .text("Rank");

			for (var i=1; i<=this.config.numSegments; i++) {
			    svgcontainer.append("text")
			       .attr('class','rankLabels')
			       .attr('x', this.config.xOffset + this.config.xPadding - 5)
			       .attr('y', this.config.yOffset + this.config.yPadding + (i*this.config.weekHeight) + 5)
			       .style('text-anchor','end')
			       .text("#"+i);

			    svgcontainer.append("line")
			       .attr('class','gridLines')
			       .attr('x1', this.config.xOffset + this.config.xPadding)
			       .attr('y1', this.config.yOffset + this.config.yPadding + (i*this.config.weekHeight))
			       .attr('x2', this.config.xOffset + 650)
			       .attr('y2', this.config.yOffset + this.config.yPadding + (i*this.config.weekHeight));
			}

			svgcontainer.append("text")
				.attr('class','rankLabels small')
				.attr('x', this.config.xOffset + this.config.xPadding - 5)
				.attr('y', this.config.yOffset + this.config.yPadding + ((this.config.numSegments + 2) *this.config.weekHeight) + 5)
				.style('text-anchor','end')
				.text("Unranked");

			svgcontainer.append("line")
				.attr('class','gridLines')
				.attr('x1', this.config.xOffset + this.config.xPadding)
				.attr('y1', this.config.yOffset + this.config.yPadding + ((this.config.numSegments + 2)*this.config.weekHeight))
				.attr('x2', this.config.xOffset + 650)
				.attr('y2', this.config.yOffset + this.config.yPadding + ((this.config.numSegments + 2)*this.config.weekHeight));
		},
		drawSegmentNames: function(){
			var self = this;

			this.namesHolder = this.svgcontainer.append('g').attr('id','namesHolder').attr('transform','translate(200,' + (this.config.yPadding - 10) + ')');
			this.namesHolder.append("rect")
			    .attr('x', this.config.xOffset + 0)
			    .attr('y', this.config.yOffset + 0)
			    .attr("width", 1000)
			    .attr("height", 750)
			    .style("fill", "#fff");

			for (var i=1; i<= this.config.numSegments; i++) {
			    this.namesHolder.append("text")
				    .attr('class','teamLabels')
				    .attr('x', this.config.xOffset + 10)
				    .attr('y', this.config.yOffset + 10 + (i*this.config.weekHeight) + 5)
				    .attr('rk',i)
				    .style('text-anchor','start')
				    .text("a")
				    .on('mouseover',function(d){
				        self.lightup(d3.select(this).attr('tm') );
				    })
				    .on('mouseout',function(d){
				        self.lightup();
				    })
				    .on('click',function(d){
				    	self.addHighlightedSegment(d3.select(this).attr('tm'));
				        self.lightup();
				    });
			}
		},
		fetchData: function(){
			var dataSourceURL = this.dataSourceLookUp[this.currentRank];

			if(typeof dataSourceURL === "string"){
				this.showLoader();
				SP.post(dataSourceURL, {}, $.proxy(this.handleDataReceived, this));
			}
		},
		handleChangeRank: function(e){
			e.preventDefault();
			this.changeRank(e.target);
		},
		handleClearHighlighted: function(e){
			e.preventDefault();
			this.removeAllSegmentHighlights();
			this.selectedSegment = [];
		},
		handleDataReceived: function(result){
		    this.thedata = result.data.graph_data;
		    this.selectedWeek = this.thedata[this.thedata.length-1].week;
		    this.latestWeek = this.thedata[this.thedata.length-1].week;
		    // Selecting a random segment
		    this.selectedSegment = [];
		    this.addHighlightedSegment(this.thedata[1].team);

		    // Keep on building graph
		    this.drawChartUI();
		},
		handleKeyPressed: function(e){
			if(e.which == 39 || e.which === 37 ){
				this.setNewWeekFromKeyboard(e.which);
			}
		},
		highlightSelectedSegments: function(){
			var self = this;

	    	$.each(this.selectedSegment, function(i, value){
		    	self.highlightSegment(value, i);
	    	});
		},
		highlightSegment: function(segmentName, color){
			var svgcontainer = this.svgcontainer;

		    svgcontainer.selectAll('[pathtm="' + segmentName + '"]').classed('selectPath',true).style({stroke: this.colors[color]});
		    svgcontainer.selectAll('[circtm="' + segmentName + '"]').classed('selectDot',true).style({fill: this.colors[color]});
		    svgcontainer.selectAll('[tm="' + segmentName + '"]').classed('selectTeam',true).style({fill: this.colors[color]});
		},
		lightup: function(segment){
			var hoverSegment = segment || "";

		    this.removeAllSegmentHighlights();

		    if(hoverSegment.length){
		    	this.highlightSegment(hoverSegment, this.selectedSegment.length);
		    }
	    	this.highlightSelectedSegments();
		},
		makeDots: function(thearray){
		    var scaleX = d3.scale.linear().domain([1, this.config.numWeeks + 1]).range([this.config.xOffset + this.config.xPadding + this.config.weekWidth, this.config.xOffset + this.config.xPadding + (this.config.weekWidth * (this.config.numWeeks + 1) )]).clamp(true),
		    	scaleY = d3.scale.linear().domain([1, this.config.numSegments + 2]).range([this.config.yOffset + this.config.yPadding + this.config.weekHeight, this.config.yOffset + this.config.yPadding + (this.config.weekHeight * (this.config.numSegments + 2))]).clamp(true),
		    	lineData = [], i = 1, thepos, theweek;

		    for (; i<= this.selectedWeek; i++) {
		        thepos = this.config.numSegments + 2;
		        theweek = i;
		        for (var j=0; j< thearray.length; j++) {
		            if(thearray[j].week == i){
		                thepos = thearray[j].rank;
		            }
		        }
		        lineData.push({x: scaleX( theweek ), y: scaleY( thepos )});
		    }
		    lineData.push({x: scaleX( theweek + 1 ), y: scaleY( thepos )});

		    this.linesHolder.append("path")
			    .attr('class','regPath')
			    .attr("d", this.lineFunction(lineData))
			    .attr('pathtm',thearray[0].team)
			    .attr("fill", "none");

		    this.linesHolder.append('circle').attr('class','regDot')
			    .attr('cx',scaleX(this.selectedWeek))
			    .attr('cy',scaleY(thepos))
			    .attr('circtm',thearray[0].team)
			    .attr('r',4);
		},
		removeAllSegmentHighlights: function(){
			var svgcontainer = this.svgcontainer;

		    svgcontainer.selectAll('.regPath').classed('selectPath',false).style({ stroke: null });
		    svgcontainer.selectAll('.regDot').classed('selectDot',false).style({ fill: null });
		    svgcontainer.selectAll('.teamLabels').classed('selectTeam',false).style({ fill: null });
		},
		// Not sure about this method
		setData: function(){
			var self = this,
				tempdata = d3.nest()
				    .key(function(d) { return d.week; })
				    .entries(this.thedata);

			$.each(tempdata, function(index) {
				if(!self.dataByWeek){
					self.dataByWeek = [];
				}
			    self.dataByWeek['week' + tempdata[index].key] = tempdata[index];
			});

			tempdata = d3.nest()
			    .key(function(d) { return d.team; })
			    .entries(this.thedata);

			$.each(tempdata, function(index) {
				if(!self.dataBySegment){
					self.dataBySegment = [];
				}
			    self.dataBySegment[tempdata[index].key] = tempdata[index];
			});
		},
		setNewWeekFromKeyboard: function(key){
		    if(key == 39){
		        this.setWeek(this.selectedWeek + 1);
		    } else if(key == 37){
		        this.setWeek(this.selectedWeek - 1);
		    }
		},
		setWeek: function(week){
			var self = this,
				svgcontainer = this.svgcontainer,
				thisWeekData, segment, indexPosition;

			this.selectedWeek = parseInt(week, 10);

			if(this.selectedWeek < 1){
			    this.selectedWeek = 1;
			} else if(this.selectedWeek > this.latestWeek){
			    this.selectedWeek = this.latestWeek;
			}

			svgcontainer.selectAll('.regDot').remove();
			svgcontainer.selectAll('.regPath').remove();

			svgcontainer.selectAll('.weekRects').classed('selectweek',false);
			svgcontainer.selectAll('.weekRects[num="' + this.selectedWeek + '"]').classed('selectweek',true);

			thisWeekData = this.dataByWeek["week" + this.selectedWeek];
			svgcontainer.select('#namesHolder').transition().attr('transform','translate(' + (this.config.xPadding + (this.selectedWeek * this.config.weekWidth) + 10 ) + ',' + (this.config.yPadding - 10) + ')');
			svgcontainer.selectAll('.teamLabels').text("").attr('tm',"");

			$.each(thisWeekData.values, function(index) {
			    segment = thisWeekData.values[index].team;
			    indexPosition = thisWeekData.values[index].rank;

			    if(index > 0){
			        // console.log(thisWeekData.values[index].rank, thisWeekData.values[index-1].rank);
			        if( thisWeekData.values[index].rank == thisWeekData.values[index-1].rank ){
			            indexPosition = thisWeekData.values[index].rank+1;
			        }
			    }

			    svgcontainer.selectAll('[rk="' + indexPosition + '"]')
			        .text( self.buildEllipsis(thisWeekData.values[index].team))
			        .attr('tm', segment)
			        .append("svg:title") // adding a tooltip with the whole name
			        .text(segment);

			    self.makeDots(self.dataBySegment[segment].values);
			});

			if(this.selectedSegment.length){
			    this.lightup();
			}
		},
		showLoader: function(){
			$(this.config.loaderSelector).fadeIn('slow');
		},
		hideLoader: function(){
			$(this.config.loaderSelector).fadeOut('slow');
		},
		lineFunction: d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("linear")
	},
	// Chad's design
	areaGraph: {
		selector: '.initAreaGraph',
		data: [],
		dataPoints: {},
		config: {
			aspectWidth: 13,
			aspectHeight: 5,
			margin : {
				top   : 60,
				bottom: 80,
				right : 0,
				left  : 0
			},
			timeframeBoxSelector: '#timeframe',
			numVerticalTicks: 5,
			numHorizontalTicks: 5,
			verticalTicksLabelOffset: -50,
			scaleTextColor	: "#4a5864",
			scaleTitleColor	: "#37414a",
			titleXOffset	: 80,
			graphTitle: "Activity Radar",
			legendXOffset   : 220,
			legendYOffset   : -45,
			legendWidth     : 100,
			legendSquareSize: 16,
			overlayWidth    : 20,
			tooltipXOffset       : 20,
			tooltipYOffset       : -20,
			tooltipWidth         : 100,
			tooltipHeight        : 120,
			tooltipTextColor     : '#c0c6cc',
			tooltipBodyYOffset   : 25,
			tooltipBodyTextHeight: 18,
			pointsSize            : 1.5,
			pointsAlertSize       : 4,
			pointsColor           : '#c0c6cc',
			pointsAlertColor      : '#f0737b',
			pointsBorderColor     : "#ffffff",
			pointsImprovementColor: '#53bd99',
			dataURL		: '/static/json/areaGraphData.json',
			colors 		: [ '#9999d1', '#6dace3', '#6dcad1', '#53bd99', '#f0737b']
		},
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			this.$el = ele;
			this.timeFrame = params.timeframe || "week";

			SP.post(this.config.dataURL, {}, $.proxy(this.handleReceivedData, this));
			this.addEvents();
		},
		addEvents: function(){
			var _this = this;

			$(document).on('change', this.config.timeframeBoxSelector, $.proxy(this.handleNewTimeframe, this));

			//Callback triggered by browser
			window.onresize = function() {
				_this.drawGraph();
			};
		},
		addMouseEvents: function(svg, config){
			var _this = this;

		    // Declare mouse related Behaviours
		    svg
				.on("mouseover", function() { _this.overlay.style("display", null); })
			    .on("mouseout", function() {
			    	_this.overlay.style("display", "none");

			    	_this.tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
			    })
			    .on("mousemove", function(){
			    	var coordinates = d3.mouse(this),
			    		mouseX = coordinates[0],
			    		invertedx = _this.xScale.invert(mouseX),
			    		mouseY = coordinates[1],
						dps = [];

			    	// From http://codepen.io/ashokgowtham/pen/LpnHe?editors=001
			    	var keys = _.keys(_this.dataPoints).sort(function(a, b){ return a-b; });
					var epsilon = (keys[1]-keys[0])/2;
					var nearest = _.find(keys, function(a) {
						return Math.abs(a - mouseX) <= epsilon;
					});

					if(nearest){
						dps = _this.dataPoints[nearest];

				    	_this.overlay.attr("transform", "translate(" + (nearest - config.overlayWidth/2) + ", 0)");
		                _this.tooltip.attr("transform", "translate(" + (nearest + config.tooltipXOffset) + "," + (mouseY + config.tooltipYOffset) + ")");
				    	_this.tooltip.transition()
		                    .duration(200)
		                    .style("opacity", 0.9);

		                _this.tooltip.select(".tooltip-title")
		                	.text(_this.xTickFormat(invertedx));

		                _this.updateTooltipBodyContent(dps, _this, config);
					}
			    });
		},
		buildAxis: function(width, height, timeframe){
			var formatAsKilo = d3.format("s");
			var _this = this;

			this.xTickFormat = timeframe === "week" ? d3.time.format('%H:%M %p') : d3.time.format('%b');

		    this.xAxis = d3.svg.axis()
		        .scale(this.xScale)
	            .ticks(this.config.numHorizontalTicks)
		        .orient("bottom")
				.tickSize(-(height), 0, 0)
				.tickPadding([10])
		        .tickFormat(function(d,i) {
	                return _this.xTickFormat(d);
		        });

	        this.yAxis = d3.svg.axis()
	            .scale(this.yScale)
	            .ticks(this.config.numVerticalTicks)
	            .tickFormat(formatAsKilo)
				.tickSize(-(width), 0, 0)
				.outerTickSize([50])
				.tickPadding([4])
	            .orient("right");
	    },
		buildLayers: function(){
			var stack = d3.layout.stack()
			    .offset("zero")
			    .values(function(d) { return d.values; })
			    .x(function(d) { return d.date; })
			    .y(function(d) { return d.events; });

	        var nest = d3.nest()
		       .key(function(d) { return d.category; });

		    this.layers = stack(nest.entries(this.data));
		},
		buildScales: function(width, height){
			this.xScale = d3.time.scale()
			    .range([0, width]);

		    this.yScale = d3.scale.linear()
		        .range([height, 0])
		        .nice([this.config.numVerticalTicks + 1]);

		    this.colorScale = d3.scale.ordinal()
		          .range(this.config.colors);
		},
	    drawAxis: function(width, height, svg){
	    	var config = this.config;

	        // Adding X Axis
	        svg.append("g")
	    		.attr("class", "x axis")
	    		.attr("transform", "translate(0," + height + ")")
	    		.style("fill", config.scaleTextColor)
	    		.call(this.xAxis);

	        // Adding Y Axis
	    	svg.append("g")
	    		.attr("class", "y axis")
	    		.style("fill", config.scaleTextColor)
	    		.attr("transform", "translate(" + width + ", 0)")
	    		.call(this.yAxis);

	    	// Moving the YAxis tick labels to the right side
	    	d3.selectAll('.y.axis .tick text').attr("transform", "translate(" + config.verticalTicksLabelOffset + ", -10)");
	    },
		drawGraph: function(){
			var _this = this,
				config = this.config,
				width = this.$el.width() - config.margin.left - config.margin.right,
			    height = Math.ceil((width * config.aspectHeight) / config.aspectWidth) - config.margin.top - config.margin.bottom;

			this.resetGraph();
			this.buildScales(width, height);
		    this.buildAxis(width, height, this.timeFrame);

		    var svg = d3.select(this.$el[0]).append('svg')
		        .attr("width", width + config.margin.left + config.margin.right)
		        .attr("height", height + config.margin.top + config.margin.bottom)
		      .append("g")
		        .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");

		    this.buildLayers();
		    this.setScalesDomain();
		    this.drawStackedAreas(svg);
		    this.drawDataReferencePoints(svg, config);
		    this.addMouseEvents(svg, config);
		    this.drawAxis(width, height, svg);
			this.drawTitle(svg);
			this.drawGraphLegend(width, height, svg);
			this.drawHoverOverlay(width, height, svg);
			this.drawTooltip(svg);
		},
		drawGraphLegend: function(width, height, svg){
			var _this = this,
				config = this.config,
				legendContainer = svg.append("g")
					.attr("class", "legend-container"),
				legend = legendContainer.selectAll(".legend")
				    .data(this.layers)
				    .enter().append("g")
				    .attr("class", "legend")
				    // .attr("width", config.legendWidth)
				    .attr("transform", function (d, i) {
				    	return "translate(" + (config.legendXOffset + i * config.legendWidth) + "," + (config.legendYOffset) + ")";
					});

			legend.append("rect")
			    .attr("width", config.legendSquareSize)
			    .attr("height", config.legendSquareSize)
			    .style("fill", function(d, i) { return _this.colorScale(i); });

			legend.append("text")
			    .attr("y", 9)
			    .attr("dy", ".25em")
			    .attr("dx", "20px")
			    .attr("class", "legend-label")
			    .style("text-anchor", "start")
			    .text(function (d) {
			    	return d.key;
				});
		},
		drawHoverOverlay: function(width, height, svg){
		    this.overlay = svg.append('rect')
				.attr('class','overlay')
				.attr('y1',0)
				.attr('y2',height)
				.attr('height', height)
				.attr('width', this.config.overlayWidth)
				.attr('fill','rgba(65, 72, 83, 0.12)')
				.style("display", "none");
		},
		drawDataReferencePoints: function(svg, config){
			var _this = this;

	        // Creates Dots on Data points
	        var points = svg.selectAll('.dots')
	            .data(this.layers)
	          .enter().append("g")
	            .attr("class", "dots")
	            .attr("d", function(d) { return _this.area(d.values); })
	            .attr("clip-path", "url(#clip)");

	        // Processes the points
            points.selectAll('.dot')
                .data(function(d, index){
                    var a = [];
                    d.values.forEach(function(point,i){
                    	if(point.alert){
	                        a.push({'index': index, 'point': point, 'alert': point.alert});
                    	}else{
	                        a.push({'index': index, 'point': point});
                    	}
                    });
                    return a;
                })
                .enter()
                .append('circle')
                .attr('class','dot')
                .attr("r", function(d){
                	if(d.alert){
	                    return config.pointsAlertSize;
                	}else{
	                    return config.pointsSize;
                	}
                })
                .attr('fill', function(d,i){
                	if(d.alert){
                		if( d.alert.type === "alert"){
		                    return config.pointsAlertColor;
                		}else{
		                    return config.pointsImprovementColor;
                		}
                	}else{
	                    return config.pointsColor;
                	}
                })
                .attr("stroke-width", function(d){
                	return d.alert ? "2" : "0";
                })
                .attr("stroke", config.pointsBorderColor)
                .attr("transform", function(d) {
                    var key = _this.xScale(d.point.date);

                    _this.dataPoints[key] = _this.dataPoints[key] || [];
                    _this.dataPoints[key].push(d);
                    return "translate(" + _this.xScale(d.point.date) + "," + _this.yScale(d.point.y+d.point.y0) + ")"; }
                );
		},
		drawStackedAreas: function(svg){
			var _this = this;

			// Creating Area function
			this.area = d3.svg.area()
			    .interpolate("cardinal")
			    .x(function(d) { return _this.xScale(d.date); })
			    .y0(function(d) { return _this.yScale(d.y0); })
			    .y1(function(d) { return _this.yScale(d.y0 + d.y); });

			// Drawing Areas
			svg.selectAll(".layer")
			    .data(this.layers)
			  .enter().append("path")
			    .attr("class", "layer")
			    .attr("d", function(d) {
			    	return _this.area(d.values);
			    })
			    .style("fill", function(d, i) { return _this.colorScale(i); });
		},
		drawTitle: function(svg){
			var config = this.config;

		    svg.append("text")
				.attr("x", config.titleXOffset )
				.attr("y", 0 - (config.margin.top / 2))
				.attr("class", "graph-title")
				.attr("text-anchor", "middle")
				.text(config.graphTitle);
		},
		drawTooltip: function(svg){
			this.tooltip = svg.append("g")
				.attr("class", "tooltip")
				.style("opacity", 0);

			this.tooltip.append("path")
			    .attr("d", rounded_rect(0, 0, this.config.tooltipWidth, this.config.tooltipHeight, 6))
				.attr("fill", "#414853")
				.style("opacity", 1);

			this.tooltip.append("text")
				.attr("x", 30)
				.attr("dy", "1.5em")
				.attr("class", "tooltip-title")
				.style("text-anchor", "left")
				.attr("font-size", "12px")
				.attr("fill", this.config.tooltipTextColor);

			this.tooltip.append("g")
				.attr("x", 30)
				.attr("dy", "2.5em")
				.attr("class", "tooltip-body");

			// x: x-coordinate
			// y: y-coordinate
			// w: width
			// h: height
			// r: corner radius
			function rounded_rect(x, y, w, h, r) {
			    var retval;
			    retval  = "M" + (x + r) + "," + y;
			    retval += "h" + (w - 2*r);
			    retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
			    retval += "v" + (h - 2*r);
			    retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
			    retval += "h" + (2*r - w);
			    retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
			    retval += "v" + (2*r - h);
			    retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
			    retval += "z";
			    return retval;
			}
		},
		handleNewTimeframe: function(e){
			e.preventDefault();
			this.requestNewData(e.target);
		},
		handleReceivedData: function(result){
			this.saveData(result);
			this.drawGraph();
		},
		requestNewData: function(el){
			var newTimeframe = $(el).val();

			if(newTimeframe !== this.currentTimeframe){
				SP.post(this.config.dataURL, {timeframe: newTimeframe}, $.proxy(this.handleReceivedData, this));
				this.currentTimeframe = newTimeframe;
				$(document).trigger("SP:event", {category: 'UI-SelectBox', action: 'select', label: 'Events Histogram Graph - Select Timeframe ' + this.currentTimeframe });
			}
		},
		resetGraph: function(){
			this.$el.find('svg').remove();
			this.dataPoints = {};
		},
		saveData: function(r){
			this.data = r.data;
			this.data.forEach(function(d) {
			 	d.date = d.date;
			  	d.events = +d.events;
			});
		},
	    setScalesDomain: function(){
	    	this.xScale.domain(d3.extent(this.data, function(d) { return d.date; }));
	    	this.yScale.domain([0, d3.max(this.data, function(d) { return d.y0 + d.y; })]);
	    },
		updateTooltipBodyContent: function(currentDataPoints, _this, config){
			var tooltipLegend,
				points = _.pluck(currentDataPoints, "point"),
				count = _.reduce(_.pluck(points, "events"), function(memo, num){
					return memo + num;
				}),
				dataPointsCopy = currentDataPoints.slice(0),
				alert = _.compact(_.pluck(dataPointsCopy, "alert")),
				isAlertTooltip = false;

            if(alert.length){
				dataPointsCopy.unshift({ index: "alert", point: alert[0] });
				isAlertTooltip = true;
			}
			dataPointsCopy.push({ index: dataPointsCopy.length, point: { category: "Total", events: count } });

			// We clean the previous legend
            _this.tooltip.selectAll('.tooltip-legend').remove();

            // Creates the group element that encloses the legend
            tooltipLegend = _this.tooltip.selectAll(".tooltip-body")
            	.remove()
                .data(dataPointsCopy)
                .enter()
                .append("g")
                .attr("class", "tooltip-legend")
                .attr("transform", function (d, i) {
                	return "translate(0," + (config.tooltipBodyYOffset + i * config.tooltipBodyTextHeight) + ")";
            	});

            // The text with the category and data
            tooltipLegend.append("text")
                .attr("x", 10)
                .attr("y", 9)
                .attr("dy", ".25em")
                .text(function (d) {
                	if(d.point.description){
                		return d.point.description;
                	}else{
	                	return d.point.category + ": " + d.point.events;
                	}
            	})
            	.style("text-anchor", "left")
				.attr("font-size", "12px")
				.attr("fill", function(d, i) {
					if(d.point.description){
                		if(d.point.type === "alert"){
                			return config.pointsAlertColor;
                		}else{
                			return config.pointsImprovementColor;
                		}
					}else{
						if(i < (dataPointsCopy.length-1)){
							if(isAlertTooltip){
								return _this.colorScale(i - 1);
							}else{
								return _this.colorScale(i);
							}
						}else{
							return config.tooltipTextColor;
						}
					}
				});
		}
	},
	// D3 Reusable API Chart
	segmentGraph: {
		selector: '.initSegmentGraph',
		defaultCriteria: ['event', 'size'],
		currentCriteria: ['event', 'size'],
		config: {
			containerSelector: '.segment-graph-container',
			timeframeBoxSelector: '.js-segment-graph-timeframe',
			criteriaButtonSelector: '.js-segment-criteria-btn',
			feedbackContainerSerlector: '.js-feedback-msg',
			dataURL: '/api/savedsearches/statsgraph',
			maxConcurrentCriteria: 2,
			minConcurrentCriteria: 1,
			defaultTimeframe: 'all',
			loaderSelector: '.js-spinner-container',
			margin : {
				top   : 30,
				bottom: 30,
				right : 50,
				left  : 50
			},
			aspectHeight: 3,
			aspectWidth: 12,
			feedbackHideDelay: 2000,
			animation: 'linear',
			criteriaLimitMessage: "You need to deselect a criteria first."
		},
		defaultParams: function(){
			return {
				currency: '$'
			};
		},
		init: function(idx, ele, params){
			this.$el = ele;
			this.currentTimeframe = params.timeframe || this.config.defaultTimeframe;
			this.currency = params.currency;

			this.requestNewData();
			this.addEvents();
		},
		addEvents: function(){
			var _this = this;

			$(document)
				.on('click', this.config.criteriaButtonSelector, $.proxy(this.handleCriteriaButton, this))
				.on('change', this.config.timeframeBoxSelector, $.proxy(this.handleNewTimeframe, this));

			//Callback triggered by browser
			window.onresize = function() {
				_this.drawGraph();
			};
		},
		drawGraph: function(){
			var _this  = this,
				config = this.config,
				width  = this.$el.width(),
			    height = Math.ceil((width * config.aspectHeight) / config.aspectWidth);

			this.resetGraph();

			this.lineChart = SP.graphs.lineChart()
 				.width(width).height(height).margin(config.margin)
 				.timeframe(this.currentTimeframe).currency(this.currency).ease(config.animation);

			this.container = d3.select(this.$el[0])
				.datum(this.data)
				.call(this.lineChart);
		},
		handleCriteriaButton: function(e){
			this.toggleCriteria(e.target);
		},
		handleNewTimeframe: function(e){
			e.preventDefault();
			this.requestNewData(e.target);
		},
		handleReceivedData: function(result){
			this.saveData(result);
			this.drawGraph();
		},
		resetGraph: function(){
			this.resetPaneButtons();
			this.$el.find('svg').remove();
			this.hideLoader();
		},
		resetPaneButtons: function(){
			var buttons = $(this.config.criteriaButtonSelector),
				sizeButton = $(this.config.criteriaButtonSelector + '[data-rank="size"]'),
				eventButton = $(this.config.criteriaButtonSelector + '[data-rank="event"]');

			buttons.removeClass('is-active');
			eventButton.addClass('is-active');
			sizeButton.addClass('is-active');
			this.currentCriteria = this.defaultCriteria.slice(0);
		},
		requestNewData: function(el){
			var newTimeframe = el ? $(el).val() : this.currentTimeframe,
				options = {
					timeframe: newTimeframe,
					search_id: SP.appData.search.search_id
				};

			if(el){
				if(newTimeframe !== this.currentTimeframe){
					this.showLoader();
					SP.post(this.config.dataURL, options, $.proxy(this.handleReceivedData, this));
					this.currentTimeframe = newTimeframe;
				}
			}else{
				this.showLoader();
				SP.post(this.config.dataURL, options, $.proxy(this.handleReceivedData, this));
			}
			$(document).trigger("SP:event", {category: 'UI-SelectBox', action: 'select', label: 'Segment Graph - Select Timeframe ' + this.currentTimeframe });
		},
		saveData: function(data){
			this.data = data.data.graph_data;
			//console.log(this.data);
		},
		showLoader: function(){
			$(this.config.loaderSelector).fadeIn('slow');
		},
		hideLoader: function(){
			$(this.config.loaderSelector).fadeOut('slow');
		},
		toggleCriteria: function(el){
			var $btn = $(el),
				criteria = $btn.attr('data-rank'),
				isActive = $btn.hasClass('is-active'),
				feedbackContainer = $(this.config.feedbackContainerSerlector);
			if(criteria){
				if(isActive){
					if(this.currentCriteria.length > this.config.minConcurrentCriteria){
						this.currentCriteria = _.without(this.currentCriteria, criteria);
						this.hideCriteria(criteria);
						$btn.toggleClass('is-active');
					}
				}else{
					if(this.currentCriteria.length < this.config.maxConcurrentCriteria){
						this.currentCriteria.push(criteria);
						this.showCriteria(criteria);
						$btn.toggleClass('is-active');
					}else{
						feedbackContainer.text(this.config.criteriaLimitMessage).show();
						setTimeout(function(){
							feedbackContainer.fadeOut("slow").text("");
						}, this.config.feedbackHideDelay);
					}
				}
			}
		},
		hideCriteria: function(criteria){
			this.lineChart.updateLine(criteria, 'hide');
			$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Segment Graph - Hide Criteria ' + criteria });
		},
		showCriteria: function(criteria){
			this.lineChart.updateLine(criteria, 'show');
			$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Segment Graph - Show Criteria ' + criteria });
		}
	},
	// D3 Reusable API Chart
	eventsGraph: {
		selector: '.initEventsGraph',
		currentTimeframe: '',
		dataManager: null,
		config: {
			margin : {
			    top   : 50,
			    bottom: 50,
			    right : 0,
			    left  : 0
			},
			aspectWidth: 13,
			aspectHeight: 4,
			animation: 'linear',
			loaderSelector: '.js-spinner-container',
			defaultTimeframe: 'all',
			timeframeBoxSelector: '.js-segment-graph-timeframe',
			dataURL		: '/static/json/areaGraphData.json'
		},
		defaultParams: function(){
		    return {};
		},
		init: function(idx, ele, params){
		    this.$el = ele;
		    this.currentTimeframe = params.timeframe || this.config.defaultTimeframe;

		    this.requestNewData();
		    this.addEvents();
		},
		addEvents: function(){
		    var _this = this;

		    $(document)
		        .on('change', this.config.timeframeBoxSelector, $.proxy(this.handleNewTimeframe, this));

		    //Callback triggered by browser
		    window.onresize = function() {
		        _this.drawGraph();
		    };
		},
		drawGraph: function(){
		    var _this  = this,
		        config = this.config,
		        width  = this.$el.width(),
		        height = Math.ceil((width * config.aspectHeight) / config.aspectWidth);

		    this.resetGraph();
		    this.stackedAreaChart = SP.graphs.stackedAreaChartChad()
		        .width(width).height(height).margin(config.margin).title("Event Area Graph")
		        .currency(false).timeframe(this.currentTimeframe).ease(config.animation);

		    this.container = d3.select(this.$el[0])
		        .datum(this.data)
		        .call(this.stackedAreaChart);
		},
		handleNewTimeframe: function(e){
		    e.preventDefault();
		    this.requestNewData(e.target);
		},
		handleReceivedData: function(result){
			this.data = result;
		    this.drawGraph();
		},
		hideLoader: function(){
		    $(this.config.loaderSelector).fadeOut('slow');
		},
		dataCleaningFunction: function(d){
			// Due to timestamp on JS being on miliseconds
			d.date = d.date*1000;
			d.events = +d.events;
		},
		requestNewData: function(el){
		    var newTimeframe = el ? $(el).val() : this.currentTimeframe,
		    	dataPointURL = this.config.dataURL + "?timeframe=" + newTimeframe;

		    this.dataManager = SP.graphs.dataManager();
		    this.dataManager.on('dataError', function(errorMsg){
		    	console.log('error:', errorMsg);
		    });

		    if(el){
		        if(newTimeframe !== this.currentTimeframe){
		            this.showLoader();
		            this.currentTimeframe = newTimeframe;

		            this.dataManager.on('dataReady', $.proxy(this.handleReceivedData, this));
		            this.dataManager.loadJsonData(dataPointURL, this.dataCleaningFunction);
		        }
		    }else{
		        this.showLoader();
		        this.dataManager.on('dataReady', $.proxy(this.handleReceivedData, this));
		        this.dataManager.loadJsonData(dataPointURL, this.dataCleaningFunction);
		    }
		    $(document).trigger("SP:event", {category: 'UI-SelectBox', action: 'select', label: 'Stacked Events Graph - Select Timeframe ' + this.currentTimeframe });
		},
		resetGraph: function(){
		    this.$el.find('svg').remove();
		    this.hideLoader();
		},
		showLoader: function(){
		    $(this.config.loaderSelector).fadeIn('slow');
		},
	},
	// D3 Reusable API Chart
	revenueGraph: {
		selector: '.initRevenueGraph',
		dataManager: null,
		config: {
			// Chads Design
			// margin : {
			//     top   : 50,
			//     bottom: 50,
			//     right : 0,
			//     left  : 0
			// },
			margin : {
			    top   : 80,
			    bottom: 50,
			    right : 20,
			    left  : 60
			},
			legend: {
	            xOffset   : -30,
	            yOffset   : -60,
	            width     : 100,
	            squareSize: 16
	        },
			aspectWidth: 13,
			aspectHeight: 4,
			animation: 'linear',
			loaderSelector: '.js-spinner-container',
			dataURL		: '/static/json/revenueGraphData.json'
		},
		defaultParams: function(){
		    return {
		    	currency: '$'
		    };
		},
		init: function(idx, ele, params){
		    this.$el = ele;
		    this.currency = params.currency;

		    this.requestNewData();
		    this.addEvents();
		},
		addEvents: function(){
		    var _this = this;

		    //Callback triggered by browser
		    window.onresize = function() {
		        _this.drawGraph();
		    };
		},
		drawGraph: function(){
		    var _this  = this,
		        config = this.config,
		        width  = this.$el.width() - 40,
		        height = Math.ceil((width * config.aspectHeight) / config.aspectWidth);

		    this.resetGraph();
		    this.stackedAreaChart = SP.graphs.stackedAreaChart()
		        .width(width).height(height).margin(config.margin)
		        .colors(['#de516e', '#f6d020', '#98cb60', '#6ad1df'])
		        .title(false).timeframe(false)
		        // .title("All Time Revenue")
		        .legend(config.legend)
		        .currency(this.currency).ease(config.animation);

		    this.container = d3.select(this.$el[0])
		        .datum(this.data)
		        .call(this.stackedAreaChart);
		},
		handleNewTimeframe: function(e){
		    e.preventDefault();
		    this.requestNewData(e.target);
		},
		handleReceivedData: function(result){
			this.data = result;
		    this.drawGraph();
		},
		hideLoader: function(){
		    $(this.config.loaderSelector).fadeOut('slow');
		},
		dataCleaningFunction: function(d){
			// Unix timestamp to JS timestamp
			d.date = d.date*1000;
			d.events = +d.events;
		},
		requestNewData: function(el){
	        this.showLoader();

		    this.dataManager = SP.graphs.dataManager();
		    this.dataManager.on('dataError', function(errorMsg){
		    	SP.log('error:', errorMsg);
		    });
	        this.dataManager.on('dataReady', $.proxy(this.handleReceivedData, this));

	        this.dataManager.loadJsonData(this.config.dataURL, this.dataCleaningFunction);
		},
		resetGraph: function(){
		    this.$el.find('svg').remove();
		    this.hideLoader();
		},
		showLoader: function(){
		    $(this.config.loaderSelector).fadeIn('slow');
		}
	},


	accountsList: {
		searchCb: function(data){
			var data = data.data;

			$('#' + data.tableIndex + '_results').html('(' + spUtils.numberFormat(data.total_results) + ')');

			// just a temporary hack to get keywords value into the summary table params
			SP.modules.app.summaryTable.instance[data.tableIndex].params.keywords = $('#keywords').val();
			SP.modules.app.summaryTable.bindEvents(data.tableIndex);
		},
		preSubmit: function(ele,params,data){
			SP.modules.app.showSearchHelp.closePopup();
			$(SP.modules.app.summaryTable.instance[data.index].params.target_ele).html(SP.modules.app.summaryTable.throbber);
			return true;
		}
	},
	actionsList: {
		searchCb: function(data){
			$('#total_results').html('('+data.data.total_results+')');

			// just a temporary hack to get keywords value into the summary table params
			SP.modules.app.summaryTable.params.keywords = $('#keywords').val();

			SP.modules.app.summaryTable.bindEvents();
		}
	},
	eventViews: {
		selector: '.initEventViews',
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){
			$('#billing').on('click', function(e){
				e.preventDefault();
				$(this).addClass('active');
				$('#action').removeClass('active');
				$('#action_details').hide();
				$('#billing_details').removeClass('hidden').show();

				$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Data Explorer - View Billing'});
			});

			$('#action').on('click', function(e){
				e.preventDefault();
				$(this).addClass('active');
				$('#billing').removeClass('active');
				$('#billing_details').hide();
				$('#action_details').show();

				$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Data Explorer - View Product Usage'});
			});
		}
	},
	// TODO: This smells a lot
	saveSearch: {
		preSubmit: function(ele,params,data){
			$('#saveSearch input[name="search"]').val($('#accountsSearch input[name="keywords"]').val());
			return true;
		},
		searchCb: function(data){
			SP.notify('Success! This search now appears under Saved Searches.', 'success', '#saveSearch', true);

			var label = $('#savedSearchLabel').val();
			var search = $('#keywords').val();
			$('.initSearchPrepopulate').append('<li><a href="#" data="'+search+'"><strong>'+label+'</strong>:<pre>'+search+'</pre></li>');

			setTimeout(function(){
				$('#saveSearchContainer').hide(200);
				$('#saveSearchContainer input').val('');
			}, 5000);
		}
	},
	searchPrepopulate: {
		selector: '.initSearchPrepopulate',
		config: {
			activeClass: 'is-active'
		},
		defaultParams: function(){
			return {
				target_ele: '#keywords'
			};
		},
		init: function(idx, ele, params){
			$(ele).on('click', 'a', $.proxy(this.handleSelectedSearch, this));
			this.params = params;
		},
		handleSelectedSearch: function(e){
			e.preventDefault();
			this.selectSearch(e.target);
		},
		selectSearch: function(el){
			var $el = $(el).closest('a'); //With this line we ensure we grab the 'a' element

			this.cleanActiveSearch();
			$el.addClass(this.config.activeClass);

			if ($el.attr('type') && $el.attr('type') == 'append') {
				$(this.params.target_ele).val($(this.params.target_ele).val() + " " + $el.attr('data'));
			} else {
				$(this.params.target_ele).val($el.attr('data'));
			}
		},
		cleanActiveSearch: function(){
			$(this.selector).find('.' + this.config.activeClass).removeClass(this.config.activeClass);
		}
	},
	actionForm: {
		selector: '.initActionForm',
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){},
		saveCb: function(r){
			SP.notify('Success! Your ' + r.data.action.action_type +' has been saved.', 'success', '#actionFormWrapper', true);
		}
	},
	checkboxAll: {
		selector: '.initCheckboxAll',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			/* This checkbox checks or unchecks all the checkbox with the same class*/
			$(ele).change(function(event) {
				$('input[type="checkbox"].'+$(this).attr('controlClass')).prop('checked', $(this).prop('checked'));
			});
		}
	},
	settingsUi: {
		selector: '.initSettingsUi',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){},
		saveSettingsCb: function(r){
			var self = SP.modules.app.settingsUi;
			$("#password, #password_new, #password_confirm").val("");
			SP.notify('You have successfully updated your account settings.','success',$('.initSettingsUi'));
		}
	},
	accountsContainer: {
		selector: '.initAccountsContainer',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			$(ele).find('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

				var index = $(this).attr('tableIndex');
				var type = $(this).attr('type');
				$('input[name="index"]').val(index);
				$('input[name="type"]').val(type);
				$('form#accountsSearch').attr('target_ele', '.'+index+'-list');
				$('form#saveSearch input[name="search_type"]').val(type);
			});
			this.addEvents();
		},
		addEvents: function(){
			$(document)
				.on('click', "#accountsSearch .initShowSearchHelp", $.proxy(this.handleSeachHelpButton, this))
				.on('click', "#accountsSearch .initShowSaveSearch", $.proxy(this.handleSaveButton, this))
				.on('click', '.nav-tabs a[data-toggle="tab"]', $.proxy(this.handleTabClicked, this));
		},
		handleSeachHelpButton: function(e){
			$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Customer Explorer - Show Search Help'});
		},
		handleSaveButton: function(e){
			$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Customer Explorer - Show Save Segment Form'});
		},
		handleTabClicked: function(e){
			var tabId = $(e.target).closest('a').attr('tableindex');

			$(document).trigger("SP:event", {category: 'UI-tab', action: 'click', label: 'Customer Explorer ' + tabId + " tab"});
		}
	},
	reasonsContainer: {
		selector: '.initReasonsContainer',
		defaultParams: function(){
			return {};
		},
		init: function(idx,ele,params){
			$(ele).find('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

				var index = $(this).attr('tableIndex');
				var filter = $(this).attr('filter');
				$('input[name="index"]').val(index);
				$('input[name="filter"]').val(filter);
				$('form#accountsSearch').attr('target_ele', '.'+index+'-list');

				if ($('#'+index+'SearchActions').length) {
					$('.initSummaryTableActions').hide();
					$('#'+index+'SearchActions').show();
				}
			});
			$(document)
				.on('click', '.nav-tabs a[data-toggle="tab"]', $.proxy(this.handleTabClicked, this));
		},
		handleTabClicked: function(e){
			var tabId = $(e.target).closest('a').attr('tableindex');

			$(document).trigger("SP:event", {category: 'UI-tab', action: 'click', label: 'Reasons Explorer ' + tabId + " tab"});
		}
	},
	customerListAction: {
		selector: '.initCustomerListAction',
		defaultParams: function() {
			return {};
		},
		init: function(idx,ele,params){
			ele.click($.proxy(this.handleCustomerListAction, this));
		},
		handleCustomerListAction: function(event){
			var $link = $(event.target);

			event.preventDefault();

			$('#customersTab').show();
			$('#churn_reason').html($link.find('.searchTabLabel').html());
			$('#churn_type').html($link.attr('type'));
			$('#customers_results').html('');
			$('#customersTabSearch').show();
			$('#customersTab a').tab('show');

			var displayOpts = {
				offset    : 0,
				mode      : $link.attr('mode'),
				reason    : $link.attr('reason'),
				sort_order: $link.attr('mode') === 'positive' ? 'ASC' : 'DESC'
			};

			if ($link.attr('secondaryReason')) {
				displayOpts.secondaryReason = $link.attr('secondaryReason');
				$('input[name="secondaryReason"]').val(displayOpts.secondaryReason);
			} else {
				$('input[name="secondaryReason"]').val('');
			}

			$('input[name="mode"]').val(displayOpts.mode);
			$('input[name="reason"]').val(displayOpts.reason);

			SP.modules.app.summaryTable.display('customers', displayOpts);
		}
	},
	showSaveSearch: {
		selector: '.initShowSaveSearch',
		config: {
			accountsSearchSelector: '#accountsSearch',
			saveSearchContainerSelector: '#saveSearchContainer',
			verticalOffset: -25,
			horizontalOffset: -150,
			fadeDelay: 200
		},
		defaultParams: function() {
			return {};
		},
		init: function(idx,ele,params){
			ele.click($.proxy(this.handleSaveButton, this));
		},
		handleSaveButton: function(event){
			event.preventDefault();
			this.showSaveField();
		},
		showSaveField: function(){
			var left = $(this.config.accountsSearchSelector).offset().left + this.config.horizontalOffset,
				top = $(this.config.accountsSearchSelector).offset().top + this.config.verticalOffset,
				$saveContainer = $(this.config.saveSearchContainerSelector);

			SP.modules.app.showSearchHelp.closePopup();

			if ($saveContainer.is(':visible')) {
				$saveContainer.css('left', left).css('top', top).fadeOut(this.config.fadeDelay);
			} else {
				$saveContainer.css('left', left).css('top', top).fadeIn(this.config.fadeDelay);
			}
		}
	},
	showSearchHelp: {
		selector: '.initShowSearchHelp',
		config: {
			formSelector: '#accountsSearch',
			searchHelpSelector: '#searchHelpContainer',
			verticalOffset: -25,
			horizontalOffset: -150,
			fadeDelay: 200
		},
		defaultParams: function() {
			return {};
		},
		init: function(idx,ele,params){
			ele.click($.proxy(this.handleSearchHelpClicked, this));
			$(this.config.searchHelpSelector).find('.js-close-btn').click($.proxy(this.closePopup, this));
		},
		closePopup: function() {
			var left = $('#accountsSearch').offset().left;
			var top = $('#accountsSearch').offset().top + 45;


			if ($('#searchHelpContainer').is(':visible')) {
				$('#searchHelpContainer').css('left', left).css('top', top).fadeOut(this.config.fadeDelay);
			}
		},
		handleSearchHelpClicked: function(e){
			e.preventDefault();
			var $accountsSearch = $(this.config.formSelector),
				$searchHelpContainer = $(this.config.searchHelpSelector),
				left 	= $accountsSearch.offset().left + this.config.horizontalOffset,
				top 	= $accountsSearch.offset().top + this.config.verticalOffset;

			if ($searchHelpContainer.is(':visible')) {
				$searchHelpContainer.css('left', left).css('top', top).fadeOut(200);
			} else {
				$searchHelpContainer.css('left', left).css('top', top).fadeIn(200);
			}
		}
	},

	// UI Elements
	spinner: {
		selector: '.hasSpinner',
		config: {
			btnClass 	   : 'btn',
			fadeDuration   : 300,
			loaderClass    : 'loader',
			spinnerSelector: '.spinner-container',
			spinnerMarkup  : '<div class="loader">Loading...</div>'
		},
		defaultParams: function() {
			return { };
		},
		init: function(idx,ele,params){
			ele.click($.proxy(this.handleSpinnerLink, this));

			this.addEvents();
		},
		addEvents: function(){
			$(document)
				.on('SP.spinner:off', $.proxy(this.handleSpinnerShutdown, this));
		},
		handleSpinnerLink: function(e){
			this.showCSSSpinner(e.target);
		},
		handleSpinnerShutdown: function(e){
			this.removeAllSpinners();
		},
		showCSSSpinner: function(el){
			var $link     = $(el).closest(this.selector),
				container = $link.find('i') || $link,
				isButton  = $link.hasClass(this.config.btnClass),
				hasLoader = $link.find('.' + this.config.loaderClass).length;

			if(isButton){
				if(!hasLoader){
				// if(!$link.find('.' + this.config.loaderClass).length){
					$link.append(this.config.spinnerMarkup);
				}
			}else{
				container.before($(this.config.spinnerMarkup)).remove();
			}
		},
		removeAllSpinners: function(){
			var duration = this.config.fadeDuration,
				$spinners = $(this.selector + ' .' + this.config.loaderClass);

			if($spinners.length){
				$.each($spinners, function(i, spinner){
					$(spinner).fadeOut(duration, function(){ this.remove(); });
				});
			}
		}
	},
	flyout: {
		selector: '.flyout',
		defaultParams: function() {
			return {};
		},
		init: function(idx,ele,params){
			ele.children(".hoverState").hide();

			ele.mouseover(function(){
				ele.children(".hoverState").show();
			}).mouseout(function(){
				ele.children(".hoverState").hide();
			});

			ele.find(".btn").click(function(){
				var click_action = $(this).attr('click_action');

				if (click_action != undefined) {
					if(typeof click_action != 'function'){
						click_action = eval(click_action);
					}
					if(typeof click_action != 'undefined' && click_action !== null) {
						click_action();
					} else {
						console.log("Coming Soon");
					}
				} else {
					console.log("Coming Soon");
				}
			});
		},
		downloadDashboardPdf: function () {
			$(document).trigger("SP:event", {category: 'UI-button', action: 'click', label: 'Header PDF export'});

			window.open('/pdf');
		}
	},
	tagsEntry:{
		selector: '.initTagsEntry',
		eleByKey: {},
		defaultParams: function() {
			return {
				form_ele: '#profileEditForm',
				tag_type: 'tags'
			};
		},
		init: function(idx,ele,params){
			var self = SP.modules.app.tagsEntry;
			var eleId = $(ele).attr('id');

			$(ele).find('.tagSubmit').click(function() {
				self.addTags(eleId, $(ele).find('.tagValue').val());
				$(this).closest('.form-group').find('[validate]').trigger("blur");
			});

			$(ele).find('.tagValue').keypress(function(e) {
				if (e.keyCode != 13) {
					return true;
				} else {
					self.addTags(eleId, $(ele).find('.tagValue').val());
					return false;
				}
			});

			$(ele).find('.remove-tag').click(function() {
				var tag_value = $(this).find('.value').text();

				// don't let thme remove last product
				if (params.tag_type == 'products') {
					var productCount = $(ele).find('.tag').length;
					if (typeof productCount !== 'undefined' && productCount > 1) {
						self.removeTag(eleId, tag_value);
					} else {
						SP.notify('At least one product or service is required', 'error', '#products_tags_entry');
					}

				} else {
					self.removeTag(eleId, tag_value);
				}

			});

			params.currentIndex = $(ele).find('.tag').length;
			params.ele = ele;

			self.eleByKey[eleId] = {
				ele: ele,
				params: params
			};

			var selected_class = 'selected_'+params.tag_type;
			self.reconcileAppData(selected_class);

		},
		addTags: function(eleId, tag_values) {
			var self 	= this,
				params 	= this.eleByKey[eleId].params;

			$.each(tag_values.split(','), function(key, value) {
				self.addTag(eleId, self.cleanTag(value));
			});
			$(params.ele).find('.tagValue').val('');
		},
		cleanTag: function(tag_value) {
			var new_tag_value = $.trim(tag_value);
			return new_tag_value;
		},
		addReadonlyTag: function(eleId, tag_value) {
			this.addTag(eleId, tag_value, true);
		},
		addTag: function(eleId, tag_value, readonly) {
			if (tag_value != '') {
				var self   = this,
				params = this.eleByKey[eleId].params,
				ele    = this.eleByKey[eleId].ele;

				if ($(ele).find('.tag[value="'+tag_value+'"]').length == 0) {

					if (readonly) {
						$('<button>').attr({
							'tabindex' : -1,
							'type': 'button',
							'class': 'btn btn-info active tag mrs mbs',
							'value': tag_value
						}).html(tag_value).
							appendTo($(ele).find('.tags'));

					} else {
						$('<button>').attr({
							'tabindex' : -1,
							'type': 'button',
							'class': 'btn btn-info active tag mrs mbs',
							'value': tag_value
						}).html( tag_value + '<span class="icon-remove icon-large mls"></span>').
							appendTo($(ele).
							find('.tags')).
							click(function() {
								// don't let thme remove last product
								if (params.tag_type == 'products') {
									var productCount = $(ele).find('.tag').length;
									if (typeof productCount !== 'undefined' && productCount > 1) {
										self.removeTag(eleId, tag_value);
									} else {
										SP.notify('At least one product or service is required', 'error', '#products_tags_entry');
									}

								} else {
									self.removeTag(eleId, tag_value);
								}
							});
					}

					params.currentIndex += 1;
					var selected_class = 'selected_'+params.tag_type;
					$(params.form_ele).find('.tags').append('<input type="hidden" class="'+selected_class+'" name="'+params.tag_type+'['+params.currentIndex+']" value="'+tag_value+'" />');
					self.reconcileAppData(selected_class);

					self.checkForEntries(ele);
				}
			}
		},
		removeTag: function(eleId, tag_value) {
			var self   = this,
			params = this.eleByKey[eleId].params,
			ele    = this.eleByKey[eleId].ele;

			var tagItem = $(ele).find('.tag[value="'+tag_value+'"]');
			var hiddenInput = $(ele).find('input[value="'+tag_value+'"].selected_' +params.tag_type);
			tagItem.remove();
			hiddenInput.remove();

			var selected_class = 'selected_'+params.tag_type;
			self.reconcileAppData(selected_class);
			self.checkForEntries(ele);
		},
		removeAllTags: function(eleId) {
			if (typeof this.eleByKey[eleId] !== 'undefined') {
				var ele = this.eleByKey[eleId].ele;
				var self = this;
				$.each($(ele).find('.tag'), function(index, value) {
					self.removeTag(eleId, $(this).val());
				});
			}

		},
		reconcileAppData: function(selected_class) {
			var tagList = [];
			$.each($('.'+selected_class), function(index, ele) {
				tagList.push($(ele).val());
			});
			SP.appData[selected_class] = tagList;
		},
		checkForEntries: function(ele) {
			// This adds the padding class if there are existing entries
			var tagsContainer = $(ele).find('.tags');

			if (tagsContainer.find('button').length > 0) {
				tagsContainer.addClass('hasEntries');
			} else {
				tagsContainer.removeClass('hasEntries');
			}
		}
	},
	richTextEditor: {
		selector: '.richtext',
		config: {
			scriptURL: '/static/lib_js/ckeditor/ckeditor.js',
			ckeditor: {
				uiColor : '#f9fcfd',
				skin : 'moono',
				extraPlugins : 'confighelper'
			}
		},
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){
			this.loadCKEditorScript();

			// GOTCHA: If you're using .initForm, you will need to add this attr yourself
			ele.parents('form').attr('use_ckeditor', 'true');

			CKEDITOR.replace(ele.attr('name'), this.config.ckeditor);
			CKEDITOR.instances[ele.attr('id')].on('change', function(e) {
				ele.val(e.editor.getData());
			});
		},
		loadCKEditorScript: function(){
			$('head').append('<script src="' + this.config.scriptURL + '"></script>');
		}
	},
	popOvers: {
		selector: '.initPopover',
		config: {
			options: {
				delay: { show: 100, hide: 200 },
				trigger: 'hover'
			}
		},
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){
			ele.popover(this.config.options);
		}
	},
	picturePicker: {
		selector: '.initPicturePicker',
		config: {
			linkSelector: '.picture-img-link',
			selectButtonSelector: '.js-select-image',
			selectedClassName: 'is-selected',
			currentPictureSelector: '.avatar'
		},
		defaultParams: function(){
			return {};
		},
		init: function(idx, ele, params){
			this.addEvents(ele);
		},
		addEvents: function(ele){
			ele.on('click', this.config.linkSelector, $.proxy(this.handlePicturePicked, this));

			$(document).on('click', this.config.selectButtonSelector, $.proxy(this.handleSendSelected, this));
		},
		handlePicturePicked: function(e){
			e.preventDefault();
			this.selectPicture(e.target);
		},
		handleSendSelected: function(e){
			this.changeSegmentPicture();
		},
		selectPicture: function(el){
			this.deselectAllPictures();
			$(el).addClass(this.config.selectedClassName);
		},
		changeSegmentPicture: function(){
			var selected = $(this.selector).find('.' + this.config.selectedClassName),
				newPictureClass;

			if(selected.length){

				var post_data = {search_id:SP.appData.search.search_id, icon_name:selected.attr('data-name')};

				SP.post('/api/savedsearches/saveicon', post_data, $.proxy(this.handleReceivedData, this));
			}
		},
		handleReceivedData: function(data) {
			var selected = $(this.selector).find('.' + this.config.selectedClassName),
				newPictureClass;

			newPictureClass = selected.attr('data-pic');
			this.cleanSegmentClass($(this.config.currentPictureSelector));
			$(this.config.currentPictureSelector).addClass(newPictureClass);
		},
		deselectAllPictures: function(){
			$(this.selector).find(this.config.linkSelector).removeClass(this.config.selectedClassName);
		},
		cleanSegmentClass: function($el){
			var regex = /\bsegment-.+?\b/g;

			$el[0].className = $el[0].className.replace(regex, '');
		}
	},

	// Two states Toggle Switch
	// Note: Every toggle switch needs an unique id
	toggleSwitch: {
		selector: '.initToggleSwitch',
		config: {
			spinnerMarkup  : '<div class="loader">Loading...</div>',
			switchOptions: {
				steps: 2,
				snap: true,
				animationCallback: function(x, y) {
					var $dragdealer = $(this.handle).parents('.dragdealer'),
						$handle = $dragdealer.find('.handle'),
						emailId = $dragdealer.attr('data-emailid'),
						instance = $dragdealer.attr('instancename'),
						currentValue = $handle.data('status') === "on" ? 1 : 0;

					// Hack to avoid initial triggering of the confirmation modal
					if(SP.modules.app.toggleSwitch.config.switchOptions.x !== "1"){
						if(x !== currentValue){
					    	SP.modules.app.toggleSwitch.changeEmailStatus($dragdealer, x, emailId);
						}
					}else{
						$dragdealer.find('.handle').data('status', 'on');
						SP.modules.app.toggleSwitch.resolveSpinner();
						SP.modules.app.toggleSwitch.config.switchOptions.x = null;
					}
				}
			}
		},
		listentingToResolve: false,
		toggleSwitch: {},
		defaultParams: function(){
			return {
				initial_value: null,
				instancename: null
			};
		},
		init: function(idx, ele, params){
			var options = this.config.switchOptions,
				$handle = ele.find('.handle');

			if(params.initial_value !== null){
				$.extend(options, {x: params.initial_value});

				if(params.initial_value === "1"){
					$handle.data("status", "on");
				}else{
					$handle.data("status", "off");
				}
			}
			// Save instances
			this.toggleSwitch[params.instancename] = new Dragdealer(ele.attr('id'), options);

			this.addEvents(ele);
			this.resolveSpinner();
		},
		activateEmail: function(){
			var $handle = $('.is-pending-confirmation'),
				$dragdealer = $handle.parents('.dragdealer'),
				emailId = $dragdealer.attr('data-emailid');

			$handle.removeClass('is-pending-confirmation');
			this.setEmailStatus(emailId, 'on');
		},
		addEvents: function(el){
			if(!this.listentingToResolve){
				$(document).on('SP.toggleSwitch:resolve', $.proxy(this.resolveSpinner, this));
				this.listentingToResolve = true;
			}
			$(document)
				.on('click', '.js-confirm-email-activation', $.proxy(this.handleConfirmActivation, this))
				.on('click', '.js-undo-email-activation', $.proxy(this.handleUndoActivation, this));
		},
		changeEmailStatus: function($switch, value, emailId){
			var $handle = $switch.find('.handle');

			this.showSpinner($handle);
			if(value === 1){
				$handle.addClass('is-pending-confirmation');
				$handle.data('status', 'on');
				this.deactivateAllSwitches();
				this.showConfirmationModal($handle);
			}else{
				$handle.data('status', 'off');
				this.setEmailStatus(emailId, 'off');
			}
		},
		revertHandle: function(){
			var $handle = $('.is-pending-confirmation'),
				instance = $handle.parent().attr('instancename');

			$handle.data('status', 'off');
			if(this.toggleSwitch[instance]){
				this.toggleSwitch[instance].setValue(0);
				$handle.removeClass('is-pending-confirmation');
				this.resolveSpinner();
			}
		},
		handleConfirmActivation: function(e){
			this.activateEmail();
		},
		handleUndoActivation: function(e){
			this.revertHandle();
		},
		setEmailStatus: function(action_id, newStatus){
			if (newStatus === 'on') {
				$(document).trigger('SP.toggleSwitch:on', action_id);
			} else {
				$(document).trigger('SP.toggleSwitch:off', action_id);
			}
		},
		showConfirmationModal: function($handle){
			var emailName = $handle.parents('tr').find('td').eq(0).text();

			$('#email-activation-confirm').find('.js-email-name').text(emailName);
			$('#email-activation-confirm').modal('show');
		},
		deactivateAllSwitches: function(){
			_.each(this.toggleSwitch, function(el){
				el.setValue(0);
			});
		},
		showSpinner: function($handle){
			$handle.html(this.config.spinnerMarkup);
		},
		resolveSpinner: function(){
			var $handles = $('.handle'),
				status;

			_.each($handles, function(handle){
				status = $(handle).data('status');
				if(status === 'on'){
					$(handle).removeClass('btn-info').addClass('btn-success').text('On');
				}else{
					$(handle).removeClass('btn-success').addClass('btn-info').text('Off');
				}
			});
		}
	},
	// delete segment button
	deleteSegment: {
		selector: '.initDeleteSegment',
		config: {
			segmentRemoveSelector		: '.js-delete-segment'
		},
		defaultParams: function() {
			return {};
		},
		init: function(idx, ele, params){
			$(this.config.segmentRemoveSelector).click(function(e) {
				e.preventDefault();
				// delete segment
				var delete_params = {search_id : SP.appData.search.search_id};

				SP.post('/api/savedsearches/delete/', delete_params, function(data) {
					if (data.data.success=='true') {
						window.location.href='/customers/allsegments';
					}
				});
			});
		}
	},
	// Action Tables
	actionTable: {
		selector: '.initActionsTable',
		config: {
			saveActionURL                : '/api/savedsearches/saveaction',
			executeTacticURL             : '/api/tactics/execute',
			emailPreviewURL              : '/api/tactics/preview',
			dateSelector                 : '.on-since',
			emailSendNowLink             : '.js-send-now-link',
			emailConfirmationBtnSelector : '.js-confirm-email',
			emailNoConfirmatedBtnSelector: '.js-undo-email-activation',
			actionConfirmRemoveSelector  : '.js-confirm-notification',
			actionRemoveSelector         : '.js-remove-action',
			emailPreviewLink             : '.js-preview-link',
			addActionToSegmentSelector	 : '.js-add-action'
		},
		isProcessing: false,
		defaultParams: function(){
	        return {
	        	instancename: null
	        };
		},
		init: function(idx, ele, params){
			this.addEvents(params.instancename);
		},
		addAlertTableEvents: function(){
			$(this.config.actionConfirmRemoveSelector).click($.proxy(this.handleRemoveAction, this));
		},
		addEmailTableEvents: function(){
	        $(document)
	        	.on('SP.toggleSwitch:on', $.proxy(this.handleToggleSwitchOn, this))
	        	.on('SP.toggleSwitch:off', $.proxy(this.handleToggleSwitchOff, this))
	            .on('click', this.config.emailConfirmationBtnSelector, $.proxy(this.handleEmailSend, this))
				.on('click', this.config.emailPreviewLink, $.proxy(this.handleEmailPreview, this))
				.on('change', this.config.addActionToSegmentSelector, $.proxy(this.handleAddActionToSegment, this));
		},
		addEvents: function(instance){
		    if(instance === "email"){
		    	this.addEmailTableEvents();
		    }else{
		    	this.addAlertTableEvents();
		    }
		},
		changeEmailStatus: function(action_props, newStatus, cb){
			var params = {
				search_id : SP.appData.search.search_id,
				action_id : action_props.action_id,
				type_id	  : 1,
				save_action: newStatus
			},
			cb_params = {
				action_id: action_props.action_id,
				newStatus: newStatus
			};

			if (!spUtils.isEmpty(action_props.action_name)) {
				cb_params.action_name = action_props.action_name;
			}
			if (!spUtils.isEmpty(action_props.total_count)) {
				cb_params.total_count = action_props.total_count;
			}
			SP.post(this.config.saveActionURL, params, $.proxy(cb, this, cb_params));
		},
		changeSendNowLinkVisibility: function(emailId, newStatus){
			var $sendNowLink = $('.customer-email-' + emailId).find(this.config.emailSendNowLink);

			if($sendNowLink.length){
				if(newStatus === 'visible'){
					$sendNowLink.fadeIn('slow');
				}else{
					$sendNowLink.fadeOut('slow');
				}
			}
		},
		fetchEmailPreview: function(el){
			var action_id = $(el).attr('data-actionid'),
				search_id = SP.appData.search.search_id,
				params = {
					action_id : action_id,
					search_id : search_id
				};

			SP.post(this.config.emailPreviewURL, params, $.proxy(this.handleEmailPreviewSuccess, this, params));
		},
		handleEmailPreviewSuccess: function(params, data){
			var message = data.data.message,
				body = $("<div/>").html(message.html).text();

			$('.modal .throbber-container').fadeOut('slow');

			$('.email-preview-subject').html(message.subject);
			$('.email-preview-body').html(body);
			$('.modal .email-preview-container').fadeIn('slow');

			$('#send-test-email input[name=action_id]').val(params.action_id);
			$('#send-test-email input[name=search_id]').val(params.search_id);

			$(document).trigger("SP:event", {category: 'Action-Email', action: 'previewed', label: 'Segment Card - Preview Email' });
		},
		// Too much coupling here, maybe could be better somehow
		getActiveEmailId: function(){
			return $('.initActionsTable[instancename="email"]').find('.handle.btn-success').parent().attr('data-emailid');
		},
		handleEmailPreview: function(e) {
			e.preventDefault();

			$('.modal .throbber-container').show();
			$('.modal .email-preview-container').hide();

			this.fetchEmailPreview(e.target);
		},
		handleAddActionToSegment: function(e) {
			var action_props = {
				action_id : $(e.target).val(),
				action_name : $(e.target).find('option:selected').text()
			};

			this.changeEmailStatus(action_props, 'add', this.handleAddActionToSegmentSuccess);
		},
		handleAddActionToSegmentSuccess: function(data) {
			$('.js-add-action option[value=' + data.action_id + ']').remove();
			$('.js-add-action').selectpicker('refresh');

			function appendRow(data) {
				//console.log(data);
				// add the new row to the table
				var row_params = {action_id : data.action_id,
									action_name : data.action_name,
									total_count : data.total_count,
									iteration : $('.initActionsTable[instancename=email] tbody tr').length + 1};

				var compiled = _.template($('#actionsTableRowTemplate').html());
				var new_row = $(compiled(row_params)).hide();
				$('.initActionsTable[instancename=email] tbody').append(new_row);
				new_row.show('slow');
				SP.findModules($('.initActionsTable[instancename=email] tbody'));
			}

			var no_results = $('.initActionsTable[instancename=email] tbody tr.no_results');

			if (no_results.length > 0) {
				no_results.fadeOut(300, function(){
					$(this).remove();
					appendRow(data);
				});
			} else {
				appendRow(data);
			}
			$(document).trigger("SP:event", {category: 'Action-Email', action: 'add', label: 'Segment Card - Add Email' });
		},
		handleEmailSend: function(e){
			this.sendActiveEmail();
		},
		handleRemoveAlertSuccess: function() {
			$('#edit-internal-alert').hide();
			$('#internal-alert-row').fadeOut('slow').remove();
			$('#create-alert-row').show();

			$(document).trigger("SP:event", {category: 'Action-InternalAlert', action: 'removed', label: 'Segment Card - Remove Internal Alert' });
		},
		handleRemoveAction: function(e){
			e.preventDefault();
			this.removeAlert(e.target);
		},
		handleToggleSwitchSuccess: function(data, return_data) {
			$(this.config.dateSelector).html('-');
			this.isProcessing = false;
			$(document).trigger('SP.toggleSwitch:resolve');

			if (!spUtils.isEmpty(return_data.data.send_now_count)) {
				$('#email-confirm-count').html(return_data.data.send_now_count);
			}

			if(data.newStatus === 'on'){
				this.hideAllSendNowLinks();
				this.changeSendNowLinkVisibility(data.action_id, 'visible');
				this.updateDateSince(data.action_id);
			}else{
				this.changeSendNowLinkVisibility(data.action_id, 'invisible');
			}
			$(document).trigger("SP:event", {category: 'UI-slider', action: 'swiped', label: 'Segment Card - Email Switched ' + data.newStatus });
		},
		handleToggleSwitchOn: function(e, action_id){
			if(!this.isProcessing){
				this.isProcessing = true;
				var action_props = { action_id:action_id };
				this.changeEmailStatus(action_props, 'on', this.handleToggleSwitchSuccess);
			}
		},
		handleToggleSwitchOff: function(e, action_id){
			if(!this.isProcessing){
				this.isProcessing = true;
				var action_props = {action_id:action_id};
				this.changeEmailStatus(action_props, 'off', this.handleToggleSwitchSuccess);
			}
		},
		hideAllSendNowLinks: function(){
			var $sendNowLinks = $(this.selector).find(this.config.emailSendNowLink);

			if($sendNowLinks.length){
				$sendNowLinks.fadeOut('slow');
			}
		},
		removeAlert: function(el){
			var params = {
				search_id   : SP.appData.search.search_id,
				action_id   : $(this.config.actionRemoveSelector).attr('data-actionid'),
				type_id     : 2,
				save_action : 'remove'
			};

			$.post(this.config.saveActionURL, params, $.proxy(this.handleRemoveAlertSuccess, this));
		},
		// Ajax Call to Send Now email
		sendActiveEmail: function(){
			/* probably better place to get the search id than from the appData, but idk? - CP
			 * Marcos advised we should either get data from the dom or appData but not both,
			 * as we are then coupling ourselves to two locations */
			var executeParams = {
				action_id : this.getActiveEmailId(),
				search_id : SP.appData.search.search_id
			};

			$.post(this.config.executeTacticURL, executeParams, function(ret) {

				/* this is very hacky, but need quick solution - we are going to grab the total emails we are sending
				 * from the value we set in the confirm send modal. Then we will increase the number of emails sent
				 * value in the action row until it matches this number
				 */
				var number_emails_sent = parseInt($('#email-confirm-count').html());
				var total_email_sent = parseInt($('#email-sent-'+executeParams['action_id']).html());

				var total_total = number_emails_sent + total_email_sent;

				$('#email-sent-'+executeParams.action_id).html(total_total);
				$('#email-confirm-count').html('0');

				$(document).trigger("SP:event", {category: 'Action-email', action: 'send now', label: 'Segment Card - Email Send Now' });
			});
		},
		updateDateSince: function(action_id){
			var d = new Date(),
 				onSince = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

			$('.customer-email-' + action_id + ' .on-since').html(onSince);
		}
	}
};

SP.modules.app.init();
