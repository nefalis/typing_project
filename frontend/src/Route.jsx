import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Layout from "./pages/Layout";


const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/editor' element={<Editor />} />
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
};

export default Router;