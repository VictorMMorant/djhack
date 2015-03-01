Session.set("page", "home");
Session.set("userId",  Session.get("userId") || new Mongo.ObjectID().toHexString());

UI.body.rendered = function() {
  var id = location.hash.substring(2);
  console.log(id);
  if (id.length === 0) {
    location.hash = "#/";
  } else {
    Session.set("partyId", id);
    Session.set("page", "client");
  }
};

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
	},
	pageAddSong: function() {
		return Session.get("page") === "addSong";
	}
});
