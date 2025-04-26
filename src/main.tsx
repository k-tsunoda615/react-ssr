import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

hydrateRoot(
  rootElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
