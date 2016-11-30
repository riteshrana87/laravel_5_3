/* state validation*/
$().ready(function () {

    // validate state form on keyup and submit
    $("#state").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },            
            agree: "required"
        },
        messages: {
            name: {
                required: "Please enter a county name",
                minlength: "state name must consist of at least 2 characters"
            }
        }
    });

});