import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <StrictMode>
    <App serviceId="jsonFile" />
  </StrictMode>,
  document.getElementById('root')
);
