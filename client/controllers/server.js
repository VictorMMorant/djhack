/* global Parties, Songs */

Template.server.onCreated(() => {
	Session.set('isPlaying', false);
	Session.set('videoReady', false);
	Session.set('currentSongId', null);
	Session.set('videoId', null);
	Session.set('shouldLoadSong', true);
	Session.set('curretPausedSongTime', null);
});

Template.server.helpers({
	play() {
		return Session.get('isPlaying');
	},
	name() {
    const party = Parties.findOne(Session.get('partyId'));
		return party && party.name;
	},
	currentSong() {
		return Songs.findOne(Session.get('currentSongId'));
	},
	time() {
		return Session.get('time');
	},
});

function timeToSeconds(str) {
	const p = str.split(':');
	let s = 0;
	let m = 1;
	while (p.length > 0) {
		s += m * parseInt(p.pop(), 10);
		m *= 60;
	}
	return s;
}

Template.server.events({
	'click #play': () => {
		if (!window.player) { return; }
		if (Session.get('isPlaying')) {
			Session.set('currentPausedSongTime', timeToSeconds(Session.get('time')));
			window.player.pauseVideo();
		} else {
			window.player.unMute();
			window.player.setVolume(80);
			if (Session.get('currentPausedSongTime')) {
				window.player.seekTo(Session.get('currentPausedSongTime'), false);
			}
			window.player.playVideo();
		}
		Session.set('isPlaying', !Session.get('isPlaying'));
	},
	'click #forward': () => {
		// Skip to the next song
		Meteor.call('alreadyPlayed',
			Session.get('partyId'),
			Session.get('currentSongId'),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					// Reload iframe with new youtube video id
					Session.set('time', '00:00');
					Session.set('currentSongId', null);
					Session.set('shouldLoadSong', true);
					Session.set('videoReady', false);
					Session.set('videoId', null);
				}
			});
	},
	'click .reset': () => {
		// archived all the songs
		Meteor.call('archive', Session.get('partyId'), (err) => {
			if (err) {
				console.log(err);
			} else {
				// Reload iframe with new youtube video id
				Session.set('currentSongId', null);
				if (!window.player) { return; }
				if (Session.get('isPlaying')) {
					window.player.pauseVideo();
				}
				Session.set('isPlaying', false);
			}
		});
	},
});
