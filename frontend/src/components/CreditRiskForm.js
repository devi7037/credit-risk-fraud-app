import React, { useState } from 'react';
import './CreditRiskForm.css';

export default function CreditRiskForm() {
  const [formData, setFormData] = useState({
    age: 35,
    income: 5000,
    credit_history_months: 60,
    payment_regularity: 0.95,
    region: 'South Asia'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : parseFloat(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const params = new URLSearchParams();
      params.append('age', formData.age);
      params.append('income', formData.income);
      params.append('credit_history_months', formData.credit_history_months);
      params.append('payment_regularity', formData.payment_regularity);
      params.append('region', formData.region);

      const response = await fetch(
        `http://localhost:8000/predict/credit-risk?${params}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score < 0.33) return '#10b981';
    if (score < 0.67) return '#f59e0b';
    return '#ef4444';
  };

  const getRiskCategory = (score) => {
    if (score < 0.33) return 'LOW RISK';
    if (score < 0.67) return 'MEDIUM RISK';
    return 'HIGH RISK';
  };

  return (
    <div className="credit-risk-container">
      {/* LEFT COLUMN — FORM (UNCHANGED) */}
      <div className="form-section">
        <h3>Enter Borrower Information</h3>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Age (years)</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Monthly Income (USD)</label>
            <input type="number" name="income" value={formData.income} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Credit History (months)</label>
            <input
              type="number"
              name="credit_history_months"
              value={formData.credit_history_months}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Payment Regularity (0–1)</label>
            <input
              type="number"
              name="payment_regularity"
              value={formData.payment_regularity}
              onChange={handleInputChange}
              step="0.05"
            />
          </div>

          <div className="form-group">
            <label>Region</label>
            <select name="region" value={formData.region} onChange={handleInputChange}>
              <option>South Asia</option>
              <option>Sub-Saharan Africa</option>
              <option>Latin America</option>
              <option>East Asia</option>
              <option>Middle East</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {loading ? 'Analyzing Risk...' : 'Assess Credit Risk'}
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN — IMAGE + RESULTS */}
      <div className="result-section">
        {/*  IMAGE ADDED (RIGHT SIDE, NOTHING REMOVED) */}
        <div className="credit-image-right">
          <img
            src="/credit.webp"
            alt="Credit risk analysis illustration"
          />
        </div>

        {error && (
          <div className="error-message">
             Error: {error}
          </div>
        )}

        {result && (
          <>
            <h3>Risk Assessment Results</h3>

            <div
              className="risk-score-card"
              style={{ borderLeftColor: getRiskColor(result.risk_score) }}
            >
              <div
                className="score-value"
                style={{ color: getRiskColor(result.risk_score) }}
              >
                {(result.risk_score * 100).toFixed(1)}%
              </div>
              <div
                className="score-label"
                style={{ color: getRiskColor(result.risk_score) }}
              >
                {getRiskCategory(result.risk_score)}
              </div>
            </div>

            <div className="risk-description">
              {result.risk_score < 0.33 && (
                <p><strong>Low Risk:</strong> Recommend approval.</p>
              )}
              {result.risk_score >= 0.33 && result.risk_score < 0.67 && (
                <p><strong>Medium Risk:</strong> Recommend safeguards.</p>
              )}
              {result.risk_score >= 0.67 && (
                <p><strong>High Risk:</strong> Recommend caution.</p>
              )}
            </div>

            <div className="metrics">
              <div className="metric">
                <span className="label">Age:</span>
                <span className="value">{formData.age}</span>
              </div>
              <div className="metric">
                <span className="label">Income:</span>
                <span className="value">${formData.income}</span>
              </div>
              <div className="metric">
                <span className="label">Credit History:</span>
                <span className="value">{formData.credit_history_months}</span>
              </div>
              <div className="metric">
                <span className="label">Region:</span>
                <span className="value">{formData.region}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
