/* global gapi */

const songsList = new ReactiveVar([], (a, b) => {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  return a.every((x, i) => x === b[i]);
});

function apiCall() {
  if (Session.get('query')) {
    gapi.client.load('youtube', 'v3', () => {
      const request = gapi.client.youtube.search.list({
        q: Session.get('query'),
        part: 'snippet',
        type: 'video',
        fields: 'items(id,snippet)',
        key: 'AIzaSyBt0EpIzbUteYvSET-nkDBX2fJgpC6xRfY',
      });

      request.execute(response => {
        const newSongsList = response.items
          .filter(x => x.id !== undefined)
          .map((song, index) => {
            return {
              index,
              id: song.id.videoId,
              title: song.snippet.title,
              image: song.snippet.thumbnails.medium.url,
            };
          });
        songsList.set(newSongsList);
      });
    });
  }
}

Template.addSong.onRendered(function rendered() {
  this.autorun(apiCall);
});

Template.addSong.helpers({
  youtubeSongs() {
    return songsList.get();
  },
});

Template.addSong.events({
  'click .back': (event) => {
    event.preventDefault();
    Session.set('query', null);
    Session.set('page', 'client');
  },
  'input #query': (event) => {
    event.preventDefault();
    Session.set('query', event.currentTarget.value);
  },
  'submit': (event) => {
    event.preventDefault();
  },
  'click .song': (event) => {
    event.preventDefault();
    const song = songsList.get()[event.currentTarget.id];
    if (song) {
      Meteor.call('addSong', Session.get('userId'), Session.get('partyId'),
        song.id, song.title, song.image, (error) => {
          if (error) {
            console.log("Can't add the song", error);
          } else {
            Session.set('query', null);
            Session.set('page', 'client');
          }
        });
    }
  },
});
