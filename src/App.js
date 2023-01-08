import React, {useEffect, useState} from "react";
import './styles/App.css'
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";


function App() {
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="about" element={<About />} />
                <Route path="posts" element={<Posts />} />
                <Route path="/*" element={<Navigate to="posts" replace />} />)
            </Routes>
        </BrowserRouter>
    )
}

export default App;
