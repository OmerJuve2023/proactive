import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    Switch
} from 'react-native';
import { useRouter } from "expo-router";
import { ChevronLeft, Plus, Trash2, Edit2, Check } from 'react-native-feather';

import { Task } from '@/app/types/Task';
import {useTasks} from "@/app/context/TaskContext";

const TasksScreen = () => {
    const router = useRouter();
    const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState<Partial<Task>>({});
    const [isEditing, setIsEditing] = useState(false);

    const handleNavigation = () => {
        router.back();
    };

    const openAddTaskModal = () => {
        setCurrentTask({});
        setIsEditing(false);
        setModalVisible(true);
    };

    const openEditTaskModal = (task: Task) => {
        setCurrentTask(task);
        setIsEditing(true);
        setModalVisible(true);
    };

    const handleSaveTask = () => {
        if (!currentTask.title) return;

        if (isEditing) {
            updateTask(currentTask.id!, currentTask);
        } else {
            addTask({
                title: currentTask.title!,
                description: currentTask.description || '',
                completed: false,
                priority: currentTask.priority || 'medium',
                dueDate: currentTask.dueDate
            });
        }
        setModalVisible(false);
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <View style={styles.taskItem}>
            <TouchableOpacity
                style={styles.taskCheckbox}
                onPress={() => toggleTaskCompletion(item.id)}
            >
                {item.completed && <Check color="white" fontSize={20} />}
            </TouchableOpacity>
            <View style={styles.taskDetails}>
                <Text
                    style={[
                        styles.taskTitle,
                        item.completed && styles.completedTask
                    ]}
                >
                    {item.title}
                </Text>
                {item.description ? (
                    <Text style={styles.taskDescription}>
                        {item.description}
                    </Text>
                ) : null}
            </View>
            <View style={styles.taskActions}>
                <TouchableOpacity onPress={() => openEditTaskModal(item)}>
                    <Edit2 color="#4ECDC4" fontSize={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Trash2 color="#FF6B6B" fontSize={20} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleNavigation}>
                <ChevronLeft color="white" fontSize={24} />
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Mis Tareas</Text>

            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay tareas</Text>
                }
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={openAddTaskModal}
            >
                <Plus color="white" fontSize={24} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Título de la tarea"
                            placeholderTextColor="#888"
                            value={currentTask.title}
                            onChangeText={(text) => setCurrentTask({...currentTask, title: text})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Descripción (opcional)"
                            placeholderTextColor="#888"
                            value={currentTask.description}
                            onChangeText={(text) => setCurrentTask({...currentTask, description: text})}
                            multiline
                        />

                        <View style={styles.priorityContainer}>
                            <Text style={styles.priorityLabel}>Prioridad:</Text>
                            {(['low', 'medium', 'high'] as const).map((priority) => (
                                <TouchableOpacity
                                    key={priority}
                                    style={[
                                        styles.priorityButton,
                                        currentTask.priority === priority && styles.selectedPriority
                                    ]}
                                    onPress={() => setCurrentTask({...currentTask, priority})}
                                >
                                    <Text style={styles.priorityButtonText}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleSaveTask}
                            >
                                <Text style={styles.modalButtonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A2634',
        padding: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    taskItem: {
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
    taskDetails: {
        flex: 1,
    },
    taskTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    taskDescription: {
        color: '#888',
        marginTop: 5,
    },
    taskActions: {
        flexDirection: 'row',
        gap: 15,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#4ECDC4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#253242',
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1A2634',
        color: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    priorityLabel: {
        color: 'white',
        fontSize: 16,
    },
    priorityButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1A2634',
    },
    selectedPriority: {
        backgroundColor: '#4ECDC4',
    },
    priorityButtonText: {
        color: 'white',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#4ECDC4',
        borderRadius: 10,
        padding: 15,
        width: '45%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TasksScreen;