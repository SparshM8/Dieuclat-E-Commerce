import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

/**
 * Hook for managing toast notifications
 * Usage:
 * const { toasts, show, remove } = useToast();
 * show('Success!', 'success', 3000);
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    duration = 3000
  ) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };

    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }

    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    show,
    remove,
    removeAll
  };
};

/**
 * Utility functions for quick toast usage with global state
 */
let globalToastHandler: null | ((params: { message: string; type: string; duration?: number }) => void) = null;

export const setGlobalToastHandler = (handler: (params: { message: string; type: string; duration?: number }) => void) => {
  globalToastHandler = handler;
};

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success',
  duration = 3000
) => {
  if (globalToastHandler) {
    globalToastHandler({ message, type, duration });
  }
};
