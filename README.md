# YouTube Tracking

Fancy tracking Youtube videos on your site? This script will allow you to tracking videos, just include jquery, this plugin and follow the instructions below.

## Usage:
- Start by adding the required JavaScript files.
- Use youtube-api.js for development and youtube-api.min.js for production.

```
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script type="text/javascript" src="assets/lib/vendor/youtube-api.min.js"></script>
```

- Then add the following (remember not to duplicate document.ready, if you already have this just add the plugin initialisation code):

```
$(document).ready(function(){

  $('body').trackYoutube();

});
```

- The plugin will loop through the page, find all the div with 'player-' and then build the Youtube video accordingly.

```
<div id="player-<YOUTUBE KEY>"></div>

<!-- For example: -->
<div id="player-ScMzIvxBSi4"></div>
```

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
.video.keep-ratio {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}
.video.keep-ratio iframe {     
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

And add a parent div with a class of vide and keep-ratio
```
<div class="video keep-ratio">
	<div id="player-ScMzIvxBSi4"></div>
</div>
```

##Parameters
- You can pass in player parameters as an object within the plugin.
- Please visit [Youtube Embed Parameters](https://developers.google.com/youtube/player_parameters) for available options.

```
$('body').trackYoutube({
  playerVars: {
    'rel': 0,
    'showinfo': 1
  }
});
```