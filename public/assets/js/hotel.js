$(document).ready(function() {
    $('#availability-form').submit(function(event) {
        event.preventDefault();
    if($('#checkin_day').val() == 0 || $('#checkin_month').val() == 0 || $('#checkout_day').val() == 0 || $('#checkout_month').val() == 0) {
    alert("Sorry, you need to enter both a full start and end date");
    return false;
    }
        $('#availability-status').text('Loading...');
        var hotel_id = $('#hotel_id').val();
        $.ajax({
            type     : "POST",
            url      : "/availability/" + hotel_id,
            data     : $('#availability-form').serialize(),
            cache    : false,
            success  : function(data) {
                $('#availability-content').html(data);
                $('#availability-status').text('');
                window.location.reload();
            },
            error: function() {
                $('#availability-status').text('Sorry, something went wrong. Please try again');
            }
        })

    });

    $(function()
    {
        $( "#search_destination" ).autocomplete({
            source: "/city",
            minLength: 1,
            select: function(event, ui) {
                $('#search_destination').val(ui.item.value);
            }
        });



        $( "#user_country" ).autocomplete({
            source: "country",
            minLength: 1,
            select: function(event, ui) {
                $('#user_country').val(ui.item.value);
                $('#country_id').val(ui.item.id);
            }
        });

        $("#user_city").autocomplete({
            source: function(request, response) {
                $.getJSON("state", { country_id: $('#country_id').val(),term: request.term },response);
            },
            minLength: 1,
            select: function(event, ui){
                $('#user_city').val(ui.item.value);
                $('#city_id').val(ui.item.id);
            }
        });
 });

    $(".currency-symbol").on('click', function(){
        var Currenct ={
            currenct_code  : $(this).data('title')
        }

        $.ajax({
            type     : "POST",
            url      : "/currencycode",
            data     : Currenct,
            cache    : false,
            success  : function(data) {
              if(data){
                  window.location.reload();
               }
            }

        })
        return  false;
    });
    //$('#clearData').trigger('click');

    $('.select_type_data').click(function() {
        jQuery.ajax({
            type: 'POST',
            url: "/collectionajax",
            data: {
                "type_id": $(this).attr('type_id')
             },
            success: function(res) {
                $('.collection_data').html(res);
            },
            error: function() {
                alert('There is error while submit');
            }
        });
    });


    $('.select_popular_choice').click(function() {
        jQuery.ajax({
            type: 'POST',
            url: "/popularchoicehotelajax",
            data: {
                "popular_choice": $(this).attr('popular_choice')
            },
            success: function(res) {
                $('.popular_list').html(res);
            },
            error: function() {
                alert('There is error while submit');
            }
        });
    });

    $('#select_type').trigger('click');
    $('#select_populer').trigger('click');

    $("#confirm_your_booking").on('click', function(){
        $('.confirm').show();
        $('.reserve_your_room').hide();
        $('.done').hide();
    });
    $("#reserve_your_room").on('click', function(){
        $('.confirm').hide();
        $('.reserve_your_room').show();
        $('.done').hide();
    });
    $("#done").on('click', function(){
         $('.confirm').hide();
        $('.reserve_your_room').hide();
        $('.done').show();
    });

    $('#confirm_your_booking').trigger('click');
    $('#overview_tab').trigger('click');

    $("#overview_tab").on('click', function(){
        $('#overview').show();
        $('#directions').hide();
        $('#facilities').hide();
        $('#reviews').hide();
    });
    $("#directions_tab").on('click', function(){
        $('#overview').hide();
        $('#directions').show();
        $('#facilities').hide();
        $('#reviews').hide();
    });
    $("#facilities_tab").on('click', function(){
        $('#overview').hide();
        $('#directions').hide();
        $('#facilities').show();
        $('#reviews').hide();
    });
    $("#reviews_tab").on('click', function(){
        $('#overview').hide();
        $('#directions').hide();
        $('#facilities').hide();
        $('#reviews').show();
    });

        /* active li script */
    var selector, elems, makeActive;
        selector = '.steps li';
    elems = document.querySelectorAll(selector);
        makeActive = function () {
        for (var i = 0; i < elems.length; i++)
            elems[i].classList.remove('active');
            this.classList.add('active');
        };
    for (var i = 0; i < elems.length; i++)
        elems[i].addEventListener('mousedown', makeActive);


    var selector, elems, makeActive;
    selector = '.tabs li';
    elems = document.querySelectorAll(selector);
    makeActive = function () {
        for (var i = 0; i < elems.length; i++)
            elems[i].classList.remove('active');
        this.classList.add('active');
    };
    for (var i = 0; i < elems.length; i++)
        elems[i].addEventListener('mousedown', makeActive);


});

$(document).ready(function () {

    $(".letter").hide();
    $(".letter:first").show(); //Activate first tab
     //On Click Event
    $("#letters a").click(function() {
        $(".letter").hide(); //Hide all tab content
        var activeTab = $(this).attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });


    $( "#query" ).autocomplete({
        source: "/search",
        selectFirst: true,
        minChars:2,
        select: function(event, ui) {
            $('#query').val(ui.item.value);
        }

    });

    $('#home-search').submit(function(event) {
        // First of all make sure we have a query
        query = $('#query').val();
        if(query == 'City, Region, Country, Airport, Landmark or Hotel' || query == '') {
            alert("Please enter something to search form");
            event.preventDefault();
        } else {
            // We have a query, now check for dates
            checkin_day = $('#checkin_day').val();
            checkin_month = $('#checkin_month').val();
            checkout_day = $('#checkout_day').val();
            checkout_month = $('#checkout_month').val();

            if(checkin_day == 0 || checkin_month == 0 || checkout_day == 0 || checkout_month == 0) {
                // No dates have been specified, check if they check the no dates checkbox
                if(!$('#no_date').is(':checked')) {
                    alert("Please enter a start and end date or if you don't yet know the dates, select the checkbox");
                    event.preventDefault();
                }
            }
        }
        // Check the dates are in the right order
        var parts = $('#checkin_month').val().split('-');
        var start = new Date(parts[0], parts[1]-1, $('#checkin_day').val());

        var parts = $('#checkout_month').val().split('-');
        var end = new Date(parts[0], parts[1]-1, $('#checkout_day').val());

        if(end <= start) {
            alert("Sorry, the check-out date must be later then then check-in date");
            event.preventDefault();
        }
    });
});

//all destination ajax start

$(document).ready(function() {

    //When page loads...
    $(".tab-content").hide(); //Hide all content

    var bmtag = document.location.href;
    if(bmtag.indexOf('#') > 0) {
        var tag = bmtag.split('#')[1];
        $(".tab-content #" + tag).show();
        $("ul.tabs #li" + tag).addClass("active").show(); //Activate first tab
        $("#" + tag).show(); //Show first tab content
    } else {
        $(".tab-content:first").show();
        $("ul.tabs li:first").addClass("active").show(); //Activate first tab
        $(".tab-content:first").show(); //Show first tab content
    }


    //On Click Event
    $("ul.tabs li").click(function() {

        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab-content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });


  /*  $('.select_type_country').click(function() {
        jQuery.ajax({
            type: 'POST',
            url: "/alldestinationcountry",
            data: {
                "type_id": $(this).attr('type_id')
            },
            success: function(res) {
                $('.collection_data').html(res);
            },
            error: function() {
                alert('There is error while submit');
            }
        });
    });

*/

});



//end destination ajax




