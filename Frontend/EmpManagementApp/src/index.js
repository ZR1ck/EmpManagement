import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Suspense>
      <App />
      <Toaster
        toastOptions={{
          duration:2000,
        }}
      />
    </Suspense>
  </BrowserRouter>
);

