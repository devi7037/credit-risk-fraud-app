import React, { useState } from 'react';
import './FraudDetector.css';

export default function FraudDetector() {
  const [formData, setFormData] = useState({
    transaction_amount: 500,
    merchant_category: 'retail',
    time_of_day: 'morning',
    customer_age_account: 24
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
      params.append('transaction_amount', formData.transaction_amount);
      params.append('merchant_category', formData.merchant_category);
      params.append('time_of_day', formData.time_of_day);
      params.append('customer_age_account', formData.customer_age_account);

      const response = await fetch(
        `http://localhost:8000/predict/fraud?${params}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFraudColor = (score) => {
    if (score < 0.4) return '#10b981'; // green - safe
    if (score < 0.7) return '#f59e0b'; // orange - review
    return '#ef4444'; // red - block
  };

  const getActionStyle = (action) => {
    if (action === 'APPROVE') return { bg: '#dbeafe', color: '#0369a1', border: '#0284c7' };
    if (action === 'REVIEW') return { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' };
    return { bg: '#fee2e2', color: '#991b1b', border: '#dc2626' };
  };

  return (
    <div className="fraud-detector-container">
      {/* LEFT SIDE — FORM */}
      <div className="form-section">
        <h3>Enter Transaction Details</h3>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Transaction Amount (USD)</label>
            <input
              type="number"
              name="transaction_amount"
              value={formData.transaction_amount}
              onChange={handleInputChange}
              min="0"
              step="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Merchant Category</label>
            <select
              name="merchant_category"
              value={formData.merchant_category}
              onChange={handleInputChange}
              required
            >
              <option value="retail">Retail</option>
              <option value="grocery">Grocery</option>
              <option value="restaurant">Restaurant</option>
              <option value="gas">Gas Station</option>
              <option value="entertainment">Entertainment</option>
              <option value="online">Online Shopping</option>
              <option value="travel">Travel</option>
              <option value="medical">Medical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Time of Day</label>
            <select
              name="time_of_day"
              value={formData.time_of_day}
              onChange={handleInputChange}
              required
            >
              <option value="morning">Morning (6AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 6PM)</option>
              <option value="evening">Evening (6PM - 12AM)</option>
              <option value="night">Night (12AM - 6AM)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Account Age (months)</label>
            <input
              type="number"
              name="customer_age_account"
              value={formData.customer_age_account}
              onChange={handleInputChange}
              min="0"
              max="600"
              step="1"
              required
            />
            <small>How long has this account existed?</small>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Analyzing Transaction...' : 'Check for Fraud'}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE — ALWAYS VISIBLE */}
      <div className="result-section">
        {/* IMAGE ALWAYS VISIBLE */}
        <div className="fraud-image-right">
          <img src="/fraud.png" alt="Fraud detection illustration" />
        </div>

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {/*  RESULTS ONLY AFTER CLICK */}
        {result && (
          <>
            <h3>Fraud Detection Results</h3>

            <div
              className="fraud-score-card"
              style={{ borderLeftColor: getFraudColor(result.fraud_risk_score) }}
            >
              <div
                className="score-value"
                style={{ color: getFraudColor(result.fraud_risk_score) }}
              >
                {(result.fraud_risk_score * 100).toFixed(1)}%
              </div>
              <div className="score-label">Fraud Risk Score</div>
            </div>

            <div
              className="action-card"
              style={{
                background: getActionStyle(result.action).bg,
                borderLeftColor: getActionStyle(result.action).border,
                color: getActionStyle(result.action).color
              }}
            >
              <div className="action-icon">
                {result.action === 'APPROVE' && '✅'}
                {result.action === 'REVIEW' && '⚠️'}
                {result.action === 'BLOCK' && '🚫'}
              </div>
              <div className="action-content">
                <div className="action-title">{result.action}</div>
                <div className="action-description">
                  {result.action === 'APPROVE' && 'Transaction appears legitimate. Safe to approve.'}
                  {result.action === 'REVIEW' && 'Transaction has some suspicious indicators. Recommend manual review.'}
                  {result.action === 'BLOCK' && 'Transaction shows high fraud risk. Recommend blocking immediately.'}
                </div>
              </div>
            </div>

            <div className="fraud-explanation">
              <h4>Risk Factors Detected</h4>
              <ul>
                <li>
                  <strong>Transaction Amount:</strong> ${formData.transaction_amount.toLocaleString()}
                  {formData.transaction_amount > 1000 && ' ( Large transaction)'}
                </li>
                <li>
                  <strong>Merchant Category:</strong>{' '}
                  {formData.merchant_category.charAt(0).toUpperCase() + formData.merchant_category.slice(1)}
                </li>
                <li>
                  <strong>Time of Day:</strong> {formData.time_of_day}
                  {formData.time_of_day === 'night' && ' ( Unusual time)'}
                </li>
                <li>
                  <strong>Account Age:</strong> {formData.customer_age_account} months
                  {formData.customer_age_account < 3 && ' ( New account)'}
                </li>
              </ul>
            </div>

            <div className="recommendations">
              <h4>Recommended Actions</h4>
              {result.action === 'BLOCK' && (
                <ul>
                  <li>Immediately block the transaction</li>
                  <li>Contact customer to verify legitimacy</li>
                  <li>Check for other suspicious transactions</li>
                  <li>Flag account for review</li>
                </ul>
              )}
              {result.action === 'REVIEW' && (
                <ul>
                  <li>Send OTP/2FA request to customer</li>
                  <li>Request additional verification</li>
                  <li>Monitor account for patterns</li>
                  <li>Manual review recommended</li>
                </ul>
              )}
              {result.action === 'APPROVE' && (
                <ul>
                  <li>Proceed with transaction</li>
                  <li>Standard monitoring applies</li>
                  <li>Log transaction for future reference</li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
