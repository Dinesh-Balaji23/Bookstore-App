import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = { email, password };
      const response = await axios.post('http://192.168.153.128:9000/loginseller', userCredentials);

      if (response.status === 200) {
        alert('Login successful!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        navigate(`/sellerhome/${response.data.name}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response && error.response.status === 400) {
        alert('Invalid email or password. Please try again.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "#f6f6f6" }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
        <div className="container">
          <a className="navbar-brand" href="/">
            BookStore
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  User
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/loginseller" className="nav-link active">
                  Seller
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/loginadmin" className="nav-link">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 56px)" }}>
        <div className="card shadow" style={{ width: "400px", borderRadius: "10px" }}>
          <div className="card-body">
            <h3 className="text-center fw-bold mb-4">Login to Seller Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Log in
              </button>
            </form>
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/signupseller" className="text-primary">
                Create Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
