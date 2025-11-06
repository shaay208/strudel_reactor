import React from 'react';
import Graph from './Graph';
import TrackInfo from './TrackInfo';

const MusicPlayer = ({
  state,
  selectedTrack,
  handleProcess,
  handleProcessAndPlay,
  handlePlay,
  handleStop,
  setState,
  editorReady,
}) => {
  return (
    <div
      className="card glass-card shadow-lg w-100"
      style={{ minWidth: '350px' }}
    >
      {/* Header */}
      <div className="card-header text-primary fw-bold gradient-header d-flex align-items-center justify-content-between">
        <div>
          <i className="bi bi-music-player me-2"></i>Music Player
        </div>
        <small className="badge bg-primary">
          {state === 'play' ? 'Playing' : 'Stopped'}
        </small>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column gap-3 p-3">
        {/* Track Info */}

        {/* Graph */}
        <div className="flex-grow-1">
          <Graph />
        </div>
        <TrackInfo selectedTrack={selectedTrack} />

        {/* Controls */}
        <div className="d-flex align-items-center gap-2">
          {/* Left side - Preprocess */}
          <div className="flex-fill">
            <button
              className="btn btn-outline-primary w-100"
              onClick={handleProcess}
            >
              <i className="bi bi-gear me-1"></i>
              Preprocess
            </button>
          </div>

          {/* Center - Play/Stop */}
          <div className="flex-shrink-0">
            {state === 'play' ? (
              <button
                className="btn btn-danger btn-lg rounded-circle"
                style={{ width: '60px', height: '60px' }}
                onClick={() => {
                  setState('stop');
                  handleStop();
                }}
                disabled={!editorReady}
              >
                <i className="bi bi-stop-fill fs-4"></i>
              </button>
            ) : (
              <button
                className="btn btn-success btn-lg rounded-circle"
                style={{ width: '60px', height: '60px' }}
                onClick={() => {
                  setState('play');
                  handlePlay();
                }}
                disabled={!editorReady}
              >
                <i className="bi bi-play-fill fs-4"></i>
              </button>
            )}
          </div>

          {/* Right side - Process & Play */}
          <div className="flex-fill">
            <button
              className="btn btn-primary w-100"
              onClick={handleProcessAndPlay}
            >
              <i className="bi bi-gear me-1"></i>
              Proc & Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
