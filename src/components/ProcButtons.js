import React from 'react';

const ProcButtons = () => {
  return (
    <div
      className="d-flex justify-content-center gap-3"
      aria-label="Processing buttons"
    >
      <button
        id="process"
        className="btn btn-outline-primary d-flex align-items-center gap-2 px-4"
      >
        <i className="bi bi-gear-fill"></i>
        <span className="fw-semibold">Preprocess</span>
      </button>

      <button
        id="process_play"
        className="btn btn-primary d-flex align-items-center gap-2 px-4"
      >
        <i className="bi bi-play-fill"></i>
        <span className="fw-semibold">Proc & Play</span>
      </button>
    </div>
  );
};

export default ProcButtons;
