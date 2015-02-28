Session.set("page", "home");
Session.set("userId",  Session.get("userId") || new Mongo.ObjectID().toHexString());

UI.body.helpers({
	pageHome: function() {
		return Session.get("page") === "home";
	},
	pageServer: function() {
		return Session.get("page") === "server";
	},
	pageCreateParty: function() {
		return Session.get("page") === "createParty";
	},
	pageClient: function() {
		return Session.get("page") === "client";
	}
});