var app = app || {};

app.ListingView = Backbone.View.extend({
	el: ".listing",
	events: {
		"click .tab a": "tabClick"
	},

	initialize: function() {
		this.tabSet = this.$el.find(".tabs");
		this.tabSet.each(function(){
			$(this).find(".tab").eq(0).addClass("active");
		});
	},

	tabClick: function(ev) {
		ev.preventDefault();
		var link = $(ev.target);
		var index = link.parent().prevAll(".tab").length;

		link.parent().siblings(".active").removeClass("active");
		link.parent().addClass("active");

		var pos = "-" + (index * 100) + "%";
		var dataColumns = link.parents(".listing").find(".listing-col");
		dataColumns.css("left", pos);
	}	

});