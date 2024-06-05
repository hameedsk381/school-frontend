import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './Store';
import { QueryClientProvider, useQueryClient } from 'react-query';



import { QueryClient } from '@tanstack/react-query'; // fix queryclient import
const queryClient = new QueryClient(); // create a new instance of QueryClient
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> <Provider store={store}><App /></Provider></BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
