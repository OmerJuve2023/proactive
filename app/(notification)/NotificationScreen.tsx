import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { ChevronLeft, Bell, Trash2 } from 'react-native-feather';
import { useRouter } from "expo-router";
import {CustomNotification, useNotifications} from "@/app/context/NotificationContext";
import NotificationItem from './NotificationItem'; // Asegúrate de que la ruta sea correcta

const NotificationScreen = () => {
    const router = useRouter();
    const {
        notifications,
        markNotificationAsRead,
        deleteNotification,
        markAllNotificationsAsRead
    } = useNotifications();

    const handleNavigation = () => {
        router.back();
    };

    const handleDeleteNotification = (id: string) => {
        Alert.alert(
            'Eliminar Notificación',
            '¿Estás seguro de que quieres eliminar esta notificación?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => deleteNotification(id)
                }
            ]
        );
    };

    const handleClearAllNotifications = () => {
        Alert.alert(
            'Limpiar Notificaciones',
            '¿Deseas marcar todas las notificaciones como leídas?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: markAllNotificationsAsRead
                }
            ]
        );
    };

    const renderNotificationItem = ({ item }: { item: CustomNotification }) => (
        <NotificationItem
            item={item}
            onPress={() => markNotificationAsRead(item.id)}
            onDelete={() => handleDeleteNotification(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={handleNavigation}>
                    <ChevronLeft color="white" fontSize={24} />
                    <Text style={styles.backButtonText}>Atrás</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.clearAllButton}
                    onPress={handleClearAllNotifications}
                >
                    <Text style={styles.clearAllButtonText}>Marcar todo como leído</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Bell color="#4ECDC4" fontSize={24} />
                <Text style={styles.title}>Notificaciones</Text>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay notificaciones</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A2634',
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    clearAllButton: {
        backgroundColor: '#253242',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    clearAllButtonText: {
        color: '#4ECDC4',
        fontSize: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    listContainer: {
        flexGrow: 1,
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default NotificationScreen;