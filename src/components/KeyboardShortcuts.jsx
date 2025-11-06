import React from 'react';

const KeyboardShortcuts = () => {
  return (
    <div className="card glass-card">
      <div className="card-header text-primary fw-bold gradient-header d-flex align-items-center">
        <i className="bi bi-keyboard me-2"></i>
        Keyboard Shortcuts
      </div>
      <div className="card-body">
        <div className="row g-2">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center py-1">
              <span className="small">Play</span>
              <kbd className="small">Ctrl + Enter</kbd>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center py-1">
              <span className="small">Stop</span>
              <kbd className="small">Ctrl + .</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;
