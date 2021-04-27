import React from 'react';
import { render } from 'react-dom';

import App from './App';


if ('hot' in module) {
  (module as any).hot.accept();
}

render(
  <App />,
  document.getElementById('app-root')
);
