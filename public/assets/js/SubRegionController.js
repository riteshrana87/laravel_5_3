/* state validation*/
$().ready(function () {

    // validate state form on keyup and submit
    $("#subregion").validate({
        rules: {
            country_id: {
                required: true
            },
            state_id: {
                required: true
            },
            sub_region_name: {
                required: true,
                minlength: 2
            },
            agree: "required"
        },
        messages: {
            name: {
                required: "Please enter a subregion name",
                minlength: "subregion name must consist of at least 2 characters"
            }
        }
    });

});

/* country via state ajax functions here */
$('#country_id').unbind('change').bind('change', function () {
    // alert("ss");
    var state_id = $('#state_id');
    $.ajax({
        type: "post",
        url: '/tastingnotes/state',
        data: {id: $(this).val()},
        success: function (response) {
            if (response.result == "true") {
               // console.log(response);
                $("#state_id").empty();
                $("#sts").css('color', '#ffffff');
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