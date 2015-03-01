Template.client.helpers({
	songs : function() {
		return Songs.find({ partyId: Session.get("partyId"), archived: false, alreadyPlayed: false }, {sort:[["votesCount", "desc"]]});
	}
});

Template.client.events({
	"click #addSong" : function(e) {
		e.preventDefault();

		Session.set("page", "addSong");
	}
});

Template.song.events({
	"click .upvoted" : function(e) {
		e.preventDefault();		
		var userId = Session.get("userId");
		var songId = e.currentTarget.id;
		Meteor.call("vote", userId, songId, 1, function(error, result){
			if(error)
				console.log("Can't upvote the song", error);
            else
              $(this.find(".song")).removeClass("swiped");
		});
		
	},
	"click .downvoted" : function(e) {
		e.preventDefault();
		var userId = Session.get("userId");
		var songId = e.currentTarget.id;
		Meteor.call("vote", userId, songId, -1, function(error, result){
			if(error)
				console.log("Can't downvote the song", error);
            else
              $(this.find(".song")).removeClass("swiped");
			
		});
	}
});

Template.song.gestures({
  'swipeleft .song': function (e) {
    e.preventDefault();
    $(this.find(".song")).addClass("swiped");
  },
  'swiperight .song': function (e) {
    e.preventDefault();
    $(this.find(".song")).removeClass("swiped");
  }
});
