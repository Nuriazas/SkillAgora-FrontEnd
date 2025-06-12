import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.css';
import App from './App.jsx';



const root = ReactDOM.createRoot(container)
  
  root.render(
  <StrictMode>
    <BrowserRouter>
       
          <App />
       
        
      
    </BrowserRouter>
  </StrictMode>,
)
