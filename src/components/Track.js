import React from 'react'
import PropTypes from 'prop-types'

import "./styles/Track.css";

// Here we use destructuring to extract the props into separate variables
// See https://wesbos.com/destructuring-objects/

const Track = ({id, title, artist, playtime, albumart, favorite, toggleFavorite, sendToTop}) => {

  const ontoggleFavorite = () => {
    toggleFavorite(id);
  }

  const onsendToTop = () => {
    sendToTop(id);
  }

  return (
    <li className="track">
      <img className="track--albumart" alt={`album art for ${title}`} src={albumart} />
      <h3 className="track--title">{title}</h3>
      <input
        type="checkbox"
        className="track--favorite"
        checked={favorite}
        onChange={ontoggleFavorite}
      />
      <p className="track--artist">{artist}</p>
      <p className="track--playtime">{playtime}</p>
      <button
        className="track--control track--to-top"
        onClick={onsendToTop}
        >
        <span role="img" aria-label="send to top">🔝</span>
      </button>
      <button
        className="track--control track--switch"
        >
        <span role="img" aria-label="switch lists">↔</span>
      </button>
    </li>
  );
};

Track.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  artist: PropTypes.string,
  playtime: PropTypes.string,
  albumart: PropTypes.string,
  favorite: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired,
  sendToTop: PropTypes.func.isRequired,
}

Track.defaultProps = {
  favorite: false,
}

export default Track;
