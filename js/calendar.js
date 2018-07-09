$(document).ready( function() {

    var months_of_year = ['Januar','Februar','M&auml;rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
    var days_of_week = ['Mo','Di','Mi','Do','Fr','Sa','So'];

    var current_month = new Date().getMonth();
    var current_year = new Date().getFullYear();



    var get_date_entry = function (year,month,day) {
        if ( ((month+1) < 10) && (day < 10) ) {
            return '<div class="caljs-day"><div class="caljs-day-text" id="caljs-' + year + '-0' + (month+1) + '-0' + day + '">' + day + '</div></div>';
        }
        else if ( ((month+1) > 9) && (day < 10) ) {
            return '<div class="caljs-day"><div class="caljs-day-text" id="caljs-' + year + '-' + (month+1) + '-0' + day + '">' + day + '</div></div>';
        }
        else if ( ((month+1) < 10) && (day > 9) ) {
            return '<div class="caljs-day"><div class="caljs-day-text" id="caljs-' + year + '-0' + (month+1) + '-' + day + '">' + day + '</div></div>';
        }
        else {
            return '<div class="caljs-day"><div class="caljs-day-text" id="caljs-' + year + '-' + (month+1) + '-' + day + '">' + day + '</div></div>';
        }
    }



    var create_html_calendar = function( year, month ) {
        var html_container = new String();

        var html_title = new String();
        var html_title = '<div class="caljs-title">' + months_of_year[month] + ' ' + year + '</div>';

        var html_month = new String();
        for (var i = 0; i < days_of_week.length; i++) {
            html_month = html_month + '<div class="caljs-day_of_week"><div class="caljs-day_of_week-text">' + days_of_week[i] + '</div></div>';
        }
        var day = 1;
        for (var i = 0; i < 6; i++) {
            for ( var j = 0; j < 7; j++) {
                var check = (new Date(year,month,day).getDay() + 6) % 7;
                if ( (check == j) && (day <= new Date(year,month+1,0).getDate()) ) {
                    html_month = html_month + get_date_entry(year,month,day);
                    day = day + 1;
                } else {
                    html_month = html_month + '<div class="caljs-day"><div class="caljs-day"></div></div>';
                }
            }
        }

        html_container = '<div id="' + year + '-' + month + '" class="caljs-container">' + html_title + '<div class="caljs-month">' + html_month + '</div></div>';

        return html_container;
    }



    var prev_month = function ( year , month ) {
        month--;
        if ( month == -1 ) {
            month = 11;
            year--;
        }
        return { year: year, month: month };
    }



    var next_month = function ( year , month ) {
        month++;
        if ( month == 12 ) {
            month = 0;
            year++;
        }
        return { year: year, month: month};        
    }





    $('#caljs-btn-html-prv').on('click', function() {
        var pm = prev_month ( current_year , current_month );
        current_year = pm.year;
        current_month = pm.month;
        $('#caljs-calendar').html( create_html_calendar ( prev_month ( current_year , current_month ).year , prev_month ( current_year , current_month ).month ) );
        $('#caljs-calendar').append( create_html_calendar ( current_year , current_month ) );
        $('#caljs-calendar').append( create_html_calendar ( next_month ( current_year , current_month ).year , next_month ( current_year , current_month ).month ) );
    });



    $('#caljs-btn-html-nxt').on('click', function() {
        var nm = next_month ( current_year , current_month );
        current_year = nm.year;
        current_month = nm.month;
        $('#caljs-calendar').html( create_html_calendar ( prev_month ( current_year , current_month ).year , prev_month ( current_year , current_month ).month ) );
        $('#caljs-calendar').append( create_html_calendar ( current_year , current_month ) );
        $('#caljs-calendar').append( create_html_calendar ( next_month ( current_year , current_month ).year , next_month ( current_year , current_month ).month ) );
    });



    $('#caljs-calendar').html( create_html_calendar ( prev_month ( current_year , current_month ).year , prev_month ( current_year , current_month ).month ) );
    $('#caljs-calendar').append( create_html_calendar ( current_year , current_month ) );
    $('#caljs-calendar').append( create_html_calendar ( next_month ( current_year , current_month ).year , next_month ( current_year , current_month ).month ) );

});
