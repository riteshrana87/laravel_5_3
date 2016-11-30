var app = app || {};

app.FilterView = Backbone.View.extend({
	el: ".link-list.filters",

	events: {
		"click .filter>a": "toggleOptions"
	},

	toggleOptions: function(ev) {
		ev.preventDefault();
		var filter = $(ev.target).parent();
		filter.children(".filter-options").slideToggle(300, function() {
			filter.toggleClass("expanded");
		});
	}
});