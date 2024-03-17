import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, Container } from '@material-ui/core';
import store from './store/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
     <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="md">
        <Router>
        <Container maxWidth="lg">
          <App />
        </Container>
        </Router>
      </Container>
    </Provider>
  
  </React.StrictMode>,
)
