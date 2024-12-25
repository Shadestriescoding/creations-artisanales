import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { useNotification } from '../../contexts/NotificationContext';

const NotificationWrapper = styled(motion.div)`
    position: fixed;
    bottom: ${props => props.theme.spacing.xl};
    right: ${props => props.theme.spacing.xl};
    z-index: 1100;
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    pointer-events: none;
`;

const NotificationItem = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.borderRadius.medium};
    box-shadow: ${props => props.theme.shadows.medium};
    pointer-events: auto;
    border-left: 4px solid ${props => {
        switch (props.type) {
            case 'success':
                return props.theme.colors.success;
            case 'error':
                return props.theme.colors.error;
            case 'info':
                return props.theme.colors.primary;
            default:
                return props.theme.colors.primary;
        }
    }};
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: ${props => props.theme.borderRadius.round};
    background-color: ${props => {
        switch (props.type) {
            case 'success':
                return props.theme.colors.success + '20';
            case 'error':
                return props.theme.colors.error + '20';
            case 'info':
                return props.theme.colors.primary + '20';
            default:
                return props.theme.colors.primary + '20';
        }
    }};
    color: ${props => {
        switch (props.type) {
            case 'success':
                return props.theme.colors.success;
            case 'error':
                return props.theme.colors.error;
            case 'info':
                return props.theme.colors.primary;
            default:
                return props.theme.colors.primary;
        }
    }};
`;

const Message = styled.p`
    margin: 0;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.small};
    font-weight: 500;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    padding: ${props => props.theme.spacing.xs};
    cursor: pointer;
    color: ${props => props.theme.colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${props => props.theme.transitions.fast};
    border-radius: ${props => props.theme.borderRadius.medium};
    margin-left: ${props => props.theme.spacing.md};

    &:hover {
        background-color: ${props => props.theme.colors.backgroundAlt};
        color: ${props => props.theme.colors.text};
    }
`;

const getIcon = (type) => {
    switch (type) {
        case 'success':
            return <FiCheck />;
        case 'error':
            return <FiAlertCircle />;
        case 'info':
            return <FiInfo />;
        default:
            return <FiInfo />;
    }
};

const notificationVariants = {
    initial: {
        opacity: 0,
        y: 50,
        scale: 0.3,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: {
            duration: 0.2,
        },
    },
};

const Notification = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <NotificationWrapper>
            <AnimatePresence>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        variants={notificationVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                    >
                        <IconWrapper type={notification.type}>
                            {getIcon(notification.type)}
                        </IconWrapper>
                        <Message>{notification.message}</Message>
                        <CloseButton
                            onClick={() => removeNotification(notification.id)}
                            aria-label="Fermer la notification"
                        >
                            <FiX />
                        </CloseButton>
                    </NotificationItem>
                ))}
            </AnimatePresence>
        </NotificationWrapper>
    );
};

export default Notification; 