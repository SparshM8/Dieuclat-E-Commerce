import React from 'react';
import { CheckCircle, Truck, Package, Clock } from 'lucide-react';

interface OrderConfirmationProps {
  order: {
    id: string;
    items: any[];
    total: number;
    shipping: any;
    date: string;
  };
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onContinueShopping }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order #{order.id}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Total Amount</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Order Items</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Information */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-900">
                  {order.shipping.firstName} {order.shipping.lastName}
                </p>
                <p>{order.shipping.address}</p>
                <p>
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                </p>
                <p>{order.shipping.email}</p>
                <p>{order.shipping.phone}</p>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Your order is being prepared and will be shipped within 1-2 business days.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Expected delivery by {estimatedDelivery.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Track Your Order</h3>
                <p className="text-sm text-gray-600 mb-3">
                  You'll receive an email confirmation with tracking information once your order ships.
                </p>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  View Order Details →
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onContinueShopping}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              View Order History
            </button>
          </div>

          {/* Customer Support */}
          <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our customer service team is here to help with any questions about your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Contact Support
              </button>
              <span className="hidden sm:block text-gray-300">|</span>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Shipping Info
              </button>
              <span className="hidden sm:block text-gray-300">|</span>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Returns Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;