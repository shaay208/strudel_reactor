import React, { useState } from 'react';

function DJControls() {
  const [volume, setVolume] = useState(50);
  const [bpm, setBpm] = useState(120);
  const [mode, setMode] = useState('ON');

  return (
    <div>
      {/* Mode Selection */}
      <div className="mb-3 text-center">
        <h6 className="text-secondary">Mode</h6>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="djMode"
            id="modeOn"
            checked={mode === 'ON'}
            onChange={() => setMode('ON')}
          />
          <label className="form-check-label" htmlFor="modeOn">
            P1: ON
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="djMode"
            id="modeHush"
            checked={mode === 'HUSH'}
            onChange={() => setMode('HUSH')}
          />
          <label className="form-check-label" htmlFor="modeHush">
            P1: HUSH
          </label>
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-3">
        <label htmlFor="volumeControl" className="form-label fw-semibold">
          Volume: {volume}%
        </label>
        <input
          type="range"
          className="form-range"
          id="volumeControl"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />
      </div>

      {/* BPM Control */}
      <div className="mb-3">
        <label htmlFor="bpmInput" className="form-label fw-semibold">
          BPM
        </label>
        <input
          type="number"
          className="form-control"
          id="bpmInput"
          min="60"
          max="200"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value) || 0)}
        />
      </div>

      {/* Status Message */}
      <div
        className={`alert ${
          mode === 'ON' ? 'alert-success' : 'alert-secondary'
        } mt-3 text-center fw-semibold py-2`}
      >
        {mode === 'ON' ? ` Playing at ${bpm} BPM` : 'Hushed Mode'}
      </div>
    </div>
  );
}

export default DJControls;
