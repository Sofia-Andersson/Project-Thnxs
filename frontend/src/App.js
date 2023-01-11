import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { user } from './reducers/user';

import { LoginPage } from './pages/LoginPage';
import { InputPage } from './pages/InputPage';
import { PreviousThnxPage } from './pages/PreviousThnxPage'
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';

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