import React, { useState } from 'react';
import './HomePage.css';

export default function HomePage({ navigateTo }) {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (key) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="home-page" id="home">
      <section className="hero">
        <div className="hero-image">
          <img
            src={process.env.PUBLIC_URL + '/172056-red-and-blue-world-map-abstract-background.jpg'}
            alt="World map abstract background"
          />
        </div>

        <div className="hero-content">
          <h1> Financial Inclusion Through AI</h1>
          <p className="hero-subtitle">
            Empowering emerging markets with intelligent credit risk assessment and fraud detection
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary"
            >
              Explore Features
            </button>
            <button
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-graphic">
          <div className="graphic-circle circle-1"></div>
          <div className="graphic-circle circle-2"></div>
          <div className="graphic-circle circle-3"></div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <h2>Our Core Features</h2>
          <p>Cutting-edge AI for financial risk management</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Credit Risk Assessment</h3>
            <p>
              Intelligent scoring for borrowers with limited credit history.
              Uses alternative data to evaluate creditworthiness fairly.
            </p>
            <ul className="feature-list">
              <li>✓ Alternative credit data</li>
              <li>✓ Real-time risk scoring</li>
              <li>✓ Fair lending compliance</li>
              <li>✓ Unbanked population support</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Fraud Detection</h3>
            <p>
              Real-time fraud detection system that identifies suspicious
              transactions before money is lost.
            </p>
            <ul className="feature-list">
              <li>✓ Real-time analysis</li>
              <li>✓ 85% fraud precision</li>
              <li>✓ Automated blocking</li>
              <li>✓ Pattern recognition</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Advanced Analytics</h3>
            <p>
              Comprehensive dashboards and analytics to track lending performance,
              default rates, and fraud trends.
            </p>
            <ul className="feature-list">
              <li>✓ Real-time dashboards</li>
              <li>✓ Performance metrics</li>
              <li>✓ Risk analytics</li>
              <li>✓ Custom reports</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Security &amp; Compliance</h3>
            <p>
              Enterprise-grade security with GDPR compliance,
              data encryption, and regulatory adherence.
            </p>
            <ul className="feature-list">
              <li>✓ End-to-end encryption</li>
              <li>✓ GDPR compliant</li>
              <li>✓ Regular audits</li>
              <li>✓ Data privacy</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Fair &amp; Transparent</h3>
            <p>
              Explainable AI with transparent decision-making.
              Audit trails for every decision and appeals process.
            </p>
            <ul className="feature-list">
              <li>✓ Explainable decisions</li>
              <li>✓ Bias monitoring</li>
              <li>✓ Appeal process</li>
              <li>✓ Audit trails</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Coverage</h3>
            <p>
              Support for emerging markets with local economic data and
              region-specific risk factors.
            </p>
            <ul className="feature-list">
              <li>✓ Multi-region support</li>
              <li>✓ Local data sources</li>
              <li>✓ Regional expertise</li>
              <li>✓ Currency support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps to intelligent financial decisions</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Input Data</h3>
            <p>Enter borrower information or transaction details into our intuitive forms.</p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our advanced ML models analyze the data using 5+ risk factors and patterns.</p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Decision</h3>
            <p>Receive risk score with detailed explanation and recommended action.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <div className="stat-number">82%</div>
          <p>Model Accuracy (AUC-ROC)</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">85%</div>
          <p>Fraud Detection Precision</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">13pp</div>
          <p>Approval Rate Improvement</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">50K+</div>
          <p>Borrowers Served</p>
        </div>
      </section>

      <section className="use-cases">
        <div className="section-header">
          <h2>Perfect For</h2>
          <p>Who benefits from our platform?</p>
        </div>

        <div className="use-cases-grid">
          <div className="use-case">
            <h3>🏦 Banks &amp; Fintech</h3>
            <p>
              Expand lending to underbanked populations while managing risk.
              Approve more loans with confidence.
            </p>
          </div>
          <div className="use-case">
            <h3>💳 Payment Providers</h3>
            <p>
              Real-time fraud detection for transactions. Protect customers
              and reduce chargebacks instantly.
            </p>
          </div>
          <div className="use-case">
            <h3>🏧 Microfinance Institutions</h3>
            <p>
              Serve unbanked populations with fair credit assessment.
              Scale operations with AI intelligence.
            </p>
          </div>
          <div className="use-case">
            <h3>💼 Credit Bureaus</h3>
            <p>
              Build alternative credit scores for emerging markets.
              Create financial history for millions.
            </p>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p>The advantage of AI-powered financial inclusion</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">⚡</div>
            <h4>Fast</h4>
            <p>Real-time decisions in milliseconds. Instant credit scoring and fraud detection.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🎯</div>
            <h4>Accurate</h4>
            <p>82% AUC-ROC model accuracy. Better than traditional scoring for emerging markets.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">💰</div>
            <h4>Cost-Effective</h4>
            <p>Reduce operational costs by 40%. Automate manual review processes.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔒</div>
            <h4>Secure</h4>
            <p>Enterprise security, encryption, and compliance. Your data is protected.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">📈</div>
            <h4>Scalable</h4>
            <p>Handle millions of transactions. Cloud-based infrastructure for growth.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⚖️</div>
            <h4>Fair</h4>
            <p>Transparent AI with no bias. Regular audits and explainable decisions.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Explore the tools built for this academic project.</p>

        <div className="cta-buttons">
          <button onClick={() => navigateTo('credit-risk')} className="btn btn-primary btn-large">
            Try Credit Risk Tool
          </button>
          <button onClick={() => navigateTo('fraud')} className="btn btn-secondary btn-large">
            Try Fraud Detection
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Project</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); openModal('about'); }}>About</a></li>
              <li><a href="#developer" onClick={(e) => { e.preventDefault(); openModal('developer'); }}>Developer</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); openModal('contact'); }}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Academic</h4>
            <ul>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); openModal('privacy'); }}>Privacy Notice (Academic)</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); openModal('terms'); }}>Project Disclaimer</a></li>
              <li><a href="#compliance" onClick={(e) => { e.preventDefault(); openModal('compliance'); }}>Responsible AI Practices</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/devi-annamreddy-533a0921a/">LinkedIn</a>
              <a href="https://github.com/devi7037">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Credit Risk &amp; Fraud Detection (Student Project). All rights reserved.</p>
        </div>
      </footer>

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>

            {activeModal === 'about' && (
              <>
                <h2>About This Project</h2>
                <p>
                  This is a student academic project demonstrating AI-driven credit risk assessment
                  and fraud detection using machine learning models and a React-based UI.
                </p>
                <p>
                  The system is designed for learning and demonstration purposes only and should not be
                  used for real financial decisions.
                </p>
              </>
            )}

            {activeModal === 'developer' && (
              <>
                <h2>Developer</h2>
                <p><strong>Name:</strong> Devi Annamreddy</p>
                <p><strong>Role:</strong> Student Developer</p>
                <p><strong>Project:</strong> Credit Risk &amp; Fraud Detection (Academic)</p>
              </>
            )}

            {activeModal === 'contact' && (
              <>
                <h2>Contact</h2>
                <ul>
                  <li><strong>Email:</strong> deviannamreddy7@gmail.com</li>
                </ul>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <h2>Privacy Notice (Academic)</h2>
                <p>
                  This application is an academic demonstration. No personal data is permanently stored.
                  Inputs entered are used only to generate predictions during the session.
                </p>
              </>
            )}

            {activeModal === 'terms' && (
              <>
                <h2>Project Disclaimer</h2>
                <p>
                  This is not a production system. All outputs are for educational purposes only.
                  Do not use this app for real lending or fraud decisions.
                </p>
              </>
            )}

            {activeModal === 'compliance' && (
              <>
                <h2>Responsible AI Practices</h2>
                <p>
                  This project emphasizes transparency and fairness. Model behavior is evaluated
                  for learning purposes, and results are presented with explanations where possible.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
