import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';

import { App } from './client/app';

window.addEventListener('load', () => {

  const rootDiv = document.getElementById('react_root');
  
  if(!rootDiv) return null;

  const root = ReactDOM.createRoot(
    rootDiv as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // ReactDOM.render(<App /> , root);

})
