//$('#basicModal').modal({ backdrop: 'static', keyboard: false })
/* login and forgot password modal related popup and ajax with validation functionalites */
/* login validation */
(function($) {
    $.fn.onEnter = function(func) {
        this.bind('keypress', function(e) {
            if (e.keyCode == 13) func.apply(this, [e]);
        });
        return this;
    };
})(jQuery);

$().ready(function () {
    // validate user form on keyup and submit
    $("#login").validate({
        rules: {
            user_email_login: {
                required: true,
                email: true
            },
            password_login: {
                required: true
            },
            agree: "required"
        },
        messages: {
            user_email_login: "Please enter a valid email address",
            password_login: "Please provide a password",
        }
    })
    $("#login").onEnter( function() {
        if ($("#login").valid()) {
            logins();
        }
    });
    $('#loginbt').click(function () {
        if ($("#login").valid()) {
            logins();
        }
    });
});

/* function for userlogin*/
function logins() {
    var email = $("#user_email_login").val();
    var password = $("#password_login").val();
    $.ajax({
        type: "post",
        url: '/logincheck',
        data: {email: email, password: password},
        success: function (response) {
            if (response == "true") {
                window.location = '/myprofile';
            } else {
                $("#error").css("color", "red");
                $("#error").html('email or password not valid');
            }
        }
    });
}

/*forgot password form open*/
$(document).ready(function () {
    $('#forgotpopup').click(function () {
        $('#basicModal').modal('toggle');
    });
});

/*forgot password cancel event login form open*/
$(document).ready(function () {
    $('#forgotclose').click(function () {
        $('#basicModal').modal('toggle');
    });
});

/* forgot password form validation*/
$().ready(function () {
    $("#forgot").validate({
        rules: {
            user_email_forgot: {
                required: true,
                email: true
            },
            agree: "required"
        },
        messages: {
            user_email_forgot: "Please enter a valid email address",
        }
    })

    $('#forgotsubmit').click(function () {
        if ($("#forgot").valid()) {
            forgotPassword();
        }
    });

});

/* function for user forgot password*/
function forgotPassword() {
    var email = $("#user_email_forgot").val();
    if (email)
        $("#loading").show();
    $('.progress').removeClass('active');
    $.ajax({
        type: "post",
        url: '/forgotpassword',
        data: {email: email},
        cache: false,
        success: function (response) {
            $("#loading").hide();
            $('#basicModal1').modal('toggle');
            if (response == "true") {
                BootstrapDialog.alert('please check your email for reset password.');
            } else {
                BootstrapDialog.alert('email is not matching with database.');

            }
        }
    });
}

// bind ajax scroll for global
$(document).on("ajaxStart",function () {
        $('#loading').show();
    }).on("ajaxComplete", function () {
        $('#loading').hide();
    });

/* redirect to home page */
    $(document).ready(function () {
        $("#homes").click(function () {
            window.location = '/';
        });
    });

//select box globaly calling
$('.selectpicker').selectpicker();

//ckeditor globally define language
CKEDITOR.config.language = 'pt';