import React from 'react';

const PreprocessTextarea = () => {
  return (
    <>
      <h6 className="text-primary fw-bold">Text to preprocess:</h6>
      <textarea className="form-control" rows="15" id="proc"></textarea>
    </>
  );
};

export default PreprocessTextarea;
