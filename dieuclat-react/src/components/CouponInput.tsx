import React, { useState } from 'react';
import { usePromotions } from '../hooks/useAppState';
import { CartItem } from '../hooks/useAppState';

interface CouponInputProps {
  cartItems: CartItem[];
  cartTotal: number;
  onDiscountApplied: (discount: any) => void;
  appliedDiscount?: any;
  onRemoveDiscount: () => void;
}

export const CouponInput: React.FC<CouponInputProps> = ({
  cartItems,
  cartTotal,
  onDiscountApplied,
  appliedDiscount,
  onRemoveDiscount
}) => {
  const { validateCoupon, applyCoupon } = usePromotions();
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    setValidationMessage(null);

    try {
      const result = validateCoupon(couponCode.trim(), cartTotal, cartItems);

      if (result.valid && result.discount) {
        setValidationMessage({ type: 'success', message: `Coupon applied! You saved $${result.discount.discountAmount.toFixed(2)}` });
        onDiscountApplied(result.discount);
        applyCoupon(result.discount.id);
        setCouponCode('');
      } else {
        setValidationMessage({ type: 'error', message: result.error || 'Invalid coupon code' });
      }
    } catch (error) {
      setValidationMessage({ type: 'error', message: 'Failed to validate coupon. Please try again.' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setValidationMessage(null);
    setCouponCode('');
    onRemoveDiscount();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  if (appliedDiscount) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800">
                {appliedDiscount.code || appliedDiscount.description}
              </p>
              <p className="text-sm text-green-600">
                You saved ${appliedDiscount.discountAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
        Coupon Code
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          id="coupon"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter coupon code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isValidating}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={!couponCode.trim() || isValidating}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? 'Applying...' : 'Apply'}
        </button>
      </div>

      {validationMessage && (
        <div className={`mt-2 text-sm ${validationMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {validationMessage.message}
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        Try: WELCOME10, FREESHIP, or SAVE20
      </div>
    </div>
  );
};