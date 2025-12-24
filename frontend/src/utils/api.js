const API_BASE_URL = 'https://credit-risk-fraud-app-backend.onrender.com';

export const fetchCreditRisk = async (formData) => {
  const params = new URLSearchParams();
  params.append('age', formData.age);
  params.append('income', formData.income);
  params.append('credit_history_months', formData.credit_history_months);
  params.append('payment_regularity', formData.payment_regularity);
  params.append('region', formData.region);

  const response = await fetch(
    `${API_BASE_URL}/predict/credit-risk?${params}`,
    { method: 'POST' }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchFraudDetection = async (formData) => {
  const params = new URLSearchParams();
  params.append('transaction_amount', formData.transaction_amount);
  params.append('merchant_category', formData.merchant_category);
  params.append('time_of_day', formData.time_of_day);
  params.append('customer_age_account', formData.customer_age_account);

  const response = await fetch(
    `${API_BASE_URL}/predict/fraud?${params}`,
    { method: 'POST' }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json();
};
