import React, { useState } from 'react';
import { useCart } from '../hooks/useAppState';
import { usePromotions } from '../hooks/useAppState';

interface AdminPanelProps {
  onBackToShop: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToShop }) => {
  const { orders } = useCart();
  const { promotions } = usePromotions();
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeTab, setActiveTab] = useState('orders');

  const filteredOrders = statusFilter === 'All Status'
    ? orders
    : orders.filter(order => order.status === statusFilter.toLowerCase());

  const renderOrdersTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
            <label htmlFor="status-filter" className="sr-only">Filter by status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{order.shipping.firstName} {order.shipping.lastName}</p>
                  <p>{order.shipping.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No orders to display</p>
        )}
      </div>
    </div>
  );

  const renderPromotionsTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Promotions</h2>
      </div>
      <div className="p-6">
        {promotions.length > 0 ? (
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                    <p className="text-sm text-gray-600">{promo.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Valid until: {new Date(promo.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {promo.discountType === 'percentage' ? `${promo.discountValue}% off` : `$${promo.discountValue} off`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No promotions to display</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={onBackToShop}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Shop
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'promotions'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Promotions ({promotions.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'promotions' && renderPromotionsTab()}
      </div>
    </div>
  );
};

export default AdminPanel;