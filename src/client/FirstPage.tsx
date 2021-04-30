import React, { useState } from 'react';

// @ts-expect-error
import reactIconUrl from './images/react-icon.png';


const FirstPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>This is sparta?!!</h1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>
        Plus one
      </button>
      <img className="test-image" src={reactIconUrl} />
    </>
  );
}

export default FirstPage;
