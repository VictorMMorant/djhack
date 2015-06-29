/* globals $: false */
UI.body.helpers({
  gapi: function() {
    $('body').append('<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>');
    return "";
  }
});

Template.home.helpers({
  members: function() {
    return [
      {
        name: 'Mathieu Dutour',
        imageBlack:  "images/mathieu_black.jpg",
        image:  "images/mathieu.jpg",
        facebook: "https://www.facebook.com/mathieu.dutour",
        twitter: "https://twitter.com/MathieuDutour",
        linkedin: "https://uk.linkedin.com/in/mathieudutour"
      },
      {
        name: 'Miguel Martínez',
        imageBlack:  "images/miguel_black.jpg",
        image:  "images/miguel.jpg",
        facebook: "",
        twitter: "",
        linkedin: ""
      },
      {
        name: 'Victor Martínez',
        imageBlack:  "images/victor_black.jpg",
        image:  "images/victor.jpg",
        facebook: "",
        twitter: "",
        linkedin: ""
      },
      {
        name: 'Miao Sun',
        imageBlack:  "images/miao_black.jpg",
        image:  "images/miao.jpg",
        facebook: "",
        twitter: "",
        linkedin: ""
      }
    ];
  }
});

Template.home.events({
	"click .create" : function(e) {
		e.preventDefault();

		Session.set("page", "createParty");
	},
	"submit #join" : function(e, t) {
		e.preventDefault();

		Meteor.call("joinParty", t.find("#partyName").value, function(err, result) {
			if (err) {
				console.log("error to join to the party: ", err);
			} else {
				Session.set("page", "client");
				Session.set("partyId", result);
			}
		});
	}
});
