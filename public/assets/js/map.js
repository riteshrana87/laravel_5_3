var app = app || {};

app.MapView = Backbone.View.extend({
	el: "#map",
	events: {
		"click a.zoom.in": "zoomIn",
		"click a.zoom.out": "zoomOut",
	},

	initialize: function() {
		this.mapBox = this.$el.find("#googleMap");
		this.centerLat = parseFloat(this.mapBox.data('centerlat'));
		this.centerLng = parseFloat(this.mapBox.data('centerlng'));
		this.markerData = this.mapBox.data('markers');
		this.markers = [];
		this.infoWindows = new Array();
		
		if (this.$el.length) this.createMap();
	},

	createMap: function () {
		var mapOptions = {
			center: new google.maps.LatLng(this.centerLat, this.centerLng),
			zoom: 14,
			zoomControl: false,
			mapTypeControl: false,
		    panControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			scaleControl: false
		};	
		this.map = new google.maps.Map(document.getElementById(this.mapBox.attr("id")), mapOptions);
		this.setMapStyle();
		this.addMarkers(this.map, this.markerData);
	},

	addMarkers: function (map, markerData) {
		var infoTemplate = _.template('<div class="infobox"><p class="img"><a href="<%= link %>"><img src="<%= picture %>" alt=""></a></p><p class="graphic-score" id="score<%= id %>"><span><%= score %></span></p><h4 class="hotel-name"><%= title %></h4><p class="stars stars<%= stars %>">*****</p><p class="location"><a href="<%= location_link %>"><%= location %></a></p><p class="book-now"><a href="<%= booking %>">Book now</a></p></div>');

		for(i = 0; i < markerData.length; i++) {
			var m = markerData[i];
			var info = infoTemplate(m);

			var infowindow = new google.maps.InfoWindow({
				content: ''
			});

			this.markers[i] = new google.maps.Marker({
	    		position: new google.maps.LatLng(m.lat, m.lng),
	    		map: map,
	    		title: m.title,
	    		animation: google.maps.Animation.DROP,
	    		icon: 'http://localhost/roomguide/roomguide/img/marker' + m.type + '.png'
			});
			this.bindInfoWindow(this.markers[i], map, infowindow, info);
		}
	},
	
	bindInfoWindow: function (marker, map, infowindow, infoContent) {
	    google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(infoContent);
	        infowindow.open(map, marker);
	        var el = $(".infobox .graphic-score");
	        app.scoreView.drawScores(el);
	    });
	},

	setMapStyle: function () {
		this.map.set("styles", [
			{ "featureType": "landscape", "elementType": "geometry", "stylers": [ { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" } ] },
			{ "featureType": "administrative", "elementType": "labels", "stylers": [ { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }, { "color": "#1b538b" } ] },
			{ "featureType": "road", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "color": "#c8ccd0" } ] },
			{ "featureType": "water", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "color": "#f0f3f6" } ] },
			{ "featureType": "poi", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] },
			{ "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "visibility": "off" }, { "saturation": -100 } ] },
			{ "featureType": "transit.station.rail", "stylers": [ { "visibility": "off" } ] }
		]);
	},

	zoomIn: function (ev) {
		ev.preventDefault();
		var currentZoom = this.map.getZoom();
        currentZoom ++;
        this.map.setZoom(currentZoom);
	},

	zoomOut: function (ev) {
		ev.preventDefault();
		var currentZoom = this.map.getZoom();
        currentZoom --;
        this.map.setZoom(currentZoom);
	}


});