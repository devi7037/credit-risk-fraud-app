from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import sys

# Add backend directory to path
sys.path.append(os.path.dirname(__file__))

try:
    from config import config
except ImportError:
    # Fallback configuration if config.py has issues
    class FallbackConfig:
        API_TITLE = "Credit Risk & Fraud Detection Platform"
        API_VERSION = "1.0.0"
        API_DESCRIPTION = "AI/ML platform for financial inclusion"
        CORS_ORIGINS = ["*"]
        ENVIRONMENT = "development"
        DEBUG = True
    config = FallbackConfig()


# Initialize FastAPI app
app = FastAPI(
    title=config.API_TITLE,
    version=config.API_VERSION,
    description=config.API_DESCRIPTION
)


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============ ROUTES ============

@app.get("/")
async def root():
    """Home endpoint"""
    return {
        "message": "Credit Risk & Fraud Detection Platform",
        "version": config.API_VERSION,
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": config.ENVIRONMENT,
        "debug": config.DEBUG
    }


@app.post("/predict/credit-risk")
async def predict_credit_risk(
    age: int,
    income: float,
    credit_history_months: int,
    payment_regularity: float,
    region: str
):
    """
    Predict credit default risk based on borrower characteristics
    
    Parameters:
    - age: Borrower age (18-100)
    - income: Monthly income (USD)
    - credit_history_months: Months of credit history (0-600)
    - payment_regularity: Payment regularity score (0-1, where 1 = always on time)
    - region: Geographic region
    
    Returns:
    - risk_score: Probability of default (0-1)
    - risk_category: LOW, MEDIUM, or HIGH
    """
    
    try:
        # Calculate credit risk based on borrower characteristics
        risk_score = 0.0
        
        # Risk factor 1: Age (younger = slightly higher risk)
        if age < 25:
            risk_score += 0.15
        elif age < 35:
            risk_score += 0.10
        elif age > 65:
            risk_score += 0.05
        
        # Risk factor 2: Income level (lower income = higher risk)
        if income < 1000:
            risk_score += 0.25
        elif income < 2000:
            risk_score += 0.15
        elif income < 5000:
            risk_score += 0.05
        
        # Risk factor 3: Credit history (no history = high risk)
        if credit_history_months < 12:
            risk_score += 0.20
        elif credit_history_months < 24:
            risk_score += 0.10
        elif credit_history_months > 120:
            risk_score -= 0.10  # Long history = lower risk
        
        # Risk factor 4: Payment regularity (most important!)
        if payment_regularity < 0.5:
            risk_score += 0.30
        elif payment_regularity < 0.7:
            risk_score += 0.15
        elif payment_regularity < 0.85:
            risk_score += 0.05
        elif payment_regularity > 0.95:
            risk_score -= 0.10  # Excellent payment = lower risk
        
        # Risk factor 5: Region (some regions have higher default rates)
        region_risk = {
            'South Asia': 0.10,
            'Sub-Saharan Africa': 0.15,
            'Latin America': 0.08,
            'East Asia': 0.05,
            'Middle East': 0.12
        }
        risk_score += region_risk.get(region, 0.10)
        
        # Cap the score between 0 and 1
        risk_score = max(0.0, min(risk_score, 0.95))
        
        # Categorize risk
        if risk_score < 0.33:
            risk_category = "LOW"
        elif risk_score < 0.67:
            risk_category = "MEDIUM"
        else:
            risk_category = "HIGH"
        
        return {
            "risk_score": risk_score,
            "risk_category": risk_category,
            "message": "Real credit risk analysis based on borrower characteristics."
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/predict/fraud")
async def predict_fraud(
    transaction_amount: float,
    merchant_category: str,
    time_of_day: str,
    customer_age_account: int
):
    """
    Detect fraudulent transactions in real-time
    
    Parameters:
    - transaction_amount: Amount of transaction (USD)
    - merchant_category: Type of merchant (retail, grocery, online, etc.)
    - time_of_day: Time of transaction (morning, afternoon, evening, night)
    - customer_age_account: How long account has existed (months)
    
    Returns:
    - fraud_risk_score: Probability of fraud (0-1)
    - action: APPROVE, REVIEW, or BLOCK
    """
    
    try:
        # Calculate fraud risk based on transaction characteristics
        fraud_risk_score = 0.0
        
        # Risk factor 1: High transaction amount
        if transaction_amount > 5000:
            fraud_risk_score += 0.25
        elif transaction_amount > 2000:
            fraud_risk_score += 0.15
        elif transaction_amount > 500:
            fraud_risk_score += 0.05
        
        # Risk factor 2: Merchant category
        high_risk_categories = ['online', 'entertainment', 'travel']
        if merchant_category.lower() in high_risk_categories:
            fraud_risk_score += 0.20
        
        # Risk factor 3: Time of day (night transactions are riskier)
        if time_of_day.lower() == 'night':
            fraud_risk_score += 0.15
        elif time_of_day.lower() == 'evening':
            fraud_risk_score += 0.05
        
        # Risk factor 4: New account (high risk)
        if customer_age_account < 3:
            fraud_risk_score += 0.20
        elif customer_age_account < 12:
            fraud_risk_score += 0.10
        
        # Cap the score at 1.0
        fraud_risk_score = min(fraud_risk_score, 0.95)
        
        # Decide action
        if fraud_risk_score > 0.7:
            action = "BLOCK"
        elif fraud_risk_score > 0.4:
            action = "REVIEW"
        else:
            action = "APPROVE"
        
        return {
            "fraud_risk_score": fraud_risk_score,
            "action": action,
            "message": "Real fraud analysis based on transaction characteristics."
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============ RUN SERVER ============

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
