/*!
 * Tracking for Youtube and HTML5 Videos
 * @version 1.0.0
 * @author DesignyourCode
 * @license The MIT License (MIT)
 */
(function($) {
    $.fn.trackVideo = function(options) {
        if (typeof(ga) == 'undefined') {
            console.warn("Google Analytics is not installed");
        } else {
            
            this.each(function() {
                var type = $(this).data('track-video');

                if (type === "youtube") {
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    var settings = $.extend({
                        'playerVars': {},
                        'kissmetrics': false
                    }, options),
                    playerInfoList = [];

                    $('[id^="player-"]').each(function() {

                        var height = $(this).data('height') ? $(this).data('height') : 480,
                            width = $(this).data('width') ? $(this).data('width') : 853,
                            ytKey = $(this).attr('id').replace('player-', ''),
                            curTitle,
                            curEventData,
                            videoTimer;

                        playerInfoList.push({
                            id: $(this).attr('id'),
                            height: height,
                            width: $(this).data('width'),
                            videoId: ytKey,
                            videoTitle: curTitle
                        });

                        window.onYouTubeIframeAPIReady = function() {
                            if(typeof playerInfoList === 'undefined') {
                                return;
                            }
                            for(var i = 0; i < playerInfoList.length; i++) {
                                var curplayer = createPlayer(playerInfoList[i]);
                            }
                        }

                        function createPlayer(playerInfo) {
                            return new YT.Player('player-' + playerInfo.videoId, {
                                height: playerInfo.height,
                                width: playerInfo.width,
                                videoId: playerInfo.videoId,
                                playerVars: settings.playerVars,
                                events: {
                                    'onStateChange': onPlayerStateChange
                                }
                            });
                        }

                        function onPlayerStateChange(event) {
                            for(var i = 0; i < playerInfoList.length; i++) {
                                var id = playerInfoList[i].id;

                                if ($('#' + id).attr('data-title')) {
                                    curTitle = $('#' + id).data('title');
                                } else if (playerInfoList[i].videoTitle !== undefined) {
                                    curTitle = playerInfoList[i].videoTitle;
                                } else {
                                    curTitle = 'No video title set';
                                }
                            }

                            if (event.data === -1) {
                                curEventData = 'Unstarted';
                            } else if (event.data === 0) {
                                curEventData = 'Ended';
                            } else if (event.data === 1) {
                                curEventData = 'Playing';
                            } else if (event.data === 2) {
                                clearTimeout(videoTimer);

                                videoTimer = setTimeout(function() {
                                    pausedState(event, event.target.getCurrentTime());
                                }, 2000);
                            } else if (event.data === 3) {
                                curEventData = 'Buffering';
                            } else if (event.data === 5) {
                                curEventData = 'Video cued';
                            }

                            if (event.data !== 2) {
                                pushTrack(event.data, event.target.getCurrentTime());
                            }
                        }

                        function pushTrack(videoState, videoCurTime) {
                            ga('send', 'event', 'Videos', curEventData, curTitle, parseInt(videoCurTime) );

                            if (settings.kissmetrics === true) {
                                _kmq.push(['record', 'Videos', {
                                    'video-title': curTitle,
                                    'video-state': curEventData,
                                    'video-time': parseInt(videoCurTime)
                                }]);
                            }
                        }

                        function pausedState(videoState, videoCurTime) {
                            if (videoState.data === 2) {
                                curEventData = 'Paused';
                                pushTrack(videoState.data, videoCurTime);
                            }
                        }
                    });
                } else if (type === "html5") { 
                    var settings = $.extend({
                        'kissmetrics': false
                    }, options);

                    var videoId = $(this),
                        videoTitle = videoId.data('title'),
                        videoCategory;

                    if (videoId.data('gacategory') === undefined){
                        videoCategory = 'video';
                    } else {
                        videoCategory = videoId.data('gacategory');
                    }

                    // Bind Events
                    videoId.bind('ended', videoEnd);
                    videoId.bind('timeupdate', function(){
                        videoTimeUpdate(this);
                    });
                    videoId.bind('play', videoPlay);
                    videoId.bind('pause', function(){
                        videoPause(this);
                    });

                    // Functions
                    function setKeyFrames (duration) {
                        var quarter = (duration / 4);
                        sessionStorage.setItem('one', quarter);
                        sessionStorage.setItem('two', (quarter * 2));
                        sessionStorage.setItem('three', (quarter * 3));
                    }

                    function videoTimeUpdate (video) {
                        var curTime = (video.currentTime);

                        if (curTime >= sessionStorage.getItem('one') && curTime < sessionStorage.getItem('two')) {
                            ga('send', 'event', videoCategory, '25% video played', videoTitle);
                            if (settings.kissmetrics === true) {
                                _kmq.push(['record', videoCategory, {'video asset 25% video played': videoTitle}]);
                            }
                            sessionStorage.setItem('one', null);
                        } else if (curTime >= sessionStorage.getItem('two') && curTime < sessionStorage.getItem('three')) {
                            ga('send', 'event', videoCategory, '50% video played', videoTitle);
                            if (settings.kissmetrics === true) {
                                _kmq.push(['record', videoCategory, {'video asset 50% video played': videoTitle}]);
                            }
                            sessionStorage.setItem('two', null);
                        } else if (curTime >= sessionStorage.getItem('three')) {
                            ga('send', 'event', videoCategory, '75% video played', videoTitle);
                            if (settings.kissmetrics === true) {
                                _kmq.push(['record', videoCategory, {'video asset 75% video played': videoTitle}]);
                            }
                            sessionStorage.setItem('three', null);
                        }
                    }

                    function videoEnd () {
                        ga('send', 'event', videoCategory, '100% video played', videoTitle);
                        if (settings.kissmetrics === true) {
                            _kmq.push(['record', videoCategory, {'100% video played': videoTitle}]);
                        }
                    }

                    function videoPlay () {
                        ga('send', 'event', videoCategory, 'video played', videoTitle);
                        if (settings.kissmetrics === true) {
                            _kmq.push(['record', videoCategory, {'video played': videoTitle}]);
                        }

                        setKeyFrames(this.duration);
                    }

                    function videoPause (video) {
                        var pauseCurTime = video.currentTime,
                            pauseDuration = video.duration;

                        ga('send', 'event', videoCategory, 'video paused', videoTitle);
                        if (settings.kissmetrics === true) {
                            _kmq.push(['record', videoCategory, {'video paused at': pauseCurTime + '/' + pauseDuration}]);
                        }
                    }
                } else {
                    console.warn("It looks like your video type isn't correct. Options include: html5 | youtube");
                }

            });
            return this;
        }
    };
}(jQuery));