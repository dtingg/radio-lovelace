import React from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

class RadioSet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: {
        morningTracks: props.tracks.slice(0, props.tracks.length / 2),
        eveningTracks: props.tracks.slice(props.tracks.length / 2, props.tracks.length)
        }
    }

    console.log(`Radio set for ${props.tracks.length} tracks`);
  }

  toggleFavorite = (trackId) => {
    const {playlists} = this.state;

    let trackToUpdate = playlists.morningTracks.find((track => track.id === trackId));

    if (trackToUpdate === undefined) {
      trackToUpdate = playlists.eveningTracks.find((track => track.id === trackId));
    }

    trackToUpdate.favorite = !trackToUpdate.favorite;

    this.setState({
      playlists,
    });
  }

  sendToTop = (trackId) => {
    const {playlists} = this.state;
    let topTrack = playlists.morningTracks.find((track) => track.id === trackId);
    let playlist = playlists.morningTracks

    if (topTrack === undefined) {
      topTrack = playlists.eveningTracks.find((track => track.id === trackId))
      playlist = playlists.eveningTracks
    }

    const trackIndex = playlist.indexOf(topTrack)

    playlist.splice(trackIndex, 1)
    playlist.unshift(topTrack)
    
    this.setState({
      playlists,
    })
  }

  switchLists = (trackId) => {
    const {playlists} = this.state;
    let trackToUpdate = playlists.morningTracks.find((track => track.id === trackId));
    let oldPlaylist = playlists.morningTracks
    let newPlaylist = playlists.eveningTracks

    if (trackToUpdate === undefined) {
      trackToUpdate = playlists.eveningTracks.find((track => track.id === trackId));
      oldPlaylist = playlists.eveningTracks
      newPlaylist = playlists.morningTracks
    }

    const trackIndex = oldPlaylist.indexOf(trackToUpdate)
    oldPlaylist.splice(trackIndex, 1)
    newPlaylist.unshift(trackToUpdate)

    this.setState({
      playlists,
    })
  }

  render () {
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.playlists.morningTracks}
            toggleFavorite={ this.toggleFavorite }
            sendToTop={ this.sendToTop }
            switchLists={ this.switchLists }
          />
          <Playlist
            side="Evening"
            tracks={this.state.playlists.eveningTracks}
            toggleFavorite={ this.toggleFavorite }
            sendToTop={ this.sendToTop }
            switchLists={ this.switchLists }
          />
        </section>
      </div>
    );
  }
}

export default RadioSet;
