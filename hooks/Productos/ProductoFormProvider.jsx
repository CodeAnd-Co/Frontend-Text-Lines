import React, { useCallback } from 'react';

const ProductoFormProvider = () => {
  const callbackFunction = useCallback(() => {
    alert('Callback executed!');
  }, []);

  return (
    <div>
      <button onClick={callbackFunction}>Run Callback</button>
    </div>
  );
};

export default ProductoFormProvider;
