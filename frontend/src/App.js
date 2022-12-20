import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
    user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/input" element={<InputPage />} />
                    <Route path="/calender" element={<CaleandarView/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

