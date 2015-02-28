Parties = new Mongo.Collection("parties");

Parties.allow({
	insert: function(userId, doc) {
		check(doc.name, String);
		return !Parties.findOne({ name : doc.name});	
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
	name,
	slugName,
	password,
	createdAt,
	connectionId

}

*/
