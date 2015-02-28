Songs = new Mongo.Collection("songs");

Songs.allow({
	insert: function(userId, doc) {
		check(doc.partyId, ObjectId);
		return !Songs.findOne({ partyId : doc.partyId, archived: { $exists : false }});	
	},
	update: function(userId, doc ,fields,modifier) {
		check(doc.songId, ObjectId);
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
	//youtubeId,
	archived,
	title,
	description,
	//artist,
	thumbnail,
	isPlaying,
	alreadyPlayed,
	createdAt,
	updatedAt,
	votesCount

}

*/
