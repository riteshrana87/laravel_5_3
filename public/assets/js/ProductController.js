
//function stateget($id)
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
                //console.log(response);
                $("#state_id").empty();
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
$('#state_id').unbind('change').bind('change', function () {
    var subRegionId = $('#sub_region_id');
    $.ajax({
        type: "post",
        url: '/subregion/getsubregionlist',
        data: {id: $(this).val()},
        success: function (response) {
            if (response.result == "true") {
                console.log(response);
                $("#sub_region_id").empty();
                $("#sts").css('color', '#ffffff');
                //   subRegionId.append("<option value=''>select sub region </option>");
                $.each(response.subregion, function (key, val) {
                    subRegionId.append("<option value='" + key + "'>" + val + "</option>");
                });
            } else {
                $("#sub_region_id").empty();
                subRegionId.append("<option value=''>No subregion for selected region</option>");
            }
        }
    });

});
