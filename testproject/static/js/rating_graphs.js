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
    This function is for making a line plus bar graph.
    x-axis : date
    y-axis : Average rating 
    it consists multiple line,each for an app
*/

function lineplus_graph_appratingVSdate(){

    function convert_graph_data(stuff){

        var vals = [];
                for (var i = 0; i < stuff.length; ++i) {
            var date = new Date(stuff[i]["date"]);
            vals.push({
                x: date,
                y: stuff[i]["value"]
            });
        }

        return vals;
    };

    //data
    var current_data = current_values();

    var data = {};

    data['app_id'] = current_data.select_app;
    data['from_date'] = current_data.from_date;
    data['to_date'] = current_data.to_date;
    data['platform'] = current_data.platform;
    data['time_interval'] =current_data.time_interval;
    data['csrfmiddlewaretoken'] = csrf;

    var apps_data;

    var platform = data['platform'];
    $.ajax({
        url: "/dashboard/average_app_rating/",
        data: data,
        type: "POST",
        success: function( response ) {
            response = JSON.parse(response);
            if (response.status_code == 200 && response.message == "success"){
                apps_data = response.data;
                plot_graph(apps_data, platform);
            }
            else{
                console.log("Oops some error occured");
            }
          }
    });

    function plot_graph(apps_data,platform){

        if(platform == "ios"){

            apps_data = convert_graph_data(apps_data);

            var dataset = [{
                "key": "Result",
                "type": "line",
                "yAxis": 1,
                "values": apps_data
                },
                {
                "key": "Plan",
                "type": "bar",
                "yAxis": 1,
                "values": apps_data
            }];

            nv.addGraph(function () {
                var chart = nv.models.multiChart()
                    .options({
                    reduceXTicks: false
                })
                    .showLegend(true)
                    ;

                chart.xAxis.axisLabel("Date")
                .tickFormat(function (d) {
                        return d3.time.format('%d/%m/%y')(new Date(d))
                    });

                chart.yAxis1.axisLabel("Average Rating")
                .tickFormat(d3.format(',.01f'));

                chart.yDomain1( [0,5] );

                d3.select('#apprating_vs_date svg')
                    .datum(dataset)
                    .call(chart);

                nv.utils.windowResize(chart.update);
                return chart;
            });
        }
        else{
            if (platform == "android") {

                var apps_data = JSON.parse(apps_data);

                var average_rating = apps_data.average_rating;

                var five_star_rating = apps_data.five_star_rating;
                
                var four_star_rating = apps_data.four_star_rating;

                var three_star_rating = apps_data.three_star_rating;

                var two_star_rating = apps_data.two_star_rating;

                var one_star_rating = apps_data.one_star_rating;

                var dataset = [{
                    "key": "average_rating",
                    "type": "line",
                    "yAxis": 1,
                    "values":  convert_graph_data(average_rating)
                    }, 
                    {
                    "key": "one_star_rating",
                    "type": "bar",
                    "yAxis": 1,
                    "values":  convert_graph_data(one_star_rating)
                    },
                    {
                    "key": "two_star_rating",
                    "type": "bar",
                    "yAxis": 1,
                    "values":  convert_graph_data(two_star_rating)
                    },
                    {
                    "key": "three_star_rating",
                    "type": "bar",
                    "yAxis": 1,
                    "values":  convert_graph_data(three_star_rating)
                    },
                    {
                    "key": "four_star_rating",
                    "type": "bar",
                    "yAxis": 1,
                    "values":  convert_graph_data(four_star_rating)
                    },
                    {
                    "key": "five_star_rating",
                    "type": "bar",
                    "yAxis": 1,
                    "values":  convert_graph_data(five_star_rating)
                    }];

                nv.addGraph(function () {
                    var chart = nv.models.multiChart()
                        .options({
                        reduceXTicks: false
                    })
                        .showLegend(true)
                        ;

                    chart.xAxis.axisLabel("Date")
                    .tickFormat(function (d) {
                            return d3.time.format('%d/%m/%y')(new Date(d))
                        });

                    chart.yAxis1.axisLabel("Average Rating")
                    .tickFormat(d3.format(',.01f'));

                    chart.yDomain1( [0,5] );
                    
                    chart.bars1.stacked(true);

                    d3.select('#apprating_vs_date svg')
                        .datum(dataset)
                        .call(chart);

                    nv.utils.windowResize(chart.update);
                    return chart;
                });



            }
        }
    };

};



