import React, { useState } from 'react';
import './LoginPage.css'; // reuse same styling

export default function SignupPage({ onSignupSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Read existing users from localStorage
    const existing = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = existing.some((u) => u.email === email);
    if (userExists) {
      setError('User with this email already exists.');
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...existing, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    onSignupSuccess(email);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Create an Account</h1>
        <p className="login-subtitle">Sign up to use the platform</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
