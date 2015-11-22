/* globals Votes: true */

Votes = new Mongo.Collection('votes');

Votes.allow({
	insert(userId, doc) {
		return !Votes.findOne({
			userId: doc.userId,
			songId: doc.songId,
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
	songId,
	userId,
	createdAt,
	upvoted

}

*/
