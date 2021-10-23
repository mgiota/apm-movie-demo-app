import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { init as initApm } from '@elastic/apm-rum'

let apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'movie-frontend',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: '<your-apm-server-url>',

  // Set service version (required for sourcemap feature)
  serviceVersion: '',

  breakdownMetrics: true
})

// group development transactions into one bucket
apm.observe('transaction:end', function (transaction) {
  if (transaction.name.endsWith(".json")) {
    transaction.name = "development"
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
