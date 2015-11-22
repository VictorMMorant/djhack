/* globals Songs: true */

Songs = new Mongo.Collection('songs');

Songs.allow({
	insert(userId, doc) {
		return !Songs.findOne({
			partyId: doc.partyId,
			archived: {
				$exists: false,
			},
		});
	},
	update() {
		return false;
	},
	remove() {
		return false;
	},
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
