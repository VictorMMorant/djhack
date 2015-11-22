/* global YT, Songs */

function pickNextSong() {
	const song = Songs.findOne({
		partyId: Session.get('partyId'),
		archived: false,
		alreadyPlayed: false,
		isPlaying: false,
	}, { sort: { votesCount: -1}});

	if (!Session.get('currentSongId') && song) {
		Session.set('currentSongId', song._id);
		Session.set('videoId', song.youtubeId);
	}
}

function handlePlaying() {
	const youtubeId = Session.get('videoId');
	if (youtubeId && Session.get('isPlaying')) {
		if (Session.get('shouldLoadSong')) {
			window.player.setPlaybackQuality('small');
			window.player.loadVideoById(youtubeId);
			Session.set('shouldLoadSong', false);
			Session.set('videoReady', true);
		}
		Meteor.call('playing',
			Session.get('partyId'),
			Session.get('currentSongId'));
	}
}

function toHHMMSS(s) {
	const nbSecondes = parseInt(s, 10);
	let hours = Math.floor(nbSecondes / 3600);
	let minutes = Math.floor((nbSecondes - (hours * 3600)) / 60);
	let seconds = nbSecondes - (hours * 3600) - (minutes * 60);

	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	const time = minutes + ':' + seconds;
	return time;
}

let refreshIntervalId;

function updateTimer() {
	if (Session.get('videoReady') && Session.get('isPlaying')) {
		if (!refreshIntervalId) {
			refreshIntervalId = setInterval(() => {
				const currentTime = window.player.getCurrentTime();
				if (currentTime) {
					Session.set('time', toHHMMSS(currentTime.toString()));
				}
			}, 1000);
		}
	} else if (Session.get('shouldLoadSong')) {
		clearInterval(refreshIntervalId);
		refreshIntervalId = null;
		Session.set('time', '00:00');
	}
}

function onPlayerStateChange(event) {
	switch (event.data) {
	case YT.PlayerState.ENDED:
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
					Session.set('videoId', null);
					Session.set('shouldLoadSong', true);
				}
			});
		break;
	case YT.PlayerState.PAUSED:
		Session.set('isPlaying', false);
		break;
	case YT.PlayerState.PLAYING:
		Session.set('isPlaying', true);
    break;
  default:
    return;
	}
}

Template.server.onRendered(function rendered() {
	$(document).ready(() => {
		const a = document.createElement('script');
		a.id = 'www-widgetapi-script';
		a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vfldTtH0_/www-widgetapi.js';
		$('head').append(a);
	});

	window.onYouTubeIframeAPIReady = () => {
		window.player = new YT.Player('player', {
			height: '0',
			width: '0',
			events: {
				onReady() {
					Session.set('videoReady', true);
				},
				onStateChange: onPlayerStateChange,
			},
		});
	};

	this.autorun(pickNextSong);
	this.autorun(handlePlaying);
	this.autorun(updateTimer);

	$('#qr-code').qrcode({
		text: 'http://dj2.meteor.com/#/' + Session.get('partyId'),
	});
});
