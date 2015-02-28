Songs = new Mongo.Collection("songs");

Songs.allow({
	insert: function(userId, doc) {
		check(doc.partyId, ObjectId);
		return !Songs.findOne({ partyId : doc.partyId, archived: { $exists : false }});	
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
	partyId,
	archived,
	name,
	artist,
	thumbnails,
	isPlaying,
	alreadyPlayed,
	createdAt,
	updatedAt,
	votesCount,

}

*/
