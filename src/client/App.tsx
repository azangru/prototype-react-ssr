import React, { useState, StrictMode } from 'react';

// @ts-expect-error
import reactIconUrl from './images/react-icon.png';

import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <StrictMode>
      <h1>This is sparta?!!</h1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>
        Plus one
      </button>
      <img className="test-image" src={reactIconUrl} />
    </StrictMode>
  );
}

export default App;
