/* Two AJAX calls at the same time*/
function buildSomething(){
    var callList1 = $.ajax('json/list1.json', {type: 'GET', cache: false}),
        callList2 = $.ajax('json/list2.json', {type: 'GET', cache: false});

    $.when(callList1, callList2)
        .done(function(list1, list2){
            console.log('Both calls ended!');
            buildSomething(list1[0].data);
            buildSomething(list2[0].data);
        })
        .fail(function(){
            console.log('AJAX Error!! ');
        });
}