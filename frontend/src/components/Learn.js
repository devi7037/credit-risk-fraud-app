import React, { useState } from 'react';
import './Learn.css';

export default function Learn() {
  const [expandedSection, setExpandedSection] = useState('credit-risk');

  return (
    <div className="learn-container">
      <div className="learn-header">
        <h2>How Our AI Models Work</h2>
        <p>Understanding Credit Risk &amp; Fraud Detection</p>
      </div>

      <div className="learn-content">
        
        {/* CREDIT RISK SECTION */}
        <div className="learn-section">
          <div 
            className="section-header"
            onClick={() => setExpandedSection(expandedSection === 'credit-risk' ? null : 'credit-risk')}
          >
            <h3>📊 Credit Risk Assessment Model</h3>
            <span className="toggle-icon">{expandedSection === 'credit-risk' ? '−' : '+'}</span>
          </div>

          {expandedSection === 'credit-risk' && (
            <div className="section-content">
              <p>
                Our credit risk model predicts the probability that a borrower will default on their loan. 
                It's designed for financial inclusion, helping lenders approve loans for unbanked populations 
                using alternative data sources.
              </p>

              <h4>Risk Factors (in order of importance):</h4>
              <div className="factors-grid">
                <div className="factor-card">
                  <div className="factor-title">1. Payment Regularity (30% weight)</div>
                  <div className="factor-description">
                    How consistently does the borrower pay bills on time? This is the strongest predictor of default.
                  </div>
                  <div className="factor-impact">
                    0.5-0.7: +15% risk | 0.7-0.85: +5% risk | Greater than 0.95: -10% risk
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">2. Income Level (25% weight)</div>
                  <div className="factor-description">
                    Lower income borrowers have higher default rates. We adjust for regional cost of living.
                  </div>
                  <div className="factor-impact">
                    Under $1,000: +25% risk | $1,000-$2,000: +15% risk | $2,000-$5,000: +5% risk
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">3. Credit History (20% weight)</div>
                  <div className="factor-description">
                    Borrowers with longer credit histories are more predictable. No history = high uncertainty.
                  </div>
                  <div className="factor-impact">
                    Under 12 months: +20% risk | 12-24 months: +10% risk | Over 120 months: -10% risk
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">4. Age (15% weight)</div>
                  <div className="factor-description">
                    Age captures financial maturity. Very young and very old borrowers have slightly higher risk.
                  </div>
                  <div className="factor-impact">
                    Under 25 years: +15% risk | 25-35 years: +10% risk | Over 65 years: +5% risk
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">5. Geographic Region (10% weight)</div>
                  <div className="factor-description">
                    Economic conditions vary by region. Data from World Bank and local regulators inform this.
                  </div>
                  <div className="factor-impact">
                    Sub-Saharan Africa: +15% | Middle East: +12% | East Asia: +5%
                  </div>
                </div>
              </div>

              <h4>Risk Categories:</h4>
              <div className="categories">
                <div className="category low">
                  <strong>LOW RISK (0-33%)</strong>
                  <p>Strong indicators for repayment. Recommend approval with standard terms.</p>
                </div>
                <div className="category medium">
                  <strong>MEDIUM RISK (33-67%)</strong>
                  <p>Mixed indicators. Recommend approval with safeguards: collateral, monitoring, lower amount.</p>
                </div>
                <div className="category high">
                  <strong>HIGH RISK (67-100%)</strong>
                  <p>Concerning indicators. Require substantial collateral or additional due diligence.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FRAUD DETECTION SECTION */}
        <div className="learn-section">
          <div 
            className="section-header"
            onClick={() => setExpandedSection(expandedSection === 'fraud' ? null : 'fraud')}
          >
            <h3>🔍 Fraud Detection Model</h3>
            <span className="toggle-icon">{expandedSection === 'fraud' ? '−' : '+'}</span>
          </div>

          {expandedSection === 'fraud' && (
            <div className="section-content">
              <p>
                Our fraud detection model identifies suspicious transactions in real-time. 
                It analyzes transaction patterns to flag potential fraud before money is lost.
              </p>

              <h4>Risk Factors:</h4>
              <div className="factors-grid">
                <div className="factor-card">
                  <div className="factor-title">1. Transaction Amount</div>
                  <div className="factor-description">
                    Unusually large transactions are riskier, especially if above customer's typical pattern.
                  </div>
                  <div className="factor-impact">
                    Over $5,000: +25% fraud risk | $2,000-$5,000: +15% risk | $500-$2,000: +5% risk
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">2. Merchant Category</div>
                  <div className="factor-description">
                    High-risk categories: online retailers, entertainment, travel (higher chargeback rates).
                  </div>
                  <div className="factor-impact">
                    Online/Travel: +20% risk | Entertainment: +15% risk | Grocery/Retail: Low risk
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">3. Time of Day</div>
                  <div className="factor-description">
                    Night transactions (midnight-6am) are unusual and more likely to be fraudulent.
                  </div>
                  <div className="factor-impact">
                    Night (12am-6am): +15% risk | Evening (6pm-12am): +5% risk | Day hours: Normal
                  </div>
                </div>

                <div className="factor-card">
                  <div className="factor-title">4. Account Age</div>
                  <div className="factor-description">
                    New accounts have limited history. Fraudsters often use newly opened accounts.
                  </div>
                  <div className="factor-impact">
                    Under 3 months: +20% risk | 3-12 months: +10% risk | Over 12 months: Low risk
                  </div>
                </div>
              </div>

              <h4>Decision Actions:</h4>
              <div className="actions">
                <div className="action approve">
                  <strong>APPROVE</strong>
                  <p>Low fraud risk (0-40%). Transaction appears legitimate. Process normally.</p>
                </div>
                <div className="action review">
                  <strong>REVIEW</strong>
                  <p>Medium fraud risk (40-70%). Send OTP/2FA. Manual review recommended.</p>
                </div>
                <div className="action block">
                  <strong>BLOCK</strong>
                  <p>High fraud risk (70-100%). Block immediately. Contact customer to verify.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAIRNESS SECTION */}
        <div className="learn-section">
          <div 
            className="section-header"
            onClick={() => setExpandedSection(expandedSection === 'fairness' ? null : 'fairness')}
          >
            <h3>⚖️ Fairness &amp; Transparency</h3>
            <span className="toggle-icon">{expandedSection === 'fairness' ? '−' : '+'}</span>
          </div>

          {expandedSection === 'fairness' && (
            <div className="section-content">
              <p>
                We're committed to fair, transparent, and interpretable AI. All models are regularly 
                audited for bias across different demographic groups.
              </p>

              <h4>What We Monitor:</h4>
              <ul>
                <li>Gender Parity - Similar approval rates for male and female borrowers</li>
                <li>Regional Fairness - Default rates similar across regions after accounting for economic factors</li>
                <li>Income Fairness - Low-income borrowers not systematically disadvantaged</li>
                <li>Data Privacy - All data encrypted and protected</li>
                <li>Transparency - Feature importance scores shown for every prediction</li>
              </ul>
            </div>
          )}
        </div>

        {/* FAQ SECTION */}
        <div className="learn-section">
          <div 
            className="section-header"
            onClick={() => setExpandedSection(expandedSection === 'faq' ? null : 'faq')}
          >
            <h3>❓ Frequently Asked Questions</h3>
            <span className="toggle-icon">{expandedSection === 'faq' ? '−' : '+'}</span>
          </div>

          {expandedSection === 'faq' && (
            <div className="section-content">
              <div className="faq-item">
                <strong>Q: How is this different from traditional credit scoring?</strong>
                <p>
                  Traditional scoring requires credit history. Our model uses alternative data 
                  (payment history, digital footprint, regional indicators) to score the unbanked.
                </p>
              </div>

              <div className="faq-item">
                <strong>Q: Can I appeal a decision?</strong>
                <p>
                  Yes! We provide explanations for every decision. You can request a manual review 
                  and speak with an analyst who can reconsider your application.
                </p>
              </div>

              <div className="faq-item">
                <strong>Q: Is my data secure?</strong>
                <p>
                  Absolutely. All data is encrypted, stored securely, and never sold. 
                  You can request deletion anytime under data protection regulations.
                </p>
              </div>

              <div className="faq-item">
                <strong>Q: How often are models updated?</strong>
                <p>
                  Models are retrained monthly with new data to stay accurate. 
                  We also audit for bias quarterly.
                </p>
              </div>

              <div className="faq-item">
                <strong>Q: Can the model make a mistake?</strong>
                <p>
                  Yes, no model is perfect. That's why we combine AI with human review, 
                  especially for borderline cases.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="learn-footer">
      </div>
    </div>
  );
}
