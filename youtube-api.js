/**
 * HTML5 Video Tracking
 * @version 1.1.2
 * @author DesignyourCode
 * @license The MIT License (MIT)
 */
$.fn.trackYoutube = function(options) {
    if (typeof(ga) == 'undefined') {
        console.warn("Google Analytics is not installed");
    } else {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var settings = $.extend({
                'playerVars': { 'rel': 0, 'showinfo': 0 },
                'kissMetricsTracking': false
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

                if (id === playerInfoList[i].id) {
                    if ($('#' + id).attr('data-title')) {
                        curTitle = $('#' + id).data('title');
                    } else if (playerInfoList[i].videoTitle !== '') {
                        curTitle = playerInfoList[i].videoTitle;
                    } else {
                        curTitle = 'No video title set';
                    }
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

            if (settings.kissMetricsTracking === true) {
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
    }
};