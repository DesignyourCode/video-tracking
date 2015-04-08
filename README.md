# YouTube API

## Usage:
1. Start by adding the required JavaScript files.

```
<!-- feel free to use a different jQuery version -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- add the YouTube API Script -->
<script type="text/javascript" src="assets/lib/vendor/youtube-api.js"></script>
```

2. The plugin will loop through the page, find all the div with 'player-' and then build the Youtube video accordingly.

```
<div id="player-<YOUTUBE KEY>"></div>

<!-- For example: -->
<div id="player-ScMzIvxBSi4"></div>
```

## Options

1. You can control the size, by adding a relevant data tag:
```
data-height="390"
data-width="640"
```
By default it will be 640 wide by 390 high.


2. You can ignore the sizing and force the video to load responsively (keeping the aspect ratio).

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