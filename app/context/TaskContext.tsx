import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Task } from '../types/Task';
import uuid from 'react-native-uuid';
import { useNotifications } from "@/app/context/NotificationContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (id: string, updatedTask: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskCompletion: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { generateTaskNotification } = useNotifications();

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                }
            } catch (error) {
                console.error('Error loading tasks from AsyncStorage', error);
            }
        };

        loadTasks();
    }, []);

    // Guardar las tareas en AsyncStorage cada vez que cambien
    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            } catch (error) {
                console.error('Error saving tasks to AsyncStorage', error);
            }
        };

        saveTasks();
    }, [tasks]);

    const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: uuid.v4().toString(),
            createdAt: new Date()
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        generateTaskNotification(newTask);
    };

    const updateTask = (id: string, updatedTask: Partial<Task>) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, ...updatedTask } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === id) {
                    const updatedTask = { ...task, completed: !task.completed };

                    // Generate notification based on task completion
                    generateTaskNotification(updatedTask);

                    return updatedTask;
                }
                return task;
            })
        );
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            updateTask,
            deleteTask,
            toggleTaskCompletion
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
