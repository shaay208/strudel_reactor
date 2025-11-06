// MusicIconDance.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import 'animate.css'; // remove if you're using the CDN link in index.html
import './MusicIconDance.css'; // custom styles below

const MusicIconDance = ({ isPlaying, size = 40 }) => {
  // Choose a fun sequence of animate.css classes and custom class
  const animClasses = useMemo(() => {
    if (!isPlaying) return 'paused-state';
    // Combine animate.css classes plus infinite
    // We add multiple classes so the icon has layered effects
    return [
      'animate__animated',
      'animate__infinite',
      // a gentle bounce to simulate movement
      'animate__bounce',
      // a quick shake-once loop overlay (looks playful)
      'animate__shakeX',
      // a subtle wobble/jello for character
      'animate__jello',
      // control speed with animate__faster / animate__slow
      'animate__fast',
    ].join(' ');
  }, [isPlaying]);

  return (
    <div className={`dance-wrapper ${isPlaying ? 'dancing' : ''}`}>
      <div
        className={`icon-stack ${animClasses}`}
        style={{ width: size, height: size, lineHeight: `${size}px`, fontSize: size * 0.9 }}
        aria-hidden="true"
      >
        {/* Use any bootstrap icon you prefer */}
        <i className="bi bi-music-note-beamed" />
      </div>

      {/* optional little sparkles that pulse while playing */}
      <div className={`sparkle left ${isPlaying ? 'active' : ''}`} />
      <div className={`sparkle right ${isPlaying ? 'active' : ''}`} />
    </div>
  );
};

MusicIconDance.propTypes = {
  isPlaying: PropTypes.bool,
  size: PropTypes.number,
};

MusicIconDance.defaultProps = {
  isPlaying: false,
  size: 40,
};

export default MusicIconDance;
