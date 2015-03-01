Template.server.created = function () {
  Session.set('isPlaying', false);
  var song = Songs.findOne({
    partyId: Session.get('partyId'),
    archived: false
  }, {
    $sort: {
      votesCount: 1
    }
  });

  if(song) Session.set('currentSongId', song._id);

};

Template.server.rendered = function (){
  YT.load();
}

Template.server.helpers({
  play: function () {
    return Session.get('isPlaying');
  }
});

Template.server.events({
  'click #play': function () {
    Session.set('isPlaying', !Session.get('isPlaying'));
    //Call toggle of YT iframe
  },
  'click #forward': function () {
    //Skip to the next song
    Meteor.call('alreadyPlayed', Session.get('currentSongId'),
      function (err, result) {
        if(err) console.log(err);
        else{
          //Reload iframe with new youtube video id + reinitialize frame
        }
      });
  }

});