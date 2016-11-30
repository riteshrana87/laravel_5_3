var app = app || {};

app.ShowcaseView = Backbone.View.extend({
	el: ".showcase",
	events: {
		"click .controls .prev": "backClick",
		"click .controls .next": "forwardClick",
		"click .text-slide": "textSlideClick",
		"mouseenter": "animationPause",
		"mouseleave": "animationPlay"
	},

	initialize: function() {
		this.currentSlide = 0;
		this.sliderPos = 0;
		this.moveDuration = 1500;
		this.moveDelay = 5000;
		this.photoSlider = this.$el.find(".slideshow");		
		this.animationPlaying = false;
		this.screenWidth = parseInt($("body").width());
		this.slideshowReady = false;

		if(this.screenWidth > 1230) this.buildSlideshow();
		var that = this;

		$(window).resize(function() {
			that.screenWidth = parseInt($("body").width());			
			if(that.screenWidth > 1230) that.buildSlideshow();
		});
	},

	buildSlideshow: function() {
		if(this.slideshowReady === false) {
			this.slideshowReady = true;

			var slideTemplate = _.template('<li class="slide"><img src="<%= image %>" alt="<%= city %>" class="slide-img"></li>');
			var textTemplate = _.template('<div class="text-slide"><h1 class="showcase-title"><%= country %><br><strong><a href="<%= destinationLink %>"><%= city %></a></strong></h1><p class="summary"><strong><%= propCount %> properties</strong><br><%= searchers %> people looking at this destination</p></div>');
			var imageSlideshow = this.$el.find(".slideshow");
			var	textSlideshow =  this.$el.find(".text-slideshow");
			var controls = textSlideshow.find(".controls");

			var data = this.$el.data("slides");
			var slideData = data.slides;

			for(var i = 0; i < slideData.length; i++) {
				imageSlideshow.append(slideTemplate(slideData[i]));
				controls.before(textTemplate(slideData[i]));
			}
			this.slides = this.$el.find(".slide");
			this.textSlides = this.$el.find(".text-slide");
			
			if (slideData.length > 1){
				this.animationPlay();	
			}
		}
	},

	// a tool to calculate slider position and to do the animation labour
	moveSlides: function() {
		var showcase = this;
		var distance = showcase.slides.width();
		var pos = "-" + (showcase.currentSlide * distance) + "px";
		var animTime = showcase.moveDuration;
		showcase.slides.animate({left: pos}, animTime, function() {
			showcase.animationPlaying = false;
		});
	},

	// the logic of showing previous slide
	slideBack: function() {
		this.animationPlaying = true;
		this.textSlides.eq(this.currentSlide).slideUp();
		if (this.currentSlide > 0) {
			this.currentSlide --;
		} else {
			this.currentSlide = this.slides.length - 1;
		}
		this.textSlides.eq(this.currentSlide).slideDown();
		this.moveSlides();
	},

	// the logic of showing next slide
	slideForward: function() {
		this.animationPlaying = true;
		this.textSlides.eq(this.currentSlide).slideUp();
		if (this.currentSlide < this.slides.length - 1) {
			this.currentSlide ++;
		} else {
			this.currentSlide = 0;
		}
		this.textSlides.eq(this.currentSlide).slideDown();
		this.moveSlides();
	},

	textSlideClick: function(ev) {
		var slide;
		if ($(ev.target).hasClass("text-slide")) {
			slide = $(ev.target);
		} else {
			slide = $(ev.target).parents(".text-slide");
		}
		var url = slide.find("a").attr("href");
		if (url) {
			window.location = url;
		}
	},

	// starting the automatic slide animation
	animationPlay: function() {
		var showcase = this;
		if (this.slides && this.slides.length > 1) {
			this.anim = setInterval(function() { showcase.slideForward(); }, this.moveDelay);	
		}
	},

	// stopping the automatic slide animation
	animationPause: function() {
		clearInterval(this.anim);
	},

	forwardClick: function (ev) {
		ev.preventDefault();
		if(!this.animationPlaying) {
			this.slideForward();
		}
	},

	backClick: function (ev) {
		ev.preventDefault();
		if(!this.animationPlaying) {
			this.slideBack();
		}
	}

});