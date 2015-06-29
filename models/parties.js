Parties = new Mongo.Collection("parties");

Parties.allow({
	insert: function(userId, doc) {
		check(doc.name, String);
		return !Parties.findOne({name : doc.name});
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
	name,
	slugName,
	password,
	createdAt,
	connectionId

}

*/
