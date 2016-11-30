var app = app || {};

app.SelectView = Backbone.View.extend({
	el: ".select",

	events: {
		"change select": "changeValue"
	},

	changeValue: function(ev) {
		var select = $(ev.target);
		var text = select.children("option:selected").text();
		select.siblings(".val").text(text);
	}
});
