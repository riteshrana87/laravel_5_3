var app = app || {};

app.ScoreView = Backbone.View.extend({

	initialize: function() {
		this.drawScores($(".graphic-score"));
	},

	drawScores: function(elements) {
		elements.each(function(){
			var canvas = $(this).attr("id");
			var scoreValue = $(this).text() * 10;
			var paper = Raphael(canvas, 60, 60);
			var lineWidth = 3;
			paper.circle(30, 30, 27).animate({"stroke": "#f7f8f9", "stroke-width": lineWidth, "stroke-opacity": 1}, 10);

			paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
			    var alpha = 360 / total * value,
			        a = (90 - alpha) * Math.PI / 180,
			        x = xloc + R * Math.cos(a),
			        y = yloc - R * Math.sin(a),
			        path;
			    if (total == value) {
			        path = [
			            ["M", xloc, yloc - R],
			            ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
			        ];
			    } else {
			        path = [
			            ["M", xloc, yloc - R],
			            ["A", R, R, 0, +(alpha > 180), 1, x, y]
			        ];
			    }
			    return {
			        path: path
			    };
			};

			var scoreLevel = paper.path().attr({
			    "stroke": "#e1e1e1",
			    "stroke-width": lineWidth,
			    arc: [30, 30, 0, 100, 27]
			});

			scoreLevel.animate({
			    arc: [30, 30, scoreValue, 100, 27]
			}, 2000, "bounce");
		});
	}
});