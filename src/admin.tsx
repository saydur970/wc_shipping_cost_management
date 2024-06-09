import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './admin/app';

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
  
})

