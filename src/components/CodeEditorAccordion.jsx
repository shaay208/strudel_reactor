import PreprocessTextarea from './PreprocessTextarea';

const CodeEditorAccordion = ({
  songText,
  setSongText,
  setProcText,
}) => {
  return (
    <div className="accordion mb-4" id="codeAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="codeHeading">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#codeCollapse"
            aria-expanded="true"
            aria-controls="codeCollapse"
          >
            <i className="bi bi-code-square me-2"></i>
            <strong>Code Editor & Text Preprocessing</strong>
          </button>
        </h2>
        <div
          id="codeCollapse"
          className="accordion-collapse collapse show"
          aria-labelledby="codeHeading"
          data-bs-parent="#codeAccordion"
        >
          <div className="accordion-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card glass-card" style={{ height: '400px' }}>
                  <div className="card-header gradient-header">
                    <h6 className="text-primary fw-bold mb-0">
                      <i className="bi bi-file-text me-2"></i>Text to
                      preprocess:
                    </h6>
                  </div>
                  <div className="card-body p-2">
                    <PreprocessTextarea
                      songText={songText}
                      onChange={(e) => {
                        setSongText(e.target.value);
                        setProcText(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card glass-card" style={{ height: '400px' }}>
                  <div className="card-header text-primary fw-bold gradient-header">
                    <h6 className="mb-0">
                      <i className="bi bi-terminal me-2"></i>Editor
                    </h6>
                  </div>
                  <div
                    className="card-body p-2"
                    style={{
                      height: '350px',
                      overflow: 'auto',
                      backgroundColor: '#1e1e1e',
                      border: 'none',
                    }}
                  >
                    <div
                      id="editor"
                      style={{
                        height: '100%',
                        backgroundColor: '#1e1e1e',
                        minHeight: '100%',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditorAccordion;
