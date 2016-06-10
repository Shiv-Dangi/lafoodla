//converts date into mm/dd/yyyy
function change_date_format(date){
  return((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
}

// date range function for rating-graph
$(function() {
  $( "#from" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    onClose: function( selectedDate ) {
      $( "#to" ).datepicker( "option", "minDate", selectedDate );
    }
  });
  $( "#to" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    onClose: function( selectedDate ) {
      $( "#from" ).datepicker( "option", "maxDate", selectedDate );
    }
  });
});

/*
    This function is for making a bar graph.
    x-axis : Apps Name
    y-axis : Frequecy of changing title description and subtitle
    it consists multiple apps
*/

function bar_graph_titlefrequencyVSapps(){
    //data
    var current_data = current_values();

    var data = {};

    data['app_list'] = current_data.apps;
    data['from_date'] = current_data.from_date;
    data['to_date'] = current_data.to_date;
    data['platform'] = current_data.platform;
    data['csrfmiddlewaretoken'] = csrf;

    var apps_data;

    $.ajax({
        url: "/dashboard/title/",
        data: data,
        type: "POST",
        success: function( response ) {
            response = JSON.parse(response);
            if (response.status_code == 200 && response.message == "success"){
                apps_data = response.data;
                plot_graph(apps_data);        
            }
            else{
                console.log("Oops some error occured");
            }
          }
        });
    
    function plot_graph(apps_data){
        graph_data = convert_graph_data(apps_data);

        //chart for no of times title changed for diffrent apps

        nv.addGraph(function() {
          var chart = nv.models.discreteBarChart()
              .x(function(d) { return d.label })    //Specify the data accessors.
              .y(function(d) { return d.value })
              .staggerLabels(false)    //Too many bars and not enough room? Try staggering labels.
              .forceY([0, 5])
              .showValues(true)       //...instead, show the bar value right on top of each bar.
              ;

          chart.xAxis     //Chart x-axis settings
              .axisLabel('Apps');

          chart.yAxis     //Chart y-axis settings
              .axisLabel('Frequency of changing Title, Description and Subtitles')
              .tickFormat(d3.format(","));

          d3.select('#titlechange_vs_date_graph svg')
              .datum(graph_data)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
    };

    //convert data
    function convert_graph_data(stuff){
        var data = [];
        var vals = {};
        vals['key'] = "Frequency of changing Title and description";
        var values = [];
        for (i in stuff){
          var app = {};
          app['label'] = (stuff[i].app_name).slice(0,(stuff[i].app_name).indexOf(" "));
          app['value'] = stuff[i].value;
          values.push(app);
        }
        vals["values"] = values;
        data.push(vals);

        return data;
    };

    
};

function current_values(){
    var values = {};
    var apps = [];
    //taking the intial value of apps

    $('input[name="apps_list"]:checked').each(function() {
       apps.push(this.value);
    });
    values['apps'] = apps;

    values['platform'] = $("#platform").val();

    var to_date = new Date($( "#to" ).val());
    values['to_date'] =   to_date.getFullYear() + '-' + (to_date.getMonth() + 1) + '-' + to_date.getDate();

    var from_date = new Date($( "#from" ).val());
    values['from_date'] = from_date.getFullYear() + '-' + (from_date.getMonth() + 1) + '-' + from_date.getDate();
    
    return values;
}

function show_graph(){
    if ($('#titlechange_vs_date_graph').is(':visible')){
        bar_graph_titlefrequencyVSapps();
    }
}

//getting the csrf token
var csrf;

csrf = getCookie("csrftoken");

//sets initial values
var to_date = new Date();
var from_date = new Date();
from_date.setDate(to_date.getDate() - 30);

to_date = change_date_format(to_date);
from_date = change_date_format(from_date);

$( "#to" ).val(to_date);
$( "#from" ).val(from_date);

//if platform is changed

$("#platform").change(function(){
    show_graph();
});

//if date range is clicked
$("#to").change(function(){
    show_graph();
});

$("#from").change(function(){
    show_graph();
});

//if app_list is changed

$( '#apps_list a' ).on( 'click', function( event ) {
  show_graph();
});

show_graph();

