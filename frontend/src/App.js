import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { user } from './reducers/user';

import { LoginPage } from './components/LoginPage';
import { InputPage } from './components/InputPage';
import { PreviousThnxPage } from './components/PreviousThnxPage'
import { NotFoundPage } from './components/NotFoundPage';
import { AboutPage } from './components/AboutPage';

const reducer = combineReducers({
  user: user.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/previous-thnx" element={<PreviousThnxPage />} />
          <Route path="/*" element={<NotFoundPage />} /> 
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}