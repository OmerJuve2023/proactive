import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit2, Trash2, Check } from 'react-native-feather';
import { CustomNotification } from '@/app/context/NotificationContext'; // Adjust import path as needed

interface NotificationItemProps {
    item: CustomNotification;
    onPress: () => void;
    onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
                                                               item,
                                                               onPress,
                                                               onDelete
                                                           }) => {
    const getPriorityColor = (priority: string) => {
        switch(priority) {
            case 'high': return '#FF6B6B';
            case 'medium': return '#4ECDC4';
            default: return '#888';
        }
    };

    return (
        <View style={styles.notificationItem}>
            <TouchableOpacity
                style={styles.taskCheckbox}
                onPress={onPress}
            >
                {item.read && <Check color="white" fontSize={20} />}
            </TouchableOpacity>

            <View style={styles.notificationDetails}>
                <View style={styles.notificationHeader}>
                    <Text
                        style={[
                            styles.notificationTitle,
                            item.read && styles.readNotification
                        ]}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    <View
                        style={[
                            styles.priorityBadge,
                            { backgroundColor: getPriorityColor(item.priority) }
                        ]}
                    >
                        <Text style={styles.priorityText}>
                            {item.priority.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                </View>

                {item.message ? (
                    <Text
                        style={[
                            styles.notificationMessage,
                            item.read && styles.readNotification
                        ]}
                        numberOfLines={2}
                    >
                        {item.message}
                    </Text>
                ) : null}

                <Text style={styles.notificationTimestamp}>
                    {item.timestamp.toLocaleString()}
                </Text>
            </View>

            <View style={styles.notificationActions}>
                <TouchableOpacity onPress={onDelete}>
                    <Trash2 color="#FF6B6B" fontSize={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#253242',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    taskCheckbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#4ECDC4',
        borderRadius: 5,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationDetails: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priorityText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    notificationMessage: {
        color: '#888',
        marginTop: 5,
    },
    notificationTimestamp: {
        color: '#888',
        fontSize: 12,
        marginTop: 5,
    },
    notificationActions: {
        marginLeft: 10,
    },
    readNotification: {
        opacity: 0.6,
    },
});

export default NotificationItem;