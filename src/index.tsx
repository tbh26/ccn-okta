import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from './lib/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContext.Provider
      value={{
        fontFamily: "sans-serif",
        colors: {
          backgroundColor: "white",
          // textColor: "#c00",
          textColor: "green",
          toolbarBackgroundColor: "#555",
        },
      }}
    >
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
