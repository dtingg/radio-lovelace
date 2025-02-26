import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

const calculatePlayTime = (tracks) => {
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

const Playlist = (props) => {
  const tracks = props.tracks;
  const trackCount = tracks.length;
  const playtime = calculatePlayTime(tracks);

  const ontoggleFavorite = (id) => {
    props.toggleFavorite(id);
  }

  const onsendToTop = (id) => {
    props.sendToTop(id);
  }

  const onswitchLists = (id) => {
    props.switchLists(id);
  }

  const trackElements = tracks.map((track, i) => {
    // We use "spread syntax" here to pass in all the properties of 
    // the variable 'track' as props. Go look it up!
    return (
      <Track
      key={track.id}
      {...track}
      toggleFavorite={ ontoggleFavorite }
      sendToTop={ onsendToTop }
      switchLists={ onswitchLists }
    />
    );
  });
  return(
    <div className="playlist">
      <h2>{ props.side } Playlist</h2>
      <p>
        {trackCount} tracks - {playtime}
      </p>
      <ul className="playlist--track-list">
        { trackElements }
      </ul>
    </div>
  );
}

Playlist.propTypes = {
  id: PropTypes.number,
  tracks: PropTypes.array,
  side: PropTypes.string,
  toggleFavorite: PropTypes.func.isRequired,
  sendToTop: PropTypes.func.isRequired,
  switchLists: PropTypes.func.isRequired,
}

export default Playlist;
