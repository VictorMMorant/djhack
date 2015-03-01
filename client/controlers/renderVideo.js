Template.server.rendered = function () {
  $(document).ready(function () {
    var a = document.createElement('script');
    a.id = 'www-widgetapi-script';
    a.src = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vfldTtH0_/www-widgetapi.js';
    $("head").append(a);
  });
  yt = new YTPlayer("player", {
    height: "0",
    width: "0"
  });
  
  this.autorun(pickNextSong);
  this.autorun(handlePlaying);
  this.autorun(handlePlayerEvents);
}

var pickNextSong = function () {
  var song = Songs.findOne({
      partyId: Session.get('partyId'),
      archived: false,
      alreadyPlayed: false,
      isPlaying: false
    }, {
      sort: {
        votesCount: -1
      }
    });

if (!Session.get("currentSongId") && song) {
  Session.set('currentSongId', song._id);
  Session.set('videoId', song.youtubeId);
}
};

var handlePlaying = function () {
  var yt_id = 'xz7usUEPWsc'; //Session.get('videoId')
  console.log(Session.get('isPlaying'));
  if (yt.ready() && Session.get('isPlaying')) {
    yt.player.setPlaybackQuality('small');
    yt.player.loadVideoById(yt_id);
  }
};

var handlePlayerEvents = function () {
  if (yt.ready()) {
    yt.player.addEventListener('onStateChange', onPlayerStateChange);
  }
};

function onPlayerStateChange(event) {

    switch(event.data){
      case YT.PlayerState.PLAYING:
        Session.set('isPlaying', true);
        break;
      case YT.PlayerState.PAUSED:
        Session.set('isPlaying', false);
        break;
      case YT.PlayerState.ENDED:
        Meteor.call('alreadyPlayed', Session.get('currentSongId'),
        function (err, result) {
          if(err) console.log(err);
          else{
            //Reload iframe with new youtube video id 
            Session.set('currentSongId', null);
          }
        });
        break;
    }
}