import React from 'react';

interface AdminPanelProps {
  onBackToShop: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToShop }) => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={onBackToShop}>Back to Shop</button>
    </div>
  );
};

export default AdminPanel;