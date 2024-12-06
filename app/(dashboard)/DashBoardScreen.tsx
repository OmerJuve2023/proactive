import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { CheckSquare, Clock, Bell, Repeat, User } from 'react-native-feather';
import { useRouter } from "expo-router";
import { useUser } from "@/app/context/UserContext";

// Definir tipos de rutas válidas
type ScreenName =
    | '/(task)/TasksScreen'
    | '/(time)/TimerScreen'
    | '/(notification)/NotificationScreen'
    | '/(resources)/TipsResourcesScreen';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
    const router = useRouter();
    const { userData } = useUser();

    const handleNavigation = (screenName: ScreenName) => {
        router.push(screenName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.navbar}>
                <View style={styles.userInfo}>
                    <User color="#4ECDC4" fontSize={24} />
                    <Text style={styles.greeting}>
                        Hola, {userData.name || 'Usuario'}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.profileLink}>Perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.iconsContainer}>
                    {[
                        {
                            icon: CheckSquare,
                            text: 'Tareas',
                            screen: '/(task)/TasksScreen'
                        },
                        {
                            icon: Clock,
                            text: 'Temporizador',
                            screen: '/(time)/TimerScreen'
                        },
                        {
                            icon: Bell,
                            text: 'Notificaciones',
                            screen: '/(notification)/NotificationScreen'
                        },
                        {
                            icon: Repeat,
                            text: 'Consejos y recursos',
                            screen: '/(resources)/TipsResourcesScreen'
                        }
                    ].map(({ icon: Icon, text, screen }, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.iconBox}
                            onPress={() => handleNavigation(screen as ScreenName)} // Asegurarse de que screen es del tipo ScreenName
                        >
                            <View style={styles.iconWrapper}>
                                <Icon color="#4ECDC4" fontSize={40} />
                            </View>
                            <Text style={styles.iconText}>{text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1A2634',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#253242',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    profileLink: {
        color: '#4ECDC4',
        fontSize: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    iconBox: {
        width: width * 0.4,
        alignItems: 'center',
        marginVertical: 15,
        backgroundColor: '#253242',
        borderRadius: 15,
        paddingVertical: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconWrapper: {
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        borderRadius: 50,
        padding: 15,
        marginBottom: 10,
    },
    iconText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DashboardScreen;
