import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import uuid from 'react-native-uuid';
import { Task } from '../types/Task';

export interface CustomNotification {
    id: string;
    title: string;
    message: string;
    type: 'task' | 'reminder' | 'system';
    relatedEntityId?: string; // Optional ID to link to a task or other entity
    timestamp: Date;
    read: boolean;
    priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
    notifications: CustomNotification[];
    addNotification: (notification: Omit<CustomNotification, 'id' | 'timestamp'>) => void;
    markNotificationAsRead: (id: string) => void;
    markAllNotificationsAsRead: () => void;
    deleteNotification: (id: string) => void;
    getUnreadCount: () => number;
    generateTaskNotification: (task: Task) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<CustomNotification[]>([]);

    const addNotification = useCallback((
        notificationData: Omit<CustomNotification, 'id' | 'timestamp'>
    ) => {
        const newNotification: CustomNotification = {
            ...notificationData,
            id: uuid.v4().toString(),
            timestamp: new Date()
        };
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    }, []);

    const markNotificationAsRead = useCallback((id: string) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
                notif.id === id ? {...notif, read: true} : notif
            )
        );
    }, []);

    const markAllNotificationsAsRead = useCallback(() => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notif => ({...notif, read: true}))
        );
    }, []);

    const deleteNotification = useCallback((id: string) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notif => notif.id !== id)
        );
    }, []);

    const getUnreadCount = useCallback(() => {
        return notifications.filter(notif => !notif.read).length;
    }, [notifications]);

    const generateTaskNotification = useCallback((task: Task) => {
        // Generate different notifications based on task properties
        if (!task.completed) {
            let priority: 'low' | 'medium' | 'high' = 'medium'; // Default to 'medium'

            // Prioritize based on task properties (e.g., high priority if 'high', else 'medium')
            if (task.priority === 'high') {
                priority = 'high';
            } else if (task.priority === 'low') {
                priority = 'low';
            }

            addNotification({
                title: 'Tarea Pendiente',
                message: `Recuerda completar la tarea: ${task.title}`,
                type: 'task',
                relatedEntityId: task.id,
                read: false,
                priority
            });
        }

        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const now = new Date();
            const timeDiff = dueDate.getTime() - now.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24);

            if (daysDiff <= 1) {
                addNotification({
                    title: 'Fecha Límite Próxima',
                    message: `La tarea "${task.title}" está cerca de su fecha límite`,
                    type: 'task',
                    relatedEntityId: task.id,
                    read: false,
                    priority: 'high' // Always 'high' for upcoming due dates
                });
            }
        }
    }, [addNotification]);


    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            markNotificationAsRead,
            markAllNotificationsAsRead,
            deleteNotification,
            getUnreadCount,
            generateTaskNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};