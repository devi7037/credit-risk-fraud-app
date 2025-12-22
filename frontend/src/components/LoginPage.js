import React, { useState } from 'react';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter email and password.');
      return;
    }

    // Read users from localStorage (created from signup)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      setError('Invalid email or password.');
      return;
    }

    onLogin({ email: matchedUser.email, name: matchedUser.name });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Login to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
