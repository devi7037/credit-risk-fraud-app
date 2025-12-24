import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration for the application"""
    
    # API Settings
    API_TITLE = "Credit Risk & Fraud Detection Platform"
    API_VERSION = "1.0.0"
    API_DESCRIPTION = "AI/ML platform for financial inclusion using alternative data"
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./credit_risk.db")
    
    # Model Paths
    CREDIT_MODEL_PATH = os.getenv("CREDIT_MODEL_PATH", "models/credit_risk_model.pkl")
    FRAUD_MODEL_PATH = os.getenv("FRAUD_MODEL_PATH", "models/fraud_model.pkl")
    
    # CORS Settings (Updated for production)
    CORS_ORIGINS = [
        "https://devi7037.github.io",
        "http://localhost:3000",
        "http://localhost:8000",
        "*"
    ]
    
    # Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT", "production")
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    
    # Claude Haiku model toggle
    CLAUDE_HAIKU_ENABLED = os.getenv("CLAUDE_HAIKU_ENABLED", "False").lower() == "true"
    CLAUDE_HAIKU_VERSION = os.getenv("CLAUDE_HAIKU_VERSION", "4.5")

# Create config instance
config = Config()
