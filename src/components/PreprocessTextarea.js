import React from 'react';

const PreprocessTextarea = ({ value, onChange }) => {
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
        value={value}
        onChange={onChange}
        placeholder="Enter your Strudel code here..."
      />
    </>
  );
};

export default PreprocessTextarea;
