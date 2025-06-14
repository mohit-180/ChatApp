import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './main.scss';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));

// If you want to set toast options, use 'duration' instead of 'timeout' and remove transitions unless you use a custom one
const toastOptions = {
  duration: 5000,
  position: 'bottom-center'
};

root.render(
  <Provider store={store}>
    <App />
    <Toaster position="bottom-center" toastOptions={toastOptions} reverseOrder={false} />
  </Provider>
);
