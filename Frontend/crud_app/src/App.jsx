import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
          <a className="navbar-brand text-primary fw-bold" href="#">React + Node CRUD App</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/register"><b>Register</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login"><b>Login</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products"><b>Products</b></Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container py-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;