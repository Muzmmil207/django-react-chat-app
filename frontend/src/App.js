import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Login } from "./components/Login";
// import { Chat } from "./components/Chat";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import {HomePage} from './pages/HomePage';
import {LoginPage} from './pages/LoginPage';
import {Chat} from './pages/ChatPage';
// import {PrivateRoute} from './utils/PrivateRoute';

export default function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<HomePage /> }  path="/" exact/>
            <Route element={<Chat /> }  path="/user/:id" exact/>
            {/* <Route element={<Chat /> }  path={`/user/${Number}`} exact/> */}
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}
