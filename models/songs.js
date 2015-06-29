Songs = new Mongo.Collection("songs");

Songs.allow({
	insert: function(userId, doc) {
		return !Songs.findOne({partyId : doc.partyId, archived: {$exists : false}});
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
	partyId,
	youtubeId,
	archived,
	title,
	thumbnail,
	isPlaying,
	alreadyPlayed,
	createdAt,
	updatedAt,
	votesCount

}

*/
