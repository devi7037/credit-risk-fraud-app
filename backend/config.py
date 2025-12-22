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
    
    # CORS Settings
    CORS_ORIGINS = ["*"]
    
    # Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"

    # Claude Haiku model toggle
    # Set environment variable CLAUDE_HAIKU_ENABLED to "True" to enable for all clients
    CLAUDE_HAIKU_ENABLED = os.getenv("CLAUDE_HAIKU_ENABLED", "True").lower() == "true"
    CLAUDE_HAIKU_VERSION = os.getenv("CLAUDE_HAIKU_VERSION", "4.5")
# Create config instance
config = Config()
