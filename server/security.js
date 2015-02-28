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

	}

});