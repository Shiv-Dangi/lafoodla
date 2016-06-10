function ajaxRequest(url, data, redirect_url){

  $.ajax({
          url: url,
          data: data,
          type: "POST",
          success: function( response ) {
            response = JSON.parse(response);
            if( response.status_code ==201){
              window.location = redirect_url;
            }
          },
          error: function(data) {
            console.log(data);
          }
        });
}

$(document).ready(function () {
    $("#welcomeModal").modal("show").on('shown.bs.modal', function () {
        $(".modal").css('display', 'block');
    })
});

if ($('#team').is(':visible')){
        $('#step1').addClass("blue-background");
        $('#step1').next('span').addClass("blue-color");
}

//getting the csrf token
var csrf;

csrf = getCookie("csrftoken");


//link app js
var link_app_cart = [];

$('#link_more_apps').click(function(){
  if($('#app_name').val().length !== 0){
  	$('#err_msg').html("");
    var app = {};

  	app['platform'] = $('#platform').val();
  	app['app_name'] = $('#app_name').val();
  	app['app_id'] = $('#app_id').val();

  	link_app_cart.push(app);

  	$('#link_app_cart').html(JSON.stringify(link_app_cart));

  	$('#app_name').val('');
  	$('#app_id').val('');
  }else{
    $('#err_msg').html("*App is required");
  }
});

var link_app_data = {'csrfmiddlewaretoken': csrf, 'apps': link_app_cart};

$('#link_app_submit').click(function(){

  ajaxRequest("{% url 'Profile:link_app' %}", link_app_data, '/profile/onboard/competitor/');
});

//competetor js
var competetor_cart = [];

$('#competetor_apps').click(function(){
  if($('#app_name').val().length !== 0){
    $('#err_msg').html("");
    var app = {};

  	app['platform'] = $('#platform').val();
  	app['app_name'] = $('#app_name').val();
  	app['app_id'] = $('#app_id').val();
  	app['self_app'] = $('#self_app_id').val();
  	
  	competetor_cart.push(app);

  	$('#competetor_cart').html(JSON.stringify(competetor_cart));

  	$('#app_name').val('');
  	$('#app_id').val('');
  }else{
    $('#err_msg').html("*App is required");
  }
});

var competetor_data = {'csrfmiddlewaretoken': csrf, 'apps': competetor_cart};

$('#competetor_submit').click(function(){
  ajaxRequest("/profile/onboard/competitor/", competetor_data, '/dashboard/');
});
