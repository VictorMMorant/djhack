/* globals $: false */
/* globals Songs: false */
/* globals Votes: false */

Template.client.helpers({
	songs : function() {
		return Songs.find({
			partyId: Session.get("partyId"),
			archived: false,
			alreadyPlayed: false
		}, {sort:[["votesCount", "desc"]]}).map(function(song) {
          song.swipable = !song.isPlaying && !Votes.findOne({
						userId: Session.get('userId'), songId: song._id});
          song.width = Math.min(50, Math.abs(song.votesCount) * 50 / 15);
          song.left = song.votesCount < 0 ? 50 - song.width : 50;
          song.color = song.votesCount < 0 ? "#ED5565" : "#A0D468";
          return song;
        });
	}
});

Template.client.events({
	"click #addSong" : function(e) {
		e.preventDefault();
		Session.set("page", "addSong");
	}
});

Template.song.events({
	"click .upvoted" : function(e, t) {
		e.preventDefault();
		var userId = Session.get("userId");
		var songId = e.currentTarget.id;
		Meteor.call("vote", userId, songId, 1, function(error) {
			if (error) {console.log("Can't upvote the song", error);}
			$(t.find(".song")).removeClass("swiped");
		});
	},
	"click .downvoted" : function(e, t) {
		e.preventDefault();
		var userId = Session.get("userId");
		var songId = e.currentTarget.id;
		Meteor.call("vote", userId, songId, -1, function(error) {
			if (error) {console.log("Can't downvote the song", error);}
			$(t.find(".song")).removeClass("swiped");
		});
	}
});

Template.song.gestures({
  'swipeleft .song.swipable': function(e) {
    e.preventDefault();
    $(this.find(".song")).addClass("swiped");
  },
  'swiperight .song.swipable': function(e) {
    e.preventDefault();
    $(this.find(".song")).removeClass("swiped");
  }
});
