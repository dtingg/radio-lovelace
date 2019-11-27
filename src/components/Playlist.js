import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: props.tracks,
    }
  }

  calculatePlayTime = (tracks) => {
    let minutes = 0;
    let seconds = 0;
    tracks.forEach((track) => {
      const times = track.playtime.split(':');
      minutes += parseInt(times[0]);
      seconds += parseInt(times[1]);
    });
  
    minutes += Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds %= 60;
    minutes %= 60;
  
    seconds = ("" + seconds).padStart(2, "0");
    minutes = ("" + minutes).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }

  makeList () {
    const trackElements = this.state.tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
        key={track.id}
        {...track}
        toggleFavorite={ this.toggleFavorite }
        sendToTop={ this.sendToTop }
      />
      );
    });
    return trackElements
  }

  toggleFavorite = (trackId) => {
    const {tracks} = this.state;
    const trackToUpdate = tracks.find((track) => track.id === trackId);

    trackToUpdate.favorite = !trackToUpdate.favorite;

    this.setState({
      tracks,
    });
  }

  sendToTop = (trackId) => {
    const {tracks} = this.state;
    const topTrack = tracks.find((track) => track.id === trackId);
    const trackIndex = tracks.indexOf(topTrack)

    tracks.splice(trackIndex, 1)
    tracks.unshift(topTrack)
    
    this.setState({
      tracks,
    })
  }

  render() {
    const trackCount = this.state.tracks.length;
    const playtime = this.calculatePlayTime(this.state.tracks);

    return(
      <div className="playlist">
        <h2>{ this.props.side } Playlist</h2>
        <p>
          {trackCount} tracks - {playtime}
        </p>
        <ul className="playlist--track-list">
          { this.makeList() }
        </ul>
      </div>
    );
  }
};

Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,
}

export default Playlist;
