/**
 * HTML5 Video Tracking
 * @version 1.0.0
 * @author DesignyourCode
 * @license The MIT License (MIT)
 */
$.fn.trackVideos = function(options) {
	if (typeof(ga) == 'undefined') {
		console.warn("Google Analytics is not installed");
	} else {
	  	var settings = $.extend({}, options);

	  	$('video').each(function() {
	  		var videoId = $(this),
				videoTitle = videoId.data('title');

			// Bind Events
			videoId.bind('ended', videoEnd);
			videoId.bind('timeupdate', videoTimeUpdate);
			videoId.bind('play', videoPlay);
			videoId.bind('pause', videoPause);

			// Functions
			function setKeyFrames (duration) {
				var quarter = (duration / 4).toFixed(1);
				sessionStorage.setItem('one', quarter)
				sessionStorage.setItem('two', (quarter * 2).toFixed(1));
				sessionStorage.setItem('three', (quarter * 3).toFixed(1));
			}

			function videoTimeUpdate () {
				var curTime = videoId.currentTime.toFixed(1);
				switch (curTime) {
					case sessionStorage.getItem('one'):
						ga('send', 'event', 'video', '25% video played', videoTitle);
						sessionStorage.setItem('one', null);
					case sessionStorage.getItem('two'):
						ga('send', 'event', 'video', '50% video played', videoTitle);
						sessionStorage.setItem('two', null);
					case sessionStorage.getItem('three'):
						ga('send', 'event', 'video', '75% video played', videoTitle);
						sessionStorage.setItem('three', null);
				}
			}

			function videoEnd () {
				ga('send', 'event', 'video', '100% video played', videoTitle);
			}

			function videoPlay () {
				ga('send', 'event', 'video', 'video played', videoTitle);
				setKeyFrames(this.duration);
			}

			function videoPause () {
				ga('send', 'event', 'video', 'video paused', videoTitle);
			}
		});
	}
};