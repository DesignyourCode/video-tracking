var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerInfoList = [];

$(document).ready(function(){
  $('[id^="player-"]').each(function() {

    var height = $(this).data('height') ? $(this).data('height') : 390,
        width = $(this).data('width') ? $(this).data('width') : 640,
        ytKey = $(this).attr('id').replace('player-', '');

    playerInfoList.push({
      id: $(this).attr('id'),
      height: height,
      width: $(this).data('width'),
      videoId: ytKey,
      videoTitle: getVideoTitle(ytKey)
    });
  });
  
});

function getVideoTitle(vID) {
  var result = '';
  
  $.ajax({
    url: '//gdata.youtube.com/feeds/api/videos/' + vID + '?v=2&alt=json',
    async: false,
    success:function(data) {
      result = data.entry.title.$t; 
    }
  });
  
  return result;
}

function onYouTubeIframeAPIReady() {
  if(typeof playerInfoList === 'undefined') {
    return;
  }
  for(var i = 0; i < playerInfoList.length;i++) {
    var curplayer = createPlayer(playerInfoList[i]);
  }
}
function createPlayer(playerInfo) {
  return new YT.Player('player-' + playerInfo.videoId, {
    height: playerInfo.height,
    width: playerInfo.width,
    videoId: playerInfo.videoId,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}
function onPlayerStateChange(event) {
  var curId = $(event.target.c).attr('id'),
      curTitle,
      curEventData;

  for(var i = 0; i < playerInfoList.length; i++) {
    if (curId === playerInfoList[i].id) {
      curTitle = playerInfoList[i].videoTitle;
    }
  }

  if (event.data === -1) {
    curEventData = 'Unstarted';
  } else if (event.data === 0) {
    curEventData = 'Ended';
  } else if (event.data === 1) {
    curEventData = 'Playing';
  } else if (event.data === 2) {
    curEventData = 'Paused';
  } else if (event.data === 3) {
    curEventData = 'Buffering';
  } else if (event.data === 5) {
    curEventData = 'Video cued';
  }

  console.log('send, event, Videos, ' + curTitle + ', ' + curEventData + ' (' + event.data + '), ' + parseInt(event.target.getCurrentTime()) );
  //ga('send', 'event', 'Videos', curTitle, curEventData + ' (' + event.data + ')', parseInt(event.target.getCurrentTime()) );
}
