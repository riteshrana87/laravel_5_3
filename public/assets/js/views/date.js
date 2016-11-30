var app = app || {};

app.DateView = Backbone.View.extend({
	el: ".date-picker",

	initialize: function() {
		this.$el.each(function(){
			var widget = $(this).closest(".date-picker");
			var trigger = $(this).find(".calendar");
			trigger.datepicker({
				minDate: "+1D", 
				maxDate: "+12M",
				onSelect: function(pickerVal) {
					var date = new Date(pickerVal);
					var day = date.getDate();
					var monthNum = date.getMonth() + 1;
					if (monthNum < 10) {
						monthNum = "0" + monthNum;
					}
					var month = date.getFullYear() + "-" + monthNum;

					var daySelect = widget.find(".day select");
					var monthSelect = widget.find(".month select");

					daySelect.val(day);
					daySelect.change();

					monthSelect.val(month);
					monthSelect.change();
				}
			});
		});
	}
});
