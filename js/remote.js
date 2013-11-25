'use strict';
window.onload = function() {

  var sp = getSpotifyApi()
  , models = sp.require('$api/models')
  , player = models.player
  // , views = sp.require('$api/views')
  // , single_track = models.Album.fromURI('spotify:album:53nuhKJGa7z6k52QGMRgVg')
  // , single_track_playlist = new models.Playlist()
  // single_track.getRange(0, single_track.length).forEach(function(val) {
  //   single_track_playlist.add(val)
  // })
  // var single_track_player = new views.Player()
  // single_track_player.track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL') // Don't play the track right away
  // single_track_player.context = single_track_playlist

  //  Pass the player HTML code to #single-track-player 
  // var single_track_player_HTML = document.getElementById('single-track-player')
  // single_track_player_HTML.appendChild(single_track_player.node)
  // single_track_player.play(single_track_player.track, single_track_player.context)

  var socket = io.connect('localhost')
  /**
   *  { track: , playlist: }
   */
  socket.on('play', function (data) {
    console.log(data.track)
    socket.emit('my other event', { my: 'data' })
  })

  socket.on('volume', function (data) {
    player.volume = data.volume
  })

  socket.on('play', function (data) {
    player.playing = data.playing
  })

  socket.on('pause', function (data) {
    player.playing = data.playing
  })

  socket.on('next', player.next)

  socket.on('previous', player.previous)

  socket.on('getTrack', function() {
    socket.emit('command', { cmd: 'track', payload: { track: player.track }})
  })

  socket.on('getStatus', function() {
    socket.emit('command', { cmd: 'status', payload:
      { playing: player.playing
      , position: player.position
      , volume: player.volume
      }
    })
  })

  models.player.observe(models.EVENT.CHANGE, function(event) {
    socket.emit('event', event)
  })
}
