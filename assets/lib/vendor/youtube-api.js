var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerInfoList = [];

$(document).ready(function(){
  $('[id^="player-"]').each(function() {

    var height = $(this).data('height') ? $(this).data('height') : 390,
        width = $(this).data('width') ? $(this).data('width') : 640;

    playerInfoList.push({
      id: $(this).attr('id'),
      height: height,
      width: $(this).data('width'),
      videoId: $(this).attr('id').replace('player-', '')
    });
  });
});

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
    videoId: playerInfo.videoId
  });
}