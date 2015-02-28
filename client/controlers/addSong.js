
Template.addSong.helpers({
	
	youtubeSongs : function(){
		//API CALL
		//SAMPLE DATA
		return [
				  {
				   "id": {
				    "kind": "youtube#video",
				    "videoId": "CevxZvSJLk8"
				   },
				   "snippet": {
				    "publishedAt": "2013-09-05T20:00:22.000Z",
				    "channelId": "UC-8Q-hLdECwQmaWNwXitYDw",
				    "title": "Katy Perry - Roar (Official)",
				    "description": "Get \"Roar\" from Katy Perry's 'PRISM': http://smarturl.it/PRISM Official music video for Katy Perry's \"Roar\" brought to you in Junglescope directed by Grady H...",
				    "thumbnails": {
				     "default": {
				      "url": "https://i.ytimg.com/vi/CevxZvSJLk8/default.jpg"
				     },
				     "medium": {
				      "url": "https://i.ytimg.com/vi/CevxZvSJLk8/mqdefault.jpg"
				     },
				     "high": {
				      "url": "https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg"
				     }
				    },
				    "channelTitle": "KatyPerryVEVO",
				    "liveBroadcastContent": "none"
				   }
				  },
				  {
				   "id": {
				    "kind": "youtube#video",
				    "videoId": "e9SeJIgWRPk"
				   },
				   "snippet": {
				    "publishedAt": "2013-08-12T13:00:29.000Z",
				    "channelId": "UC-8Q-hLdECwQmaWNwXitYDw",
				    "title": "Katy Perry - Roar (Lyric Video)",
				    "description": "Get \"Roar\" from Katy Perry's 'PRISM': http://smarturl.it/PRISM Official lyrics video for Katy Perry's \"Roar\" from 'PRISM' Follow Katy: http://www.katyperry.c...",
				    "thumbnails": {
				     "default": {
				      "url": "https://i.ytimg.com/vi/e9SeJIgWRPk/default.jpg"
				     },
				     "medium": {
				      "url": "https://i.ytimg.com/vi/e9SeJIgWRPk/mqdefault.jpg"
				     },
				     "high": {
				      "url": "https://i.ytimg.com/vi/e9SeJIgWRPk/hqdefault.jpg"
				     }
				    },
				    "channelTitle": "KatyPerryVEVO",
				    "liveBroadcastContent": "none"
				   }
				  },
				  {
				   "id": {
				    "kind": "youtube#video",
				    "videoId": "FqkfBzRb43o"
				   },
				   "snippet": {
				    "publishedAt": "2013-10-07T01:45:21.000Z",
				    "channelId": "UCYBFx-THKRWqAxq66qZk_ww",
				    "title": "Katy Perry - Roar : Part 2 (Official Cover by 10 year-old Mariangeli from HitStreak)",
				    "description": "Mariangeli stars in \"HitStreak,\" a new made-for-mobile series on a cool new app called ShowMobile! Get it Now on iPhone: http://bit.ly/RoarApp or Android:h...",
				    "thumbnails": {
				     "default": {
				      "url": "https://i.ytimg.com/vi/FqkfBzRb43o/default.jpg"
				     },
				     "medium": {
				      "url": "https://i.ytimg.com/vi/FqkfBzRb43o/mqdefault.jpg"
				     },
				     "high": {
				      "url": "https://i.ytimg.com/vi/FqkfBzRb43o/hqdefault.jpg"
				     }
				    },
				    "channelTitle": "",
				    "liveBroadcastContent": "none"
				   }
				  },
				  {
				   "id": {
				    "kind": "youtube#video",
				    "videoId": "4a_zuVYYknk"
				   },
				   "snippet": {
				    "publishedAt": "2014-06-01T18:15:26.000Z",
				    "channelId": "UCK7hrVmAiniaepwtlazzozg",
				    "title": "Roar Lyrics HD - Katy Perry",
				    "description": "song credits: Artist: Katy Perry Album: Prism Released: 2013 Official Song: https://www.youtube.com/watch?v=CevxZvSJLk8 Follow Katy: ...",
				    "thumbnails": {
				     "default": {
				      "url": "https://i.ytimg.com/vi/4a_zuVYYknk/default.jpg"
				     },
				     "medium": {
				      "url": "https://i.ytimg.com/vi/4a_zuVYYknk/mqdefault.jpg"
				     },
				     "high": {
				      "url": "https://i.ytimg.com/vi/4a_zuVYYknk/hqdefault.jpg"
				     }
				    },
				    "channelTitle": "",
				    "liveBroadcastContent": "none"
				   }
				  },
				  {
				   "id": {
				    "kind": "youtube#video",
				    "videoId": "oeyNVOepYyo"
				   },
				   "snippet": {
				    "publishedAt": "2013-09-11T07:00:35.000Z",
				    "channelId": "UCfvzhBHWMequhO2fHZpo7iw",
				    "title": "Katy Perry ROAR MusicVideo Legendado / LYRICS",
				    "description": "ROAR LEGENDADO KATY PERRY ROAR LEGENDADO E COM LETRA VIDEO CLIPE ROAR.",
				    "thumbnails": {
				     "default": {
				      "url": "https://i.ytimg.com/vi/oeyNVOepYyo/default.jpg"
				     },
				     "medium": {
				      "url": "https://i.ytimg.com/vi/oeyNVOepYyo/mqdefault.jpg"
				     },
				     "high": {
				      "url": "https://i.ytimg.com/vi/oeyNVOepYyo/hqdefault.jpg"
				     }
				    },
				    "channelTitle": "",
				    "liveBroadcastContent": "none"
				   }
				  }
				];
	}
});

Template.addSong.events({
	"change #query" : function(e,t) {
		e.preventDefault();
		var query = e.currentTarget.value;
		Session.set("query",query);
	},
	"click .song" : function(e,t) {
		e.preventDefault();

		Meteor.call("addSong", Session.get("userId"), Session.get("partyId"), t.find("#youtubeId").value, t.find("#title").value ,t.find("#description").value, t.find("#thumbnail").src, function(error,result) {
			if(error) {
				console.log("Can't add the song", error);
			} else {
				Session.set("page","client");
			}
		});

		Session.set("page","client");
	}

});