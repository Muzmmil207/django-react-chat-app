import React from "react";
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Login } from "./components/Login";
// import { Chat } from "./components/Chat";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Chat } from './pages/ChatPage';
// import {PrivateRoute} from './utils/PrivateRoute';

export default function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route element={<HomePage />} path="/" exact />
            <Route element={<Chat />} path="/chat/:id" exact />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
