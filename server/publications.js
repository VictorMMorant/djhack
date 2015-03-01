Meteor.publish("party", function (partyId) {
  if (partyId) {
    return Parties.find(partyId);
  } else {
    this.ready();
  }
});

Meteor.publish("songs", function (partyId) {

  if (partyId) {
    return Songs.find({
      partyId: partyId,
      archived: false
    });

  } else {
    this.ready();
  }
});

Meteor.publish("votes", function (partyId, userId) {

  if (partyId) {
    return Votes.find({
      userId: userId
    });
  } else {
    this.ready();
  }
});
