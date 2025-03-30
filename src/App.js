import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Learning from './pages/Learning';
import SignIn from './pages/SignIn';

function App() {
  // This would be connected to authentication state later
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={isAuthenticated ? <Landing /> : <Navigate to="/signin" />}
        />
        <Route
          path="/learning/:pathId"
          element={isAuthenticated ? <Learning /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;