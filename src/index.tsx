import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';
import UserProvider from './providers/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
