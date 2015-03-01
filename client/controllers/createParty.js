Template.createParty.events({
	"submit #createParty" : function(e, t) {
		e.preventDefault();
		
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
