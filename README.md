# Tracking for Youtube and HTML5 Videos

This jQuery plugin has been built to allow you to track videos in your site. It supports Youtube videos and HTML5 embeded videos.

You can push tracking events into both Google's Universal Analytics and KissMetrics.

### Requirements
 - Google Universal Analytics Script
 - jQuery 1.9+
 - This plugin

## Quick Start:
 - Add jQuery to your site
 - Use video-tracking.js for development and video-tracking.min.js for production

```
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="assets/lib/vendor/video-tracking.min.js"></script>
```

#### You must include GA code on your site!
```
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');
</script>
```

## Getting started with Youtube Video Tracking

- Then add the following (remember not to duplicate document.ready, if you already have this just add the plugin initialisation code):

```
$(document).ready(function(){

    $('[data-track-video]').trackVideo();

});
```

- The plugin will loop through the page, find all the div's with 'player-' and then build the Youtube video accordingly.

```
<div id="player-<youtube-key>"></div>

<!-- For example: -->
<div id="player-ScMzIvxBSi4"></div>
```

## IMPORTANT
If a Youtube video hasn't had it's title entered properly when uploaded, you will need to define one yourself.

To do this add data-title attribute:

```
<div id="player-ScMzIvxBSi4" data-title="Title goes here"></div>
```
It is good practice to test what GA data is being sent.


## Options
- You can control the size, by adding a relevant data tag:
```
data-height="390"
data-width="640"
```
By default it will be 853 wide by 480 high.

- You can ignore the sizing and force the video to load responsively (keeping the aspect ratio).

Just add the following CSS in your CSS file:
```
.video-ratio {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}
.video-ratio iframe,
.video-ratio video,
.video-ratio object,
.video-ratio embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

And add a parent div with a class of video and keep-ratio
```
<div class="video keep-ratio">
	<div id="player-ScMzIvxBSi4"></div>
</div>
```

##Parameters
- You can pass in player parameters as an object within the plugin.
- Please visit [Youtube Embed Parameters](https://developers.google.com/youtube/player_parameters) for available options.

```
$('body').trackVideo({
    playerVars: {
        'rel': 0,
        'showinfo': 1
    }
});
```

##KissMetrics
This plugin supports KissMetrics tracking as well. However this is not a requirement and is switched off by default.

To enable this you can simply pass a parameter.

```
$(document).ready(function(){

    $('body').trackVideo({
        'kissMetricsTracking': true
    });

});
```

## Getting started with HTML5 Video Tracking

You will need to assign a title to your video

```
<video data-title="Title of Video Goes here">
```

You can also define a cateory for your video when it is put into GA.

```
<video data-gacategory="welcome video">
```

## Demo
View the [demo page](http://video-tracking.designyourcode.io/)

## Installation - via Bower

bower install --save youtube-api-tracking

## @TODO

 1. Improve settings logic
 2. Add more youtube video parameter options to match Youtube's offering
 3. Improve documentation
 4. Adding NPM installation support
 5. Add documentation to demo page