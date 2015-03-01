    // YouTube API calls this when API ready.
    onYouTubeIframeAPIReady = function (videoId) {
        console.log("IM HERE");
        player = new YT.Player("player", {
            height: "176", 
            width: "144", 

            videoId: videoId || 'Y1vC7S385x8', 

            events: {
                onReady: function (event) {
                    event.target.playVideo();
                }
            }
        });
    };