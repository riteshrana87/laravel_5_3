
/*select box design set*/
$('.selectpicker').selectpicker();


/* 
 *  Ritesh Rana
 */

/* nex button click event call on not login users alert render*/
$(document).ready(function() {
    $("#btn-next-error").click(function() {
        BootstrapDialog.alert('please login first !');
    });
});



$(document).ajaxComplete(function() {
    $(function() {
        $('.datepicker1').datetimepicker({
            format: 'YYYY-MM-DD',
            minDate: new Date(),
            defaultDate: new Date(),
            pickTime: false, use24hours: false
        });
    });
});
/* end here*/



//datepicker function calling first one
$(function() {
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        defaultDate: new Date(),
        maxDate: new Date(),
        pickTime: false, use24hours: false
    });
});

/* tab validation in manu entry tabs*/


/* back option country to year tab */
$(document).ready(function() {
    $('#btn-back-year').click(function() {
        $('ul.setup-panel1 li:eq(0)').removeClass('disabled');
        $('ul.setup-panel1 li a[href="#year"]').trigger('click');
        $('ul.setup-panel1 li:eq(1)').addClass('disabled');
    });
});

/* back option color to country */
$(document).ready(function() {
    $('#btn-back-country').click(function() {
        $('ul.setup-panel1 li:eq(1)').removeClass('disabled');
        $('ul.setup-panel1 li a[href="#country"]').trigger('click');
        $('ul.setup-panel1 li:eq(2)').addClass('disabled');
    });
});
/* back option color to country */
$(document).ready(function() {
    $('#btn-back-color').click(function() {
        $('ul.setup-panel1 li:eq(2)').removeClass('disabled');
        $('ul.setup-panel1 li a[href="#color"]').trigger('click');
        $('ul.setup-panel1 li:eq(3)').addClass('disabled');
    });
});
/* end here tab validation */
/* manual entry validation end here */

/* manual entry form validation start here */


/* country via state ajax functions here */
$('#country_id').unbind('change').bind('change', function() {
    var state_id = $('#state_id');
    $.ajax({
        type: "post",
        url: '/tastingnotes/state',
        data: {id: $(this).val()},
        success: function(response) {
            if (response.result == "true") {
                console.log(response);
                $("#state_id").empty();
                $("#sts").css('color', '#ffffff');
                $.each(response.states, function(key, val) {
                    $.each(val, function(key1, val1) {
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
$('#state_id').unbind('change').bind('change', function() {
    var subRegionId = $('#sub_region_id');
    $.ajax({
        type: "post",
        url: '/subregion/getsubregionlist',
        data: {id: $(this).val()},
        success: function(response) {
            if (response.result == "true") {
                console.log(response);
                $("#sub_region_id").empty();
                $("#sts").css('color', '#ffffff');
                subRegionId.append("<option value=''>select sub region </option>");
                $.each(response.subregion, function(key, val) {
                    subRegionId.append("<option value='" + key + "'>" + val + "</option>");
                });
            } else {
                $("#sub_region_id").empty();
                subRegionId.append("<option value=''>No subregion for selected region</option>");
            }
        }
    });

});

/* bootstrap tasble declare */
$(document).ready(function() {
    $('#dataTables-example1').dataTable();
});
$(document).ready(function() {
    $('#dataTables-example').dataTable();
});


/******************************************************************
 *  Searching functionality for cellar module start here

 *  Ritesh Rana
 *
 */
/**********************************************************************/
$(document).ajaxComplete(function() {
    $('.selectpicker').selectpicker();
});



$(document).ready(function() {
    $("#export").click(function() {
        $("#export-form-modal").modal('toggle');
        $.ajax({
            type: "post",
            url: '/export/openexportmodalform',
            success: function(response) {
                console.log(response);
                $("#export_form_open").html(response.html);
            },
            error: function() {
                console.log(response);
            }
        });
    });
});


/*end here*/


