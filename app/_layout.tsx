import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';

import { TaskProvider } from './context/TaskContext'; // Correct import. Ensure TaskProvider is exported from TaskContext.tsx
import { TimerProvider } from './context/TImeContext';  // Correct import. Ensure TimerProvider is exported from TimeContext.tsx
import { UserProvider } from './context/UserContext';
import {NotificationProvider} from'./context/NotificationContext';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <UserProvider>
            <NotificationProvider>
            <TaskProvider>
                <TimerProvider>
                    <Stack screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        headerShown: false
                    }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="(task)/TasksScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="(time)/TimerScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="(resources)/TipsResourcesScreen" options={{ headerShown: false }} />
                        <Stack.Screen name="(notification)/NotificationScreen" options={{ headerShown: false }} />
                    </Stack>
                </TimerProvider>
            </TaskProvider>
            </NotificationProvider>
        </UserProvider>

    );
}
