import React from 'react';

const PreprocessTextarea = ({ defaultValue, onChange }) => {
  return (
    <>
      <textarea className="form-control" rows="15" id="proc" defaultValue={defaultValue} onChange={onChange}></textarea>
    </>
  );
};

export default PreprocessTextarea;
