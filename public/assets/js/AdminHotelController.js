$(function () {
    $('#checkout_from').datetimepicker({
            format: 'HH:mm:ss',
            pickDate: false,
            pickTime: true,           
            useMinutes: true, //en/disables the minutes picker
            useSeconds: true, //en/disables the seconds picker
            useCurrent: true, //when true, picker will set the value to the current date/time 
            pick12HourFormat: false,
            
        });
        $('#checkout_to').datetimepicker({
            format: 'HH:mm:ss',
            pickDate: false,
            pickTime: true,
            useMinutes: true, //en/disables the minutes picker
            useSeconds: true, //en/disables the seconds picker
            useCurrent: true, //when true, picker will set the value to the current date/time  
            pick12HourFormat: false,
        });
        $('#checkin_to').datetimepicker({
            format: 'HH:mm:ss',
            pickDate: false,
            pickTime: true,
            useMinutes: true, //en/disables the minutes picker
            useSeconds: true, //en/disables the seconds picker
            useCurrent: true, //when true, picker will set the value to the current date/time 
            pick12HourFormat: false,
        });
        $('#checkin_from').datetimepicker({
            format: 'HH:mm:ss',
            pickDate: false,
            pickTime: true,
            useMinutes: true, //en/disables the minutes picker
            useSeconds: true, //en/disables the seconds picker
            useCurrent: true, //when true, picker will set the value to the current date/time  
            pick12HourFormat: false,
        });
});

