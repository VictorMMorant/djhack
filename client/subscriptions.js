Tracker.autorun(() => {
	Meteor.subscribe('party', Session.get('partyId'));
	Meteor.subscribe('songs', Session.get('partyId'));
	Meteor.subscribe('votes', Session.get('partyId'), Session.get('userId'));
});
