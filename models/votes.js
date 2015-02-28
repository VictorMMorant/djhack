Votes = new Mongo.Collection("votes");

Votes.allow({
	insert: function(userId, doc) {
		check(doc.partyId, ObjectId);
		return !Votes.findOne({userId: doc.userId, songId: doc.songId});	
	},
	update: function(userId, doc ,fields,modifier) {
		return false;
	},
	remove: function(userId, doc) {
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
