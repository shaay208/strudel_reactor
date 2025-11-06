import React from 'react';
import { getTrackById } from '../tunes';

const TrackInfo = ({ selectedTrack, currentBpm  }) => {
  const track = getTrackById(selectedTrack);

  if (!track) return null;

  // Use currentBpm if provided, otherwise fall back to track's default BPM
  const displayBpm = currentBpm || track.bpm;

  const getGenreIcon = (genre) => {
    switch (genre.toLowerCase()) {
      case 'techno':
        return 'bi-lightning-charge';
      case 'ambient':
        return 'bi-cloud';
      case 'jazz fusion':
        return 'bi-music-note-beamed';
      case 'drum & bass':
        return 'bi-soundwave';
      case 'synthwave':
      default:
        return 'bi-cpu';
    }
  };

  const getBpmColor = (bpm) => {
    if (bpm < 100) return 'text-success';
    if (bpm < 140) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="card glass-card">
      <div className="card-header text-primary fw-bold gradient-header d-flex align-items-center">
        <i className="bi bi-info-circle me-2"></i>
        Track Info
      </div>
      <div className="card-body">
        <div className="text-center mb-3">
          <h5 className="card-title mb-1">
            <i
              className={`bi ${getGenreIcon(track.genre)} me-2 text-primary`}
            ></i>
            {track.name}
          </h5>
          <p className="text-muted mb-0">
            <span className="badge bg-secondary me-2">{track.genre}</span>
            <span
              className={`badge ${getBpmColor(
                displayBpm
              )} bg-opacity-10 border`}
            >
              <i className="bi bi-speedometer2 me-1"></i>
              {displayBpm} BPM
            </span>
          </p>
        </div>

        <div className="row text-center">
          <div className="col-4">
            <div className="border-end">
              <i className="bi bi-music-note d-block fs-4 text-primary animate__animated animate__bounce animate__infinite animate__slow"></i>
              <small className="text-muted">Track</small>
            </div>
          </div>
          <div className="col-4">
            <div className="border-end">
              <i className="bi bi-clock d-block fs-4 text-info"></i>
              <small className="text-muted">Live</small>
            </div>
          </div>
          <div className="col-4">
            <i className="bi bi-vinyl d-block fs-4 text-warning"></i>
            <small className="text-muted">Generated</small>
          </div>
        </div>

        <div className="mt-3">
          <div className="progress" style={{ height: '4px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: '100%' }}
            ></div>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <small className="text-muted">Ready to play</small>
            <small className="text-muted">
              <i className="bi bi-check-circle text-success"></i>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackInfo;
