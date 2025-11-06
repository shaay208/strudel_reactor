import React from 'react';

const PlayButtons = ({ onPlay, onStop }) => {
  return (
    <>
      <div
        className="d-flex justify-content-center gap-2 gap-sm-1"
        aria-label="Basic mixed styles example"
      >
        <button
          id="play"
          className="btn btn-primary btn-sm d-flex align-items-center gap-1 px-2 px-sm-1"
          onClick={onPlay}
        >
          <i className="bi bi-play-circle-fill"></i>
          <span className="fw-semibold d-none d-sm-inline">Play</span>
          <span className="fw-semibold d-sm-none">Play</span>
        </button>

        <button
          id="stop"
          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-2 px-sm-1"
          onClick={onStop}
        >
          <i className="bi bi-stop-circle-fill"></i>
          <span className="fw-semibold d-none d-sm-inline">Stop</span>
          <span className="fw-semibold d-sm-none">Stop</span>
        </button>
      </div>
    </>
  );
};

export default PlayButtons;
