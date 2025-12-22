
# Credit Risk & Fraud Detection App

A full‑stack web application that helps assess **credit risk** and detect **fraudulent transactions** using a React frontend and a backend API. Users can sign up, log in, and then access tools for credit risk scoring and fraud analysis.[web:49]

---

## Features

- **User authentication**
  - Sign up with email and password.
  - Login form with validation and error messages.
- **Credit risk assessment**
  - Inputs:
    - Age  
    - Monthly income  
    - Credit history (months)  
    - Payment regularity (0–1)  
    - Region  
  - Sends data to a `/predict/credit-risk` API and displays:
    - Risk score percentage  
    - Risk category (Low / Medium / High)  
    - Color‑coded card and explanation text.
- **Fraud detection**
  - Separate page/component for detecting suspicious transactions via backend API.
- **Learning section**
  - “Learn” page describing credit risk and fraud concepts and how the tool works.
- **Responsive UI**
  - Modern responsive layout built with plain CSS for desktop and mobile.

---

## Project Structure

```
Credit_Fraud/
├── backend/           # Backend API (e.g. FastAPI / Python)
│   └── ...            # Backend source, requirements, etc.
└── frontend/          # React frontend
    ├── src/
    │   ├── App.js
    │   ├── components/
    │   │   ├── HomePage.jsx
    │   │   ├── CreditRiskForm.jsx
    │   │   ├── FraudDetector.jsx
    │   │   ├── Learn.jsx
    │   │   ├── LoginPage.jsx
    │   │   └── SignupPage.jsx
    │   └── styles, assets, etc.
    └── package.json
```

Adjust the structure above if your folders/files differ.

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** for the React frontend.[web:49]
- **Python 3.x** and **pip** for the backend.
- **Git** to clone the repository.

---

## Running the Frontend (React)

From the `frontend` folder:

```
cd frontend
npm install
npm start
```

The React app will be available at:

```
http://localhost:3000
```

---

## Running the Backend

From the `backend` folder (example with FastAPI + Uvicorn):

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Then the API will be available at:

```
http://localhost:8000
```

Update the base URL in your React components if your backend runs on a different host or port.

---

## Example API Endpoints

- **Credit Risk Prediction**

  ```
  POST /predict/credit-risk
  ```

  Query parameters:

  - `age`
  - `income`
  - `credit_history_months`
  - `payment_regularity`
  - `region`

  Example response:

  ```
  {
    "risk_score": 0.42
  }
  ```

- **Fraud Detection**

  ```
  POST /predict/fraud
  ```

  Transaction fields depend on your backend implementation.

Ensure that endpoint URLs used in `CreditRiskForm.jsx` and `FraudDetector.jsx` match your backend routes.

---

## Authentication Flow

- **Sign Up**
  - User creates an account with name, email, and password.
  - Credentials are stored (demo: local storage or simple backend storage).
- **Login**
  - User provides email and password.
  - On success, user is marked as logged in and can access:
    - Home
    - Credit Risk
    - Fraud Detection
    - Learn

This can be later upgraded to proper backend authentication with JWT or sessions.[web:49]

---

## Deployment

- **Frontend**
  - Can be deployed to GitHub Pages, Vercel, or Netlify.
  - For GitHub Pages with Create React App, add a `homepage` field and `deploy` script using `gh-pages` in `package.json`.[web:43][web:49]
- **Backend**
  - Can be deployed to services such as Render, Railway, or a VPS.
  - After backend deployment, update the API base URL in the React app from `http://localhost:8000` to the live backend URL.

---

## Future Improvements

- Replace demo auth with real database‑backed auth.
- Enhance fraud detection logic (rules + ML).
- Add better error handling and loading indicators.
- Add tests for frontend and backend.

---
