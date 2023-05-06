import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Parse from 'parse';
import { getServerUrl } from './utils/utils';

const init = () => {
  // --------------------------------- //
  // -------------- ENV -------------- //
  // --------------------------------- //
  // get app env by browser url
  const location = window.location;
  // LOCAL can also mean "accessed by a remote machine (like a Mac) on the local dev network"
  const hostName = location.hostname;
  const LOCAL: boolean = hostName.includes('localhost');
  const PREPROD: boolean = hostName.includes('preprod');
  const PROD = !LOCAL && !PREPROD;

  (window as any).LOCAL = LOCAL;
  (window as any).PREPROD = PREPROD;
  (window as any).PROD = PROD;

  Parse.initialize(process.env.REACT_APP_PARSE_APP_ID ?? 'blogko');
  Parse.serverURL = getServerUrl() + '/parse';

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
