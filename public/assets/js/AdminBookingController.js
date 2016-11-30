$(function () {
    $('#arrival').datetimepicker({
        format: 'YYYY-MM-DD',
        pickTime: false, use24hours: false
    });
    
    $('#departure').datetimepicker({
        format: 'YYYY-MM-DD',
        pickTime: false, use24hours: false
    });
});