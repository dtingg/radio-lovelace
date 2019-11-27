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

  render () {
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.playlists.morningTracks}
          />
          <Playlist
            side="Evening"
            tracks={this.state.playlists.eveningTracks}
          />
        </section>
      </div>
    );
  }
}

export default RadioSet;
