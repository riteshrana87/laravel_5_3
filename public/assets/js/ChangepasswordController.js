/* state validation*/
$().ready(function () {

    // validate state form on keyup and submit
    $("#chngpaswd").validate({
        rules: {
            new_password: {
                required: true,
                minlength: 6,
                maxlength: 8
            },
            conf_pass: {
                required: true,
                equalTo: "#new_password",
                minlength: 6,
                maxlength: 8

            },
            agree: "required"
        },
        messages: {
            new_password: {
                required: "Please enter a new password",
                minlength: "new password minimum at least 6 characters",
                maxlength: "new password maximum 8 characters"
            },
            conf_pass: {
                required: "Please enter a confirm password",
                minlength: "confirm password minimum at least 6 characters",
                maxlength: "confirm password maximum 8 characters",
                equalTo: "new password and confirm password should be same"
            }
        }
    });
});
