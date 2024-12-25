import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message) => {
        addToast(message, 'success');
    }, [addToast]);

    const error = useCallback((message) => {
        addToast(message, 'error');
    }, [addToast]);

    const info = useCallback((message) => {
        addToast(message, 'info');
    }, [addToast]);

    const warning = useCallback((message) => {
        addToast(message, 'warning');
    }, [addToast]);

    const value = {
        addToast,
        removeToast,
        success,
        error,
        info,
        warning
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast-container">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            className={`toast toast-${toast.type}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                        >
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export default ToastProvider;
