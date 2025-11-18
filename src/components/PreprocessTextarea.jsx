import React from 'react';

//  PreprocessTextarea Component that renders a textarea for inputting Strudel code,
//  with specific styling and change handling.
const PreprocessTextarea = ({ songText, onChange }) => {
  return (
    <>
      <textarea
        className="form-control h-100"
        style={{
          resize: 'none',
          fontSize: '14px',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        }}
        id="proc"
        value={songText}
        onChange={onChange}
        placeholder="Enter your Strudel code here..."
      />
    </>
  );
};

export default PreprocessTextarea;
