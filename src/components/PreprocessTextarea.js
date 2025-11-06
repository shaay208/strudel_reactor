import React from 'react';

const PreprocessTextarea = ({ value, onChange }) => {
  return (
    <>
      <textarea
        className="form-control"
        rows="15"
        id="proc"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default PreprocessTextarea;
