import DJControls from './DJControls';
import KeyboardShortcuts from './KeyboardShortcuts';

export default function DJControlsSection({
  volume,
  onVolumeChange,
  selectedTrack,
  onTrackChange,
  bpm,
  onBpmChange,
  p1Mode,
  onP1ModeChange,
  onSavePreset,
  onLoadPreset,
}) {
  return (
    <div className="col-lg-3">
      <div className="d-flex flex-column gap-3 h-100">
        <div className="card glass-card">
          <div className="card-header text-primary fw-bold gradient-header">
            <i className="bi bi-mixer2 me-2"></i>DJ Controls
          </div>
          <div className="card-body">
            <DJControls
              volume={volume}
              onVolumeChange={onVolumeChange}
              selectedTrack={selectedTrack}
              onTrackChange={onTrackChange}
              bpm={bpm}
              onBpmChange={onBpmChange}
              p1Mode={p1Mode}
              onP1ModeChange={onP1ModeChange}
              onSavePreset={onSavePreset}
              onLoadPreset={onLoadPreset}
            />
          </div>
        </div>
        <KeyboardShortcuts />
        <canvas
          id="roll"
          className="w-100 rounded canvas-glow display-none"
          style={{ height: '200px' }}
        />
      </div>
    </div>
  );
}
