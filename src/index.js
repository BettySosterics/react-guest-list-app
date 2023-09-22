import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppTest from './AppTest';

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
    <AppTest />
  </React.StrictMode>,
);
