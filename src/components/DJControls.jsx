import React, { useState, useEffect } from 'react';
import { tracks } from '../tunes';

function DJControls({
  volume,
  onVolumeChange,
  selectedTrack,
  onTrackChange,
  bpm,
  onBpmChange,
  p1Mode,
  onP1ModeChange,
}) {
  const [localBpm, setLocalBpm] = useState(120);

  const currentTrack =
    tracks.find((track) => track.id === selectedTrack) || tracks[0];

  useEffect(() => {
    setLocalBpm(currentTrack.bpm);
    if (onBpmChange) {
      onBpmChange(currentTrack.bpm);
    }
  }, [currentTrack, onBpmChange]);

  const handleBpmChange = (newBpm) => {
    setLocalBpm(newBpm);
    if (onBpmChange) {
      onBpmChange(newBpm);
    }
  };

  return (
    <div>
      {/* Track Selection */}
      <div className="mb-3">
        <label htmlFor="trackSelect" className="form-label fw-semibold">
          <i className="bi bi-music-note-beamed me-2"></i>Track Selection
        </label>
        <select
          className="form-select"
          id="trackSelect"
          value={selectedTrack}
          onChange={(e) => onTrackChange(e.target.value)}
        >
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.name} ({track.genre})
            </option>
          ))}
        </select>
        <small className="text-muted">
          Current: {currentTrack.name} • {bpm || localBpm} BPM •{' '}
          {currentTrack.genre}
        </small>
      </div>

      {/* Mode Selection */}
      <div className="mb-3 text-center">
        <h6 className="text-secondary">
          <i className="bi bi-power me-2"></i>Mode
        </h6>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="djMode"
            id="modeOn"
            checked={p1Mode === 'on'}
            onChange={() => onP1ModeChange('on')}
          />
          <label className="form-check-label" htmlFor="modeOn">
            <i className="bi bi-play-circle me-1"></i>P1: ON
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="djMode"
            id="modeHush"
            checked={p1Mode === 'hush'}
            onChange={() => onP1ModeChange('hush')}
          />
          <label className="form-check-label" htmlFor="modeHush">
            <i className="bi bi-pause-circle me-1"></i>P1: HUSH
          </label>
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-3">
        <label htmlFor="volumeControl" className="form-label fw-semibold">
          <i className="bi bi-volume-up me-2"></i>Volume: {volume}%
        </label>
        <input
          type="range"
          className="form-range"
          id="volumeControl"
          min="0"
          max="100"
          onMouseUp={onVolumeChange}
        />
      </div>

      {/* BPM Control */}
      <div className="mb-3">
        <label htmlFor="bpmInput" className="form-label fw-semibold">
          <i className="bi bi-speedometer2 me-2"></i>BPM
        </label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            id="bpmInput"
            min="60"
            max="200"
            value={bpm || localBpm}
            onChange={(e) => handleBpmChange(parseInt(e.target.value) || 0)}
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => handleBpmChange(currentTrack.bpm)}
            title="Reset to track BPM"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>

      {/* Status Message */}
      <div
        className={`alert ${
          p1Mode === 'on' ? 'alert-success' : 'alert-secondary'
        } mt-3 text-center fw-semibold py-2`}
      >
        {p1Mode === 'on' ? (
          <>
            <i className="bi bi-play-fill me-1"></i>Playing at {bpm || localBpm}{' '}
            BPM
          </>
        ) : (
          <>
            <i className="bi bi-pause-fill me-1"></i>Hushed Mode
          </>
        )}
      </div>
    </div>
  );
}

export default DJControls;
