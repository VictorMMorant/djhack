Meteor.methods({
	joinParty : function(partyName) {
		check(partyName, String);
		var party = Parties.findOne({ name: partyName});

		if(party) {
			return party._id;
		} else {
			throw new Meteor.Error("joinPartyError", "No party found");
		}
	},
	createParty : function(partyName, partyPassword) {
		check(partyName, String);
		check(partyPassword, String);
		var party = Parties.findOne({ name: partyName});
		
		if(party && party.password !== partyPassword) {
			// Invalid Login
			throw new Meteor.Error("loginError","The party name and password doesn't match.");

		} else if(party && party.password === partyPassword) {
			//Log into the party
			Parties.update(party._id,{ $set : {connectionId: this.connection.id, updatedAt: new Date()} });
			return party._id;
		} else {
			//Create party
		    var slug = partyName.toString().toLowerCase()
		    				.replace(/\s+/g,'-')
		    				.replace(/[^\w\-]+/g,'')
		    				.replace(/\-\-+/g,'-')
		    				.replace(/^-+/,'')
		    				.replace(/-+$/,'');

			var id = Parties.insert({ name: partyName, slug: slug, password: partyPassword, connectionId: this.connection.id, createdAt: new Date()});

			return id;

		}

	},
	vote : function(userId, songId, vote) {
		check(userId, Object);
		check(songId, Object);
		check(vote, Number);

		var song = Songs.findOne(songId);
		var voted = Votes.findOne({ userId: userId, songId: songId});
		var upvoted = vote > 0  ? true : false;

		if(song && !!voted) {
			Song.update(songId,{votesCount : {$inc : vote}, updatedAt: new Date()});
			Votes.insert({songId: songId, userId: userId, createdAt: new Date(), upvoted: upvoted});
		} else {
			//  Error Voting !
			throw new Meteor.Error("votingError","There is an error processing the vote.");
		}
	},
	addSong : function(title, thumbnail, youtubeId) {
		check(title, String);
		check(thumbnail, String);



	}
});