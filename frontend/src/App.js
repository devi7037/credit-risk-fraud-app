import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import CreditRiskForm from './components/CreditRiskForm';
import FraudDetector from './components/FraudDetector';
import Learn from './components/Learn';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setCurrentPage('home');
  };

  const handleSignupSuccess = (email) => {
    // after signup, go to login and prefill email (optional)
    setAuthMode('login');
    alert('Signup successful! Please login.');
  };

  if (!user) {
    return (
      <div className="App">
        <nav className="navbar">
          <h1>Credit Risk &amp; Fraud Detection</h1>
          <div className="nav-buttons">
            <button
              onClick={() => setAuthMode('login')}
              className={authMode === 'login' ? 'active' : ''}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={authMode === 'signup' ? 'active' : ''}
            >
              Sign Up
            </button>
          </div>
        </nav>

        {authMode === 'login' ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <SignupPage onSignupSuccess={handleSignupSuccess} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar">
        <h1 onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          Credit Risk &amp; Fraud Detection
        </h1>
        <div className="nav-buttons">
          <button
            onClick={() => navigateTo('home')}
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('credit-risk')}
            className={currentPage === 'credit-risk' ? 'active' : ''}
          >
            Credit Risk
          </button>
          <button
            onClick={() => navigateTo('fraud')}
            className={currentPage === 'fraud' ? 'active' : ''}
          >
            Fraud Detection
          </button>
          <button
            onClick={() => navigateTo('learn')}
            className={currentPage === 'learn' ? 'active' : ''}
          >
            Learn
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'credit-risk' && <CreditRiskForm />}
        {currentPage === 'fraud' && <FraudDetector />}
        {currentPage === 'learn' && <Learn />}
      </main>
    </div>
  );
}

export default App;
