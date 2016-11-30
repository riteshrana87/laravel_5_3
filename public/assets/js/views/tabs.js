var app = app || {};

app.TabbedView = Backbone.View.extend({
	el: ".tabbed",

	events: {
		"click .tab a": "tabClicked"
	},

	tabClicked: function(ev) {
		ev.preventDefault();
		var link = $(ev.target);
		var currentTab = link.parents(".tabs").find(".active");
		var currentContentId = currentTab.find("a").attr("href");
		var newContentId = link.attr("href");

		currentTab.removeClass("active");
		link.parent().addClass("active");

		$(currentContentId).slideUp();
		$(newContentId).slideDown();


	}
});
