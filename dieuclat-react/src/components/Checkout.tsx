import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { CartItem, AppliedDiscount } from '../types/index';
import { usePromotions } from '../hooks/useAppState';
import StripePayment from './StripePayment';
import { CouponInput } from './CouponInput';
import { PromotionBanners } from './PromotionBanner';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  onBackToCart: () => void;
  onOrderComplete: (orderData: any) => void;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, total, onBackToCart, onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedDiscounts, setAppliedDiscounts] = useState<AppliedDiscount[]>([]);

  // Promotions hook
  const { getActivePromotions, calculatePromotionDiscount, calculateLoyaltyDiscount } = usePromotions();

  // Calculate total with discounts
  const calculateTotalWithDiscounts = () => {
    let finalTotal = total;
    appliedDiscounts.forEach(discount => {
      finalTotal -= discount.discountAmount;
    });
    return Math.max(0, finalTotal); // Ensure total doesn't go negative
  };

  // Get active promotions on component mount
  const [activePromotions, setActivePromotions] = useState<any[]>([]);
  useEffect(() => {
    const promotions = getActivePromotions();
    setActivePromotions(promotions);

    // Auto-apply promotion discounts
    const promotionDiscounts = calculatePromotionDiscount(cart, total);
    setAppliedDiscounts(prev => {
      // Remove existing promotion discounts and add new ones
      const nonPromotionDiscounts = prev.filter(d => d.type !== 'promotion');
      return [...nonPromotionDiscounts, ...promotionDiscounts];
    });
  }, [cart, total, getActivePromotions, calculatePromotionDiscount]);

  // Apply loyalty discount (assuming user has 500 points for demo)
  useEffect(() => {
    const loyaltyDiscount = calculateLoyaltyDiscount(total, 500); // Demo: 500 points
    if (loyaltyDiscount) {
      setAppliedDiscounts(prev => {
        // Remove existing loyalty discount and add new one
        const nonLoyaltyDiscounts = prev.filter(d => d.type !== 'loyalty');
        return [...nonLoyaltyDiscounts, loyaltyDiscount];
      });
    }
  }, [total, calculateLoyaltyDiscount]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Payment is now handled by Stripe component
  };

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToCart}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <div className="w-20"></div> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Promotion Banners */}
        {activePromotions.length > 0 && (
          <div className="max-w-6xl mx-auto mb-8">
            <PromotionBanners promotions={activePromotions} />
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-center">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                      <React.Fragment key={step.id}>
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isActive
                            ? 'border-purple-500 text-purple-500'
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                            step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="flex justify-center mt-4">
                  {steps.map((step) => (
                    <div key={step.id} className="text-center flex-1">
                      <div className={`text-sm font-medium transition-colors duration-300 ${
                        step.id === currentStep ? 'text-purple-600' :
                        step.id < currentStep ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleShippingChange}
                            placeholder="Enter your first name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleShippingChange}
                            placeholder="Enter your last name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleShippingChange}
                            placeholder="Enter your email address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingChange}
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          placeholder="Street address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            placeholder="Enter your city"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleShippingChange}
                            placeholder="Enter your state"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleShippingChange}
                            placeholder="Enter your ZIP code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="billingSame"
                          checked={billingSameAsShipping}
                          onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor="billingSame" className="ml-2 text-sm text-gray-700">
                          Billing address is the same as shipping address
                        </label>
                      </div>
                    </form>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                    <StripePayment
                      amount={total}
                      onSuccess={(paymentIntent) => {
                        const orderData = {
                          id: 'ORD-' + Date.now(),
                          items: cart,
                          total,
                          shipping: shippingInfo,
                          payment: {
                            method: 'stripe',
                            paymentIntentId: paymentIntent.id,
                            status: paymentIntent.status
                          },
                          status: 'confirmed',
                          date: new Date().toISOString()
                        };
                        onOrderComplete(orderData);
                      }}
                      onError={(error) => {
                        alert('Payment failed: ' + error);
                        setIsProcessing(false);
                      }}
                      isProcessing={isProcessing}
                      setIsProcessing={setIsProcessing}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

                    {/* Order Summary */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-medium text-gray-900">Shipping Address</h3>
                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4 mb-6">
                      <h3 className="font-medium text-gray-900">Payment Method</h3>
                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Secure payment via Stripe</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Your card details will be securely processed
                        </p>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-2 mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-800">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-800">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                {/* Coupon Input */}
                <div className="mb-6">
                  <CouponInput
                    cartItems={cart}
                    cartTotal={total}
                    onDiscountApplied={(discount) => {
                      setAppliedDiscounts(prev => {
                        // Remove existing coupon discount and add new one
                        const nonCouponDiscounts = prev.filter(d => d.type !== 'coupon');
                        return [...nonCouponDiscounts, discount];
                      });
                    }}
                    appliedDiscount={appliedDiscounts.find(d => d.type === 'coupon')}
                    onRemoveDiscount={() => {
                      setAppliedDiscounts(prev => prev.filter(d => d.type !== 'coupon'));
                    }}
                  />
                </div>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Applied Discounts */}
                  {appliedDiscounts.map((discount, index) => (
                    <div key={index} className="flex justify-between text-sm text-green-600">
                      <span>{discount.description}</span>
                      <span>-${discount.discountAmount.toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(calculateTotalWithDiscounts() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${(calculateTotalWithDiscounts() + calculateTotalWithDiscounts() * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;