$().ready(function () {

    // validate user form on keyup and submit
    $("#frmresetpassword").validate({
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
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 6 characters long"
        },
        password_confirmation: {
            required: "Please provide a confirm password",
            minlength: "Your confirm password must be at least 6 characters long",
            equalTo: "password and confirm password not valid"
        }
    });

});
