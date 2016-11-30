$().ready(function () {
    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "No space please and don't leave it empty");
    // validate user form on keyup and submit
    $("#guide").validate({
        rules: {
            name: {
                required: true                
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Please enter name",
            email: "Please enter a valid email address"
        }
    });

});
