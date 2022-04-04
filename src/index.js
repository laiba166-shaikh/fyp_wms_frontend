import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment';
import { Provider } from "react-redux"
import { store } from './redux/store';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export function getLibrary(provider) {  
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;  
  return library;
}

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider> 
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
