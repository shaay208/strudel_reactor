import React from 'react';
import 'animate.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const QuickMusicAdder = ({
  musicElements,
  onAddMusic,
  onRemoveMusic,
  onClearAll,
}) => {
  const quickPresets = [
    {
      name: 'Kick',
      code: 's("bd*4").bank("RolandTR909").gain(0.8)',
      icon: 'bi-disc',
      type: 'drums',
    },
    {
      name: 'Hi-Hat',
      code: 's("hh*8").bank("RolandTR909").gain(0.4)',
      icon: 'bi-music-note-beamed',
      type: 'drums',
    },
    {
      name: 'Pad',
      code: 'note("c3 eb3 g3").slow(2).sound("pad").room(0.6).gain(0.4)',
      icon: 'bi-cloud-music',
      type: 'melody',
    },
  ];

  const handleQuickAdd = (preset) => {
    onAddMusic({
      id: Date.now(),
      name: preset.name,
      code: preset.code,
      type: preset.type,
    });
  };

  return (
    <div className="card glass-card shadow-lg border-0 rounded-4 animate__animated animate__fadeIn">
      <div className="card-header text-primary fw-bold gradient-header">
        <i className="bi bi-plus-circle me-2"></i>Add Music
      </div>

      <div className="card-body">
        {/* Quick Add Buttons */}
        <div className="mb-3">
          <label className="form-label fw-bold">Quick Add:</label>
          <div className="row g-2">
            {quickPresets.map((preset, index) => (
              <div key={index} className="col-6 col-md-4">
                <button
                  className="btn btn-outline-primary btn-sm w-100 py-2 animate__animated animate__pulse animate__infinite"
                  onClick={() => handleQuickAdd(preset)}
                  title={`Add ${preset.name}`}
                >
                  <i className={`${preset.icon} fs-5 mb-1 d-block`}></i>
                  <span className="small fw-semibold">{preset.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Added Elements */}
        {musicElements.length > 0 && (
          <div className="mb-3 animate__animated animate__fadeInUp">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-bold mb-0">
                Added ({musicElements.length})
              </label>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={onClearAll}
                title="Clear all"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>

            <div className="d-flex flex-wrap gap-1">
              {musicElements.map((element) => (
                <span
                  key={element.id}
                  className="badge bg-primary d-flex align-items-center gap-1 p-2 animate__animated animate__fadeIn"
                  style={{ fontSize: '0.75em' }}
                >
                  <i className="bi bi-music-note-beamed"></i>
                  {element.name}
                  <button
                    className="btn-close btn-close-white ms-1"
                    style={{ fontSize: '0.6em' }}
                    onClick={() => onRemoveMusic(element.id)}
                    aria-label="Remove"
                  ></button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="alert alert-info py-2 animate__animated animate__fadeInDown">
          <small>
            <i className="bi bi-info-circle me-1"></i>
            Added elements will blend into the current track when playing.
          </small>
        </div>
      </div>
    </div>
  );
};

export default QuickMusicAdder;
