Template.createParty.events({
	'submit #createParty': (event, templateInstance) => {
		event.preventDefault();

		Meteor.call('createParty', templateInstance.find('#partyName').value,
			templateInstance.find('#partyPassword').value,
			(error, result) => {
				if (error) {
					console.log("Can't create party ", error);
				} else {
					Session.set('page', 'server');
					Session.set('partyId', result);
				}
			});
	},
});
