import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components'
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  :root {
    --dark-gray: hsl(0, 0%, 17%);
    --gray: hsl(0, 0%, 59%);
    --border-radius: 12px;
  }

  * {
    font-family: 'Rubik', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    max-width: 100%;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
