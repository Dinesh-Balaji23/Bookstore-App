import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);

    try {
      const newUser = { name, email, password };
      const response = await axios.post('http://localhost:9000/signupadmin', newUser);
      if (response.status === 201) {
        alert('User created successfully!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "#f6f6f6" }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 56px)" }}>
        <div className="card shadow" style={{ width: "400px", borderRadius: "10px" }}>
          <div className="card-body">
            <h3 className="text-center fw-bold mb-4">Signup For Admin</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </form>
            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/loginadmin" className="text-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;