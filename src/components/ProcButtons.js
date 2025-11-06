import React from 'react';

const ProcButtons = ({ onProcess, onProcessAndPlay }) => {
  return (
    <div
      className="d-flex justify-content-center gap-2 gap-sm-1"
      aria-label="Processing buttons"
    >
      <button
        id="process"
        className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 px-2 px-sm-1"
        onClick={onProcess}
      >
        <i className="bi bi-gear-fill"></i>
        <span className="fw-semibold d-none d-sm-inline">Preprocess</span>
        <span className="fw-semibold d-sm-none">Prep</span>
      </button>

      <button
        id="process_play"
        className="btn btn-primary btn-sm d-flex align-items-center gap-1 px-2 px-sm-1"
        onClick={onProcessAndPlay}
      >
        <i className="bi bi-play-fill"></i>
        <span className="fw-semibold d-none d-sm-inline">Proc & Play</span>
        <span className="fw-semibold d-sm-none">Play</span>
      </button>
    </div>
  );
};

export default ProcButtons;
