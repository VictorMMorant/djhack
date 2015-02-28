Template.client.helpers({
	songs : function() {
		return Songs.find({ partyId: Session.get("partyId"), archived : { $exists : false }});
	}
});

Template.client.events({
	"click #addSong" : function(e) {
		e.preventDefault();

		Session.set("page", "addSong");
	},
	"click .upvoted" : function(e, t) {
		e.preventDefault();		
		var userId = Session.get("userId");
		var songId = e.currentTarget.id;
		Meteor.call("vote", userId, songId, 1, function(error, result){
			if(error)
				console.log("Can't upvote the song", error);
		});
		
	},
	"click .downvoted" : function(e, t) {
		e.preventDefault();
		var userId = Session.get("userId");
		var songId = e.currentTarget.id;
		Meteor.call("vote", userId, songId, -1, function(error, result){
			if(error)
				console.log("Can't downvote the song", error);
			
		});
	}
});