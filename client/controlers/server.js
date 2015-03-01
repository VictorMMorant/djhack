Template.server.created = function () {
  Session.set('isPlaying', false);
  Session.set('currentSongId', null);
  Session.set('videoId', null);
};

Template.server.helpers({
  play: function () {
    return Session.get('isPlaying');
  },
  name: function () {
    return Parties.findOne(Session.get("partyId")).name;
  },
  currentSong: function () {
    return Songs.findOne(Session.get("currentSongId"));
  }
});

Template.server.events({
  'click #play': function () {
    if(yt)
    {
      if(Session.get('isPlaying'))
        yt.player.pauseVideo();
      else yt.player.playVideo();
    }
    Session.set('isPlaying', !Session.get('isPlaying'));
  },
  'click #forward': function () {
    //Skip to the next song
    Meteor.call('alreadyPlayed', Session.get('currentSongId'), function (err, result) {
        if (err) console.log(err);
        else {
          //Reload iframe with new youtube video id 
          Session.set('currentSongId', null);
        }
      });
  }

});
