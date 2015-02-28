
Template.addSong.helpers({



});

Template.addSong.events({
	"change #query" : function(e,t) {
		
		e.preventDefault();

		var query = e.currentTarget.value;
		//API CALL

	},
	"click .song" : function(e,t) {
		e.preventDefault();

		Method.call("addSong", t.find("#title").value ,t.find("#thumbnail").src, function(error,result) {
			if(error) {
				console.log("Can't add the song", error);
			} else {
				Session.set("page","client");
			}
		});



	}

});