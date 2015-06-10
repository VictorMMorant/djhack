Template.server.created = function () {
  Session.set('isPlaying', false);
  Session.set('videoReady', false);
  Session.set('currentSongId', null);
  Session.set('videoId', null);
  Session.set('shouldLoadSong', true);
};

Template.server.helpers({
  play: function () {
    return Session.get('isPlaying');
  },
  name: function () {
    return Parties.findOne(Session.get("partyId")) && Parties.findOne(Session.get("partyId")).name;
  },
  currentSong: function () {
    return Songs.findOne(Session.get("currentSongId"));
  },
  time: function() {
    return Session.get('time');
  }
});

Template.server.events({
  'click #play': function () {
    if(player)
    {
      if(Session.get('isPlaying')){
        player.pauseVideo();
      }
      else{ 
        player.unMute(); 
        player.setVolume(80);
        player.playVideo(); 
      }
      Session.set('isPlaying', !Session.get('isPlaying'));
    }
  },
  'click #forward': function () {
    //Skip to the next song
    Meteor.call('alreadyPlayed', Session.get('partyId'), Session.get('currentSongId'), function (err) {
        if (err) console.log(err);
        else {
          //Reload iframe with new youtube video id
          Session.set('time', '00:00');
          Session.set('currentSongId', null);
          Session.set('shouldLoadSong', true);
          Session.set('videoReady', false);
          Session.set('videoId', null);

        }
      });
  },
  'click .reset': function () {
    //archived all the songs
    Meteor.call('archive', Session.get('partyId'), function (err) {
        if (err) console.log(err);
        else {
          //Reload iframe with new youtube video id
          Session.set('currentSongId', null);
          if(player)
          {
            if(Session.get('isPlaying'))
              player.pauseVideo();
            Session.set('isPlaying', false);
          }
        }
      });
  }

});
