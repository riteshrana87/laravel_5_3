$().ready(function () {
    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "No space please and don't leave it empty");
    // validate user form on keyup and submit
    $("#user").validate({
        rules: {
            user_firstname: {
                required: true,
                minlength: 2
            },
            user_email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 4,
                noSpace: true
            },
            password: {
                required: true,
                minlength: 6
            },
            user_mobile: {
                required: true,
                minlength: 10,
                number: true
            },
            user_country: {
                required: true
            },
            user_state: {
                required: true
            },
            agree: "required"
        },
        messages: {
            user_firstname: "Please enter your firstname",
            user_email: "Please enter a valid email address",
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 4 characters",
                noSpace: "No space allowed in username"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            user_mobile: {
                required: "Please provide a mobile number",
                minlength: "Your mobile number must be 10 characters long",
                number: "Please enter a valid number"
            },
             user_country: {
                required: "please select country"
            },
            user_state: {
                required: "please select county"
            }
        }
    });

});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        pickTime: false, use24hours: false
    });
});

/* country via state ajax functions here */
$('#user_country').unbind('change').bind('change', function () {
    // alert("ss");
    var state_id = $('#user_state');
    $.ajax({
        type: "post",
        url: '/tastingnotes/state',
        data: {id: $(this).val()},
        success: function (response) {
            if (response.result == "true") {
                console.log(response);
                $("#user_state").empty();
                $("#sts").css('color', '#ffffff');
                state_id.append("<option value=''>select region </option>");
                $.each(response.states, function (key, val) {
                    $.each(val, function (key1, val1) {
                        if (key1 == "name")
                            state_id.append("<option value='" + val.id + "'>" + val.name + "</option>");
                    });
                });
            } else {
                $("#state_id").empty();
                state_id.append("<option value=''>No region for selected country</option>");
            }
        }
    });
});

/* state via city ajax functions here */
$('#user_state').unbind('change').bind('change', function () {
    var subRegionId = $('#user_city');
    $.ajax({
        type: "post",
        url: '/subregion/getsubregionlist',
        data: {id: $(this).val()},
        success: function (response) {
            if (response.result == "true") {
                console.log(response);
                $("#user_city").empty();
                $("#sts").css('color', '#ffffff');
                //   subRegionId.append("<option value=''>select sub region </option>");
                $.each(response.subregion, function (key, val) {
                    subRegionId.append("<option value='" + key + "'>" + val + "</option>");
                });
            } else {
                $("#user_city").empty();
                subRegionId.append("<option value=''>No subregion for selected region</option>");
            }
        }
    });

});