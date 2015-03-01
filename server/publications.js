Meteor.publish("party", function (partyId) {
  if (partyId) {
    return Parties.findOne(partyId);
  } else {
    this.ready();
  }
});

Meteor.publish("songs", function (partyId) {

  if (partyId) {
    return Songs.find({
      partyId: partyId,
      archived: {
        $exists: false
      }
    });

  } else {
    this.ready();
  }
});

Meteor.publish("votes", function (partyId, userId) {

  if (partyId) {

    var songs = Songs.find({
      partyId: partyId,
      archived: {
        $exists: false
      }
    }).map(function (song) {
      return song._id;
    });

    return Votes.find({
      songId: {
        $in: songs
      },
      userId: userId
    });

  } else {
    this.ready();
  }
});
