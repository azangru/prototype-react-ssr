import React, { useState, StrictMode } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <StrictMode>
      <h1>This is sparta?!</h1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>
        Plus one
      </button>
    </StrictMode>
  );
}

export default App;
