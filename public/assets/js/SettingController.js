/* setting validation*/
// validate user form on keyup and submit
$().ready(function () {
    $("#settings").validate({
        rules: {
            site_name: {
                required: true,
                minlength: 4
            },
            admin_sender_email: {
                required: true,
                email: true
            },
            admin_receiver_email: {
                required: true,
                email: true
            },
            site_copy_right_message: {
                required: true,
                minlength: 4
            },
            agree: "required"
        },
        messages: {
            admin_sender_email: "Please enter a valid email address",
            admin_receiver_email: "Please enter a valid email address",
            site_name: {
                required: "Please enter a site title",
                minlength: "site title must consist of at least 4 characters"
            },
            site_copy_right_message: {
                required: "Please enter a copy right message",
                minlength: "copy right message must consist of at least 4 characters"
            }
        }
    });
});