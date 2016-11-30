var Router = Backbone.Router.extend({
	routes: {
		"*splat/home.php": "homePage",
		"*splat/hotel.php": "hotelPage",
		"*splat/destination.php": "destinationPage",
		"*splat/:param": "other"
	},

	homePage: function() {
		app.showcaseView = new app.ShowcaseView();
		app.listingView = new app.ListingView();
		this.other();
	},

	hotelPage: function() {
		app.tabbedView = new app.TabbedView();
		this.other();
	},

	destinationPage: function() {
		app.showcaseView = new app.ShowcaseView();
		app.mapView = new app.MapView();
		this.other();
	},

	// this method starts views for components that may be on any page, eg. tabs, date pickers, custom select boxes
	other: function() {
		app.mapView = new app.MapView();
		app.scoreView = new app.ScoreView();
		app.selectView = new app.SelectView();
		app.filterView = new app.FilterView();
		app.dateView = new app.DateView();
	}

});

app.RoomguideRouter = new Router();
Backbone.history.start({pushState: true});