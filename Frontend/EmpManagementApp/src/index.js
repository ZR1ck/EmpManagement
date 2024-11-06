import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Suspense>
      <AuthProvider>
        <App />
        <Toaster
          toastOptions={{
            duration: 2000,
          }}
        />
      </AuthProvider>
    </Suspense>
  </BrowserRouter>
);

