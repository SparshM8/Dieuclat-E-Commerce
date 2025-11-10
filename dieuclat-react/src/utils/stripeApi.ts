// Mock API for creating Stripe payment intents
// In a real application, this would be a backend API endpoint

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real implementation, you would call your backend API:
  // const response = await fetch('/api/create-payment-intent', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ amount: amount * 100, currency })
  // });
  // const data = await response.json();
  // return data;

  // For demo purposes, return a mock client secret
  return {
    clientSecret: `pi_mock_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    amount: amount * 100, // Convert to cents
    currency
  };
};