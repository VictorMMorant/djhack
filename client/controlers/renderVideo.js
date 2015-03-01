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

  this.autorun(updateTimer);

  jQuery('#qr-code').qrcode({
    text: "http://dj2.meteor.com/#/" + Session.get('partyId')
  });
}

var pickNextSong = function () {
  console.log('pickSong');
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
  var yt_id = Session.get('videoId');
  if (yt.ready() && Session.get('isPlaying')) {
    yt.player.setPlaybackQuality('small');
    yt.player.loadVideoById(yt_id);
    Meteor.call('playing', Session.get('currentSongId'));
  }
};

var handlePlayerEvents = function () {
  if (yt.ready()) {
    yt.player.addEventListener('onStateChange', onPlayerStateChange);
  }
};


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}

var updateTimer = function () {
  setInterval(function(){
      Session.set('time', yt.player.getCurrentTime().toString().toHHMMSS());
  }, 1000);
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
        Meteor.call('alreadyPlayed', Session.get('currentSongId'), function (err, result) {
          if(err) console.log(err);
          else{
            //Reload iframe with new youtube video id 
            Session.set('currentSongId', null);
          }
        });
        break;
    }
}
