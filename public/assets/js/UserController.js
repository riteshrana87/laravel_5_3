/* registration validation */

$().ready(function () {
    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "No space please and don't leave it empty");
    // validate user form on keyup and submit
    $("#user").validate({
        rules: {
            user_firstname: {
                required: true,
                lettersonly: true
            },
            user_lastname: {
                required: true,
                lettersonly: true
            },
            user_email: {
                required: true,
                email: true
            },
            user_email_confirmation: {
                required: true,
                email: true,
                equalTo: "#user_email"
            },
            password: {
                required: true,
                minlength: 6
            },
            password_confirmation: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            username: {
                required: true,
                minlength: 4,
                noSpace: true
            },
            user_country: {
                required: true
            },
            user_state: {
                required: true
            },
            user_zipcode: {
                required: false,
                minlength: 4
            },
            is_news_letter: {
                required: true
            },
            agree: "required"
        },
        messages: {
            user_email: "Please enter a valid email address",
            user_email_confirmation: "email does not match",
            user_country: 'Please select country',
            user_state: 'Please select county',
            user_firstname: {
                required: "Please enter your firstname",
                lettersonly: 'No space and numeric not allowed on firstname'

            },
            user_lastname: {
                required: "Please enter your lastname",
                lettersonly: 'No space and numeric not allowed on lastname'
            },
            username: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 4 characters",
                noSpace: "No space allowed in username"
            },
            password: {
                required: "Please enter a password",
                minlength: "Your password must be at least 6 characters long"
            },
            password_confirmation: {
                required: "password does not match",
                minlength: "Your confirm password must be at least 6 characters long",
                equalTo: "password does not match"
            },
            user_zipcode: {
                required: "Please enter a zipcode",
                minlength: "zipcode must be at least 4 characters long"
            }
        }
    });

});

/* function for userlogin*/

/* change password validation with update*/

$().ready(function () {
    // validate user form on keyup and submit
    $("#changepassword").validate({
        rules: {
            password: {
                required: true,
                minlength: 6
            },
            password_confirmation: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            agree: "required"
        },
        messages: {
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            password_confirmation: {
                required: "Please provide a confirm password",
                minlength: "Your confirm password must be at least 6 characters long",
                equalTo: "password and confirm password not valid"
            }
        }
    })

    $('#resetpwd').click(function () {
        if ($("#changepassword").valid()) {
            ResetPassword();
        }
    });

});


/* function for userlogin*/
function ResetPassword() {
    var password = $("#password").val();
    var forgetId = $("#forgetId").val();
    $.ajax({
        type: "post",
        url: 'resetpassword',
        data: {password: password, forgetId: forgetId},
        success: function (response) {
            window.location = '/';
        }
    });
}

/* edit sign info form validation*/
$().ready(function () {
    $("#profileupdate").validate({
        rules: {
            user_email_address: {
                required: false,
                email: true
            },
            new_password: {
                required: false,
                minlength: 6,
                maxlength: 8,
                alphanumeric: true
            },
            confirm_password: {
                required: false,
                equalTo: "#new_password"
            }
        },
        messages: {
            user_email_address: "Please enter a valid email address",
            alphanumeric: "Please use letters and numbers only",
            confirm_password: "New password and confirm password should be the same",
        }
    })
});
$('#savebt').on('click', function () {
    if ($("#profileupdate").valid()) {
        doProfileUpdate();
    }
});
function doProfileUpdate() {
    var user_email_address = $("#user_email_address").val();
    var new_password = $("#new_password").val();
    var confirm_password = $("#confirm_password").val();
    $.ajax({
        type: "post",
        url: 'myprofile',
        data: {user_email_address: user_email_address, new_password: new_password, confirm_password: confirm_password},
        success: function (response) {
            if (!parseInt(response.error)) {
                $('#alterlogininfo').modal('hide');
                $("#myprofile").html(response.content);
                BootstrapDialog.alert(response.message);
            } else {
                $('#alterlogininfo').modal('hide');
                BootstrapDialog.alert(response.message);
            }
        }
    });
}


/* country via state ajax functions here */
$('#user_country').unbind('change').bind('change', function () {
    var state_id = $('#user_state');
    $.ajax({
        type: "post",
        url: '/tastingnotes/state',
        data: {id: $(this).val()},
        success: function (response) {
            if (response.result == "true") {
                //console.log(response);
                $("#user_state").empty();
                $("#sts").css('color', '#ffffff');
                $.each(response.states, function (key, val) {
                    $.each(val, function (key1, val1) {
                        if (key1 == "name")
                            state_id.append("<option value='" + val.id + "'>" + val.name + "</option>");
                    });
                });
            } else {
                $("#user_state").empty();
                state_id.append("<option value=''>No region for selected country</option>");
            }
        }
    });

});

/* user profile image upload */
$(document).ready(function () {
  $("#userprofile").on('submit', function () {
        //$("#loader").show();
        var options = {
            url: $(this).attr("action"),
            success: onsuccess
        };
        $(this).ajaxSubmit(options);
        return false;
    });
});

/* upload image modal box open */
$("#document").ready(function () {
    $("#uploadimage").click(function () {
        $("#profileimageupload").modal("toggle");
    })
});

/* profile location update in user account*/
$(document).ready(function () {
    $("#edit_profile_location").click(function () {
        $("#profile_location_update").modal('toggle');
        $.ajax({
            type: "post",
            url: '/user/userdataget',
            data: {id: $(this).val()},
            success: function (response) {
                if (response.result == "true") {
                    $("#personal_information_id").html(response.html);
                }
            }
        });

    });
});

/* personal profile update*/
$().ready(function () {
    // validate user form on keyup and submit
    $("#profile_location_update_form").validate({
        rules: {
            user_firstnamea: {
                required: true,
                lettersonly: true
            },
            user_lastnamea: {
                required: true,
                lettersonly: true

            },
            country_ida: {
                required: true

            },
            state_ida: {
                required: true

            },
            agree: "required"
        },
        messages: {
            user_countrya: 'Please select country',
            user_statea: 'Please select county',
            user_firstnamea: {
                required: "Please enter your firstname",
                lettersonly: 'numeric not valid on firstname'
            },
            user_lastnamea: {
                required: "Please enter your lastname",
                lettersonly: 'numeric not valid on lastname'
            },
            state_ida: {
                required: "Please select region"
            },
            country_ida: {
                required: "Please select country"
            }

        }
    });
});


$(document).ajaxComplete(function () {
    $(document).on('click', '#updatebt', function () {
        if ($("#profile_location_update_form").valid()) {
            if ($("#siteblogurla").val() != '') {
                if (!(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test($("#siteblogurla").val()))) {
                    BootstrapDialog.alert('url is not valid format');
                    return false;
                }
            }
            var formArray = $("#profile_location_update_form").serialize();
            $.ajax({
                type: "post",
                url: '/user/userprofileupdate',
                data: formArray,
                success: function (response) {
                    if (response.result == "true") {
                        window.location = '/myprofile';
                    }
                }
            });
        }
    });

    /* country via state ajax functions here */
    $('#country_ida').unbind('change').bind('change', function () {
        var state_id = $('#state_ida');
        $.ajax({
            type: "post",
            url: '/tastingnotes/state',
            data: {id: $(this).val()},
            success: function (response) {
                if (response.result == "true") {
                    console.log(response);
                    $("#state_ida").empty();
                    state_id.append("<option value=''>select region </option>");
                    $.each(response.states, function (key, val) {
                        $.each(val, function (key1, val1) {
                            if (key1 == "name")
                                state_id.append("<option value='" + val.id + "'>" + val.name + "</option>");
                        });
                    });
                } else {
                    $("#state_ida").empty();
                    state_id.append("<option value=''>No region for selected country</option>");
                }
            }
        });

    });
    /* state via city ajax functions here */
    $('#state_ida').unbind('change').bind('change', function () {
        var subRegionId = $('#sub_region_ida');
        $.ajax({
            type: "post",
            url: '/subregion/getsubregionlist',
            data: {id: $(this).val()},
            success: function (response) {
                if (response.result == "true") {
                    console.log(response);
                    $("#sub_region_ida").empty();
                    subRegionId.append("<option value=''>select sub region </option>");
                    $.each(response.subregion, function (key, val) {
                        subRegionId.append("<option value='" + key + "'>" + val + "</option>");
                    });
                } else {
                    $("#sub_region_ida").empty();
                    subRegionId.append("<option value=''>No subregion for selected region</option>");
                }
            }
        });
    });

});

//by cost wise search
$(document).on('click', '.costsearch', function() {
    var cost = $(this).attr("start");
    $.ajax({
        type: "post",
        url: '/costsearch',
        data: {costRange: cost,render:'by-price'},
        success: function(response) {
            console.log(response);
            if (response.result == "true") {
                $("#" + response.render).html(response.html);
            } else {
                BootstrapDialog.alert('please try again after some time');
            }
        }
    });
});

