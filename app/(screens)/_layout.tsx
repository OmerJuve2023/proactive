import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="not-found" options={{ headerShown: false }} />
            <Stack.Screen name="(task)" options={{headerShown:false}}/>
            <Stack.Screen name="(time)" options={{headerShown:false}}/>
            <Stack.Screen name="(dashboard)" options={{headerShown:false}}/>
            <Stack.Screen name="(resources)" options={{ headerShown: false }} />
            <Stack.Screen name="(notification)" options={{ headerShown: false }} />
        </Stack>
    );
}