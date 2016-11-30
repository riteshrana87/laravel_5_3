$(document).ready(function () {

    $("#user_country").autocomplete({
        source: "country_list",
        minLength: 3,
        select: function (event, ui) {
            $('#user_country').val(ui.item.value);
            $('#country_id').val(ui.item.id);
        }
    });


    $("#user_city").autocomplete({
        source: function (request, response) {
            $.getJSON("city_list", { country_id: $('#country_id').val(),term: request.term },
                response);
        },
        minLength: 2,
        select: function (event, ui) {
            $('#user_city').val(ui.item.value);
            $('#city_id').val(ui.item.id);
        }
    });


    $(".currency-symbol").on('click', function () {
        var Currenct = {
            currenct_code: $(this).data('title')
        }
        $.ajax({
            type: "POST",
            url: "currencycode",
            data: Currenct,
            cache: false,
            success: function (data) {
                if (data) {
                    window.location.reload();
                }
            }

        })
        return  false;
    });
    /* show popup code */
    $('#select_hotel_list').click(function () {
        jQuery.ajax({
            type: 'POST',
            url: "/selecthotellist",
            data: {},
            success: function (res) {
                $('.cd-popup').addClass('is-visible');
                $('#select_hotel_ajax').html(res);
                /* select country */
                $("#user_country_data").autocomplete({
                    source: "/portaladmin/country_list",
                    minLength: 2,
                    select: function (event, ui) {
                        $('#user_country_data').val(ui.item.value);
                        $('#country_id_data').val(ui.item.id);
                    }
                });
                /* end country*/
                /* select city*/
                $("#user_city_data").autocomplete({
                    source: function (request, response) {
                        $.getJSON("/portaladmin/city_list", { country_id: $('#country_id_data').val(),term: request.term },response);
                    },
                    minLength: 2,
                    select: function (event, ui) {
                        $('#user_city_data').val(ui.item.value);
                        $('#city_id_data').val(ui.item.id);

                        /* start select hotel list in popup*/
                        $("#select_hotel_by_list").ajaxChosen({
                                type: 'post',
                                url: '/selecthotelbycity',
                                dataType: 'json',
                                data: { city_id: $('#city_id_data').val() }
                            },
                            function (data) {
                                var terms = {};
                                $.each(data, function (i, val) {
                                    terms[i] = val;
                                });
                                return terms;
                            }).change(function () {
                                //you can see the IDs in console off all items in autocomplete and deal with them
                                console.log($("#select_hotel_by_list").val());

                            });
                        /* end select hotel*/
                    }
                });

                /* end city*/

/* submit popup data */
                $('form#selectd_hotel').on('submit', function(event){
                    event.preventDefault();
                    var formData = {
                        country_name     : $('#user_country_data').val(),
                        country_id       : $('#country_id_data').val(),
                        city_name        : $('#user_city_data').val(),
                        city_id          : $('#city_id_data').val(),
                        hotel_by_list    : $('#select_hotel_by_list').val()
                    }
                    $.ajax({
                        type     : "POST",
                        url      : "/createhotellist",
                        data     : formData,
                        cache    : false,
                        success  : function(data) {
                            window.location.reload(true);

                        }
                    })
                    return false;
                });
            },
            error: function () {
                alert('There is error while submit');
            }
        });
    });
    /* end popup */
    /* close popup */
    $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });


    $("#start_year").change(function() {
       var start_year = $('#start_year').val();
        if(start_year == ''){
            $('#end_year').val('');
        }else{
            var end_year = +start_year + +1;
            $('#end_year').val(end_year);
        }

    });




});

function getData(dropdown) {
    var value = dropdown.options[dropdown.selectedIndex].value;
    if (value == 'distance'){
        document.getElementById("distance").style.display = "block";
        document.getElementById("hotel").style.display = "none";
    }
    if(value == 'hotel'){
        document.getElementById("hotel").style.display = "block";
        document.getElementById("distance").style.display = "none";
    }

}
$(":input#hotel_type").trigger('change');

