/* globals Parties, Songs, Votes */

Meteor.methods({
	joinParty(partyName) {
		check(partyName, String);
		const party = Parties.findOne({
			name: partyName,
		});

		if (!party) {
			const up = new Meteor.Error('joinPartyError', 'No party found');
			throw up;
		}
		return party._id;
	},
	createParty(partyName, partyPassword) {
		check(partyName, String);
		check(partyPassword, String);
		const party = Parties.findOne({
			name: partyName,
		});

		if (party && party.password !== partyPassword) {
			// Invalid Login
			throw new Meteor.Error('loginError', 'The party name and password doesn\'t match.');
		} else if (party && party.password === partyPassword) {
			// Log into the party
			Parties.update(party._id, {
				$set: {
					connectionId: this.connection.id,
					updatedAt: new Date(),
				},
			});
			return party._id;
		} else {
			// Create party
			const slug = partyName.toString().toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^\w\-]+/g, '')
				.replace(/\-\-+/g, '-')
				.replace(/^-+/, '')
				.replace(/-+$/, '');

			const id = Parties.insert({
				name: partyName,
				slug,
				password: partyPassword,
				connectionId: this.connection.id,
				createdAt: new Date(),
			});
			return id;
		}
	},
	vote(userId, songId, vote) {
		check(userId, String);
		check(songId, String);
		check(vote, Number);

		const song = Songs.findOne(songId);
		const voted = Votes.findOne({
			userId,
			songId,
		});
		const upvoted = vote > 0;

		if (!song || voted) {
			//  Err.0or Voting !
			throw new Meteor.Error('votingError', 'You already have voted.');
		}
		Songs.update(songId, {
			$set: {
				updatedAt: new Date(),
			},
			$inc: {
				votesCount: parseInt(vote, 10),
			},
		});

		Votes.insert({
			songId,
			userId,
			createdAt: new Date(),
			upvoted,
		});
		return 'ok';
	},
	addSong(userId, partyId, youtubeId, title, thumbnail) {
		check(userId, String);
		check(partyId, String);
		check(youtubeId, String);
		check(title, String);
		check(thumbnail, String);

		const song = Songs.findOne({
			youtubeId: youtubeId,
			partyId: partyId,
			archived: false,
		});

		if (song) {
			// Upvote it
			return Meteor.call('vote', userId, song._id, 1); // NO Callback synchronous
		}

		// Add it
		const songId = Songs.insert({
			partyId,
			youtubeId,
			title,
			thumbnail,
			archived: false,
			isPlaying: false,
			alreadyPlayed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			votesCount: 0,
		});
		return songId;
	},
	playing(partyId, currentSongId) {
		check(partyId, String);
		check(currentSongId, String);

		if (this.connection.id === Parties.findOne(partyId).connectionId) {
			Songs.update(currentSongId, {
				$set: {
					isPlaying: true,
				},
			});
		} else {
			throw new Meteor.Error('connectionError', 'Seems like your trying to hack!');
		}
	},
	alreadyPlayed(partyId, currentSongId) {
		check(partyId, String);
		check(currentSongId, String);
		if (this.connection.id !== Parties.findOne(partyId).connectionId) {
			throw new Meteor.Error('connectionError', 'Seems like your trying to hack!');
		}
		Songs.update(currentSongId, {
			$set: {
				isPlaying: false,
				alreadyPlayed: true,
			},
		});
		return 'ok';
	},
	archive(partyId) {
		check(partyId, String);
		if (this.connection.id !== Parties.findOne(partyId).connectionId) {
			throw new Meteor.Error('connectionError', 'Seems like your trying to hack!');
		}
		Songs.update({
			partyId,
			archived: false,
		}, {
			$set: {
				isPlaying: false,
				alreadyPlayed: false,
				archived: new Date(),
			},
		}, {multi: true});
		const songIds = Songs.find({partyId: partyId}).map(song => song._id);
		Votes.remove({
			songId: {
				$in: songIds,
			},
		});
		return 'ok';
	},
});
