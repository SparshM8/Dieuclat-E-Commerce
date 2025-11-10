import React, { useState, useEffect } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Loader2, Lock, Shield } from 'lucide-react';
import { createPaymentIntent } from '../utils/stripeApi';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  clientSecret: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onSuccess,
  onError,
  isProcessing,
  setIsProcessing,
  clientSecret
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // For demo purposes, simulate a successful payment
      // In a real implementation, you would use:
      // const { error, paymentIntent } = await stripe.confirmPayment({...});

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment intent
      const mockPaymentIntent = {
        id: 'pi_mock_' + Date.now(),
        status: 'succeeded',
        amount: Math.round(amount * 100),
        currency: 'usd',
        client_secret: clientSecret
      };

      onSuccess(mockPaymentIntent);
    } catch (error) {
      onError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Secure Payment</span>
        </div>

        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Secure Checkout</h4>
            <p className="text-xs text-blue-700 mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
};

interface StripePaymentProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const StripePayment: React.FC<StripePaymentProps> = (props) => {
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    // Create payment intent when component mounts
    const initializePayment = async () => {
      try {
        const paymentIntent = await createPaymentIntent(props.amount);
        setClientSecret(paymentIntent.clientSecret);
      } catch (error) {
        console.error('Failed to create payment intent:', error);
        // For demo purposes, create a fallback client secret
        setClientSecret('pi_mock_' + Date.now());
      }
    };

    if (props.amount > 0) {
      initializePayment();
    }
  }, [props.amount]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#7c3aed',
      },
    },
  };

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600">Loading payment form...</span>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm {...props} clientSecret={clientSecret} />
    </Elements>
  );
};

export default StripePayment;