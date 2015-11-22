/* globals Parties, Songs, Votes */

Meteor.publish('party', function partyPublication(partyId) {
  check(partyId, Match.OneOf(String, Meteor.Collection.ObjectID, null, undefined));
	if (partyId) {
		return Parties.find(partyId);
	}
	this.ready();
});

Meteor.publish('songs', function songsPublication(partyId) {
  check(partyId, Match.OneOf(String, Meteor.Collection.ObjectID, null, undefined));
	if (partyId) {
		return Songs.find({
			partyId,
			archived: false,
		});
	}
	this.ready();
});

Meteor.publish('votes', function votesPublication(partyId, userId) {
  check(partyId, Match.OneOf(String, Meteor.Collection.ObjectID, null, undefined));
  check(userId, Match.OneOf(String, null, undefined));
	if (partyId) {
		return Votes.find({userId});
	}
	this.ready();
});
