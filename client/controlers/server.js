Template.server.created = function () {
  Session.set('isPlaying', false);
  Session.set('currentSongId', null);
};

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
        if (err) console.log(err);
        else {
          //Reload iframe with new youtube video id 
          Session.set('currentSongId', null);
        }
      });
  }

});