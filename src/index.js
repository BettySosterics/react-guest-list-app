import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// const GUEST = [
//   { id: 'guest-0', firstName: 'Tré', lastName: 'Cool', attending: false },
//   { id: 'guest-1', firstName: 'Mike', lastName: 'Dirnt', attending: false },
//   {
//     id: 'guest-2',
//     firstName: 'Bille Joe',
//     lastName: 'Armstrong',
//     attending: false,
//   },
// ];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
