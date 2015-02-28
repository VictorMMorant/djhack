


Template.createParty.events({
	"submit #createParty" : function(e, t) {
		e.preventDefault();
debugger;
		Session.set("spotifyUser", t.find("#spotifyUser").value);
		Session.set("spotifyPassword", t.find("#spotifyPassword").value);
		Meteor.call("createParty", t.find("#partyName").value,t.find("#partyPassword").value, function(error, result){
			if(error)
				console.log("Can't create party ", error);
			else {
				Session.set("page","server");
				Session.set("partyId", result);
			}
		});

	}	
});