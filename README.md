# HTML5 Video Tracking

This is a plugin for enabling Google Analytics Tracking for HTML5 Videos. The idea is that you just include this script and let it do its thing. No need to configure, or set anything up.

### Requirements
 - Google Universal Analytics Script
 - jQuery 1.9+
 - This plugin

## Usage:
- Start by adding the required JavaScript files.
- Use videotracking.js for development and videotracking.min.js for production.

#### You must include GA code on your site
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

- Then add the following (remember not to duplicate document.ready, if you already have this just add the plugin initialisation code):

```
$(document).ready(function(){
	// Video Tracking
	$('body').trackVideo();
});
```

- The plugin will loop through the page, find all the div with 'player-' and then build the Youtube video accordingly.
