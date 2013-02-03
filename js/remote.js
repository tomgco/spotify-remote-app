"use strict";
window.onload = function() {
        var sp = getSpotifyApi();
        var models = sp.require("$api/models");
        var views = sp.require("$api/views");

        var single_track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL');
        var single_track_playlist = new models.Playlist();
        single_track_playlist.add(single_track);
        var single_track_player = new views.Player();
        single_track_player.track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL'); // Don't play the track right away
        single_track_player.context = single_track_playlist;

        /* Pass the player HTML code to #single-track-player */
        var single_track_player_HTML = document.getElementById('single-track-player');
        single_track_player_HTML.appendChild(single_track_player.node);
};
