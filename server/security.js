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
		
		check(userId, String);
		check(songId, String);
		check(vote, Number);

		var song = Songs.findOne(songId);
		var voted = Votes.findOne({ userId: userId, songId: songId});
		var boolUpvoted = vote > 0;

		if(song && !voted) {
			
			Songs.update(songId,{ $set: { updatedAt: new Date()}, $inc : {votesCount : parseInt(vote)} });
			
			Votes.insert({songId: songId, userId: userId, createdAt: new Date(), upvoted: boolUpvoted});
			return "ok";
		} else {
			//  Error Voting !
			throw new Meteor.Error("votingError", "You already have voted.");
		}
	},
	addSong : function(userId, partyId, youtubeId, title, thumbnail) {
		check(userId, String);
		check(partyId, String);
		check(youtubeId, String);
		check(title, String);
		check(thumbnail, String);

		var song = Songs.findOne({ youtubeId: youtubeId});

		if(song) {
			//Upvote it
			return Meteor.call("vote",userId,song._id,1); // NO Callback synchronous
		} else {
			//Add it
			var songId = Songs.insert({
              partyId: partyId,
              youtubeId: youtubeId,
              title: title,
              thumbnail: thumbnail,
              archived: false,
              isPlaying: false,
		      alreadyPlayed: false,
              createdAt: new Date(),
              updatedAt: new Date(),
              votesCount: 0
            });
            return songId;
		}
	}
});
