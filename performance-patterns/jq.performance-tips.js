/*
 * From Addy Osmani Video jQuery Performance Tips and Tricks
 */

$.data('.selector', 'dataName', 'dataValue');
// is much faster than
$('.selector').data('dataName', 'dataValue');


$('#id .class').doSomething()
				.doSomethingElse();
// is much faster than
$('#id .class').each(
	function(index){
		$(this).doSomething()
				.doSomethingElse();
	}
)

$parent.children('.child').show();
// is faster than
$parent.find('.child').show();
// although they are not fully interchangeable

$('.someCheckbox').click(function(){
	var checked = this.checked;
	
	$.each(['carModel', 'carYear', 'carMiles'], function(i,key){
		$('#input_' + key).val(checked ? defaultSettings[key] : '');
	});
});
// is dryer than
$('.someCheckbox').click(function(){
	if(this.checked){
		$('#input_carModel').val(defaultSettings.carModel);
		$('#input_carYear').val(defaultSettings.carModel);
	}else{
		$('#input_carModel').val('');
		$('#input_carYear').val('');
	}
});
