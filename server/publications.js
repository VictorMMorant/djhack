Meteor.publish("party", function(partyId) {
	if(partyId) {
		Parties.findOne(partyId);
	} else {
		this.ready();
	}
});

Meteor.publish("songs", function(partyId){
	
	if(partyId) {
		Songs.find({ partyId: partyId, archived : { $exists : false }});

	} else {
		this.ready();
	}
});

Meteor.publish("votes", function( partyId, userId){
	
	if(partyId) {
		
		var songs = Songs.find({ partyId: partyId, archived : { $exists : false }}).map(function(song){
			return song._id;
		});

		Votes.find({ songId: {$in : songs }, userId: userId});

	} else {
		this.ready();
	}
});