import React, { createContext, useContext, useReducer, useCallback } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return [...state, action.payload];
        case 'REMOVE_NOTIFICATION':
            return state.filter(notification => notification.id !== action.payload);
        default:
            return state;
    }
};

export const NotificationProvider = ({ children }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, []);

    const showNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: { id, message, type }
        });

        // Auto-remove after 3 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    }, []);

    const removeNotification = useCallback((id) => {
        dispatch({
            type: 'REMOVE_NOTIFICATION',
            payload: id
        });
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}; 