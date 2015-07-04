/* globals Votes: true */

Votes = new Mongo.Collection("votes");

Votes.allow({
	insert: function(userId, doc) {
		return !Votes.findOne({userId: doc.userId, songId: doc.songId});
	},
	update: function() {
		return false;
	},
	remove: function() {
		return false;
	}
});

/*

{
	_id,
	songId,
	userId,
	createdAt,
	upvoted

}

*/
