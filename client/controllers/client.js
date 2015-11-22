/* global Songs, Votes */

Template.client.helpers({
	songs() {
		return Songs.find({
				partyId: Session.get('partyId'),
				archived: false,
				alreadyPlayed: false,
			}, { sort: [ ['votesCount', 'desc'] ] })
			.map((song) => {
				song.swipable = !song.isPlaying && !Votes.findOne({
					userId: Session.get('userId'),
					songId: song._id,
				});
				song.width = Math.min(50, Math.abs(song.votesCount) * 50 / 15);
				song.left = song.votesCount < 0 ? 50 - song.width : 50;
				song.color = song.votesCount < 0 ? '#ED5565' : '#A0D468';
				return song;
			});
	},
});

Template.client.events({
	'click #addSong': (event) => {
		event.preventDefault();
		Session.set('page', 'addSong');
	},
});

Template.song.events({
	'click .upvoted': (event, templateInstance) => {
		event.preventDefault();
		const userId = Session.get('userId');
		const songId = event.currentTarget.id;
		Meteor.call('vote', userId, songId, 1, error => {
			if (error) {
				console.log('Can\'t upvote the song', error);
			}
			$(templateInstance.find('.song')).removeClass('swiped');
		});
	},
	'click .downvoted': (event, templateInstance) => {
		event.preventDefault();
		const userId = Session.get('userId');
		const songId = event.currentTarget.id;
		Meteor.call('vote', userId, songId, -1, error => {
			if (error) {
				console.log('Can\'t downvote the song', error);
			}
			$(templateInstance.find('.song')).removeClass('swiped');
		});
	},
});

Template.song.gestures({
	'swipeleft .song.swipable': (event) => {
		event.preventDefault();
		$(this.find('.song')).addClass('swiped');
	},
	'swiperight .song.swipable': (event) => {
		event.preventDefault();
		$(this.find('.song')).removeClass('swiped');
	},
});
