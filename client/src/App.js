import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const isAuthenticated = () => !!localStorage.getItem('token');

// Protected route wrapper for v6+
const Navigate = useNavigate();
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;