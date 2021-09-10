import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import localStore from './Inicialized/localStore'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';

ReactDOM.hydrate(
  <Provider store={localStore}>
    <App />
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      transition={Flip}
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover />

  </Provider>,

  document.getElementById('root')
);