/*
    This function is for making a line graph.
    x-axis : date
    y-axis : noe of people rated 
    it consists multiple line,each for an app
*/

function line_graph_peopleratedVSapps(){

    //data
    var current_data = current_values();

    var data = {};

    data['app_list'] = current_data.apps;
    data['from_date'] = current_data.from_date;
    data['to_date'] = current_data.to_date;
    data['platform'] = current_data.platform;
    data['time_interval'] =current_data.time_interval;
    data['csrfmiddlewaretoken'] = csrf;

    var apps_data;

    $.ajax({
        url: "/dashboard/rating/",
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

        //chart for no of people rated vs date for diffrent apps
        nv.addGraph(function () {
            var chart = nv.models.lineChart()
                .forceY([0, 100])
                .useInteractiveGuideline(false);

            chart.xAxis.axisLabel("Date").tickFormat(function (d) {
                return d3.time.format('%d/%m/%y')(new Date(d))
            });
            chart.yAxis.axisLabel("No of people rated").tickFormat(d3.format(","));

            d3.select("#people_rated_vs_apps #graph")
                .datum(graph_data)
                .call(chart);

            nv.utils.windowResize(function () {

                d3.select("#people_rated_vs_apps #graph").call(chart)
            });

            //calculate the xScale
            var xScale = chart.xAxis.scale();
            
            var svg = d3.select("#people_rated_vs_apps #graph");
            
            svg.append("line")
                .style("stroke", "#FF7F0E")
                .style("stroke-width", "2.5px")
                .attr("x1", xScale(new Date('Thu May 05 2016 05:30:00 GMT+0530 (IST)')))
                .attr("y1", 20)
                .attr("x2", xScale(new Date('Thu May 05 2016 05:30:00 GMT+0530 (IST)')))
                .attr("y2", 550)
                // addClass
                .attr('class', function(index, classNames) {
                    return classNames + ' vertical-line';
                });

                $('body').on('mouseout', '.vertical-line', function (event) {
                    var y = event.pageY;
                    var x = event.pageX;
                    $('#hoverText').show();
                });

                $('body').on('click', '#tooltip-close', function () {
                   $('#hoverText').hide(); 
                });

                $('#tooltip-redirect').click(function(){
                    location.href = "/dashboard/";
                });

            return chart;
        });

    };

    //convert data
    function convert_graph_data(stuff){
        var vals = [];
        for (i = 0; i < stuff.length; i++) { 
            
            var app = {};
            app['key'] = (stuff[i].app_name).slice(0,(stuff[i].app_name).indexOf(" "));
            var values = [];
            data = stuff[i].data;
            for(j in data){
                values.push({
                    x: new Date(data[j]["date"]),
                    y: data[j]["amount"]
                })
            }
            app['values'] = values;
            vals.push(app);
        }
        return vals;
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

    var select_app = $('input[name="select_app"]:checked').val();
    values['select_app'] = select_app;

    values['platform'] = $("#platform").val();

    values['time_interval'] = $(".clicked-button").val();

    var to_date = new Date($( "#to" ).val());
    values['to_date'] =   to_date.getFullYear() + '-' + (to_date.getMonth() + 1) + '-' + to_date.getDate();

    var from_date = new Date($( "#from" ).val());
    values['from_date'] = from_date.getFullYear() + '-' + (from_date.getMonth() + 1) + '-' + from_date.getDate();
    
    return values;
}

function show_graph(){

    if ($('#people_rated_vs_apps').is(':visible')){
        $(".vertical-line").remove();
        $("#hoverText").hide();
        line_graph_peopleratedVSapps();
    }

    if ($('#apprating_vs_date').is(':visible')){
        lineplus_graph_appratingVSdate();
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

$('input[name="select_app"]:first').each(function(){
    $(this).attr('checked', true);
});
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

$( '.time-interval' ).on( 'click', function( event ) {

    $( '.time-interval' ).removeClass("clicked-button");
    $(this).addClass("clicked-button");
    show_graph();
});

$( '#select_app a' ).on( 'click', function( event ) {
show_graph();
});

show_graph();
