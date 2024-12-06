import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
    name: string;
    age: number | null;
    profileCompleted: boolean;
}

interface UserContextType {
    userData: UserData;
    updateUserData: (newData: Partial<UserData>) => Promise<void>;
}

// Crear contexto con valor inicial
const UserContext = createContext<UserContextType>({
    userData: {
        name: '',
        age: null,
        profileCompleted: false
    },
    updateUserData: async () => {}
});

// Proveedor del contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        age: null,
        profileCompleted: false
    });

    // Cargar datos al iniciar
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setUserData(parsedData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData().then(r => r);
    }, []);

    // Guardar datos cuando cambian
    const updateUserData = async (newData: Partial<UserData>) => {
        try {
            const updatedData = { ...userData, ...newData };
            setUserData(updatedData);
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);