import React from 'react';

const PlayButtons = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center gap-3"
        aria-label="Basic mixed styles example"
      >
        <button
          id="play"
          className="btn btn-primary d-flex px-4  align-items-center gap-2"
        >
          <i className="bi bi-play-circle-fill py-1"></i>
          <span className="fw-semibold">Play</span>
        </button>

        <button
          id="stop"
          className="btn btn-outline-danger d-flex  px-4 align-items-center gap-2 "
        >
          <i class="bi bi-stop-circle-fill"></i>
          <span className="fw-semibold">Stop</span>
        </button>
      </div>
    </>
  );
};

export default PlayButtons;
