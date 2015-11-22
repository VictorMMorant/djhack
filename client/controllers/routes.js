Session.set('page', 'home');
Session.set('userId', Session.get('userId') || new Mongo.ObjectID().toHexString());

UI.body.rendered = () => {
	const id = location.hash.substring(2);
	if (id.length === 0) {
		location.hash = '#/';
	} else {
		Session.set('partyId', id);
		Session.set('page', 'client');
	}
};

UI.body.helpers({
  page(page) {
		return Session.get('page') === page;
	},
});
