/* globals Parties: true */

Parties = new Mongo.Collection('parties');

Parties.allow({
	insert(userId, doc) {
		check(doc.name, String);
		return !Parties.findOne({
			name: doc.name,
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
	name,
	slugName,
	password,
	createdAt,
	connectionId

}

*/
