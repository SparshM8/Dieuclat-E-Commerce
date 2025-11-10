import React from 'react';
import { NotificationType } from '../hooks/useAppState';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface NotificationContainerProps {
  notifications: NotificationType[];
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="fixed top-24 right-8 z-50 space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-xl shadow-2xl transform translate-x-full animate-fade-in ${getColors(notification.type)}`}
        >
          <div className="flex items-center gap-3">
            {getIcon(notification.type)}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};