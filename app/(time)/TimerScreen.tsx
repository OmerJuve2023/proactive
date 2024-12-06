import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions
} from 'react-native';
import { useRouter } from "expo-router";
import {
    ChevronLeft,
    Play,
    Pause,
    RotateCw,
    Clock
} from 'react-native-feather';

import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import {useTimer} from "@/app/context/TImeContext";

const { width } = Dimensions.get('window');

const TimerScreen = () => {
    const router = useRouter();
    const {
        time,
        isRunning,
        isBreak,
        startTimer,
        pauseTimer,
        resetTimer,
        resumeTimer,
        switchMode
    } = useTimer();
    const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState(25);

    const handleNavigation = () => {
        router.back();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const presets = [
        { label: '25 minutos', value: 25 },
        { label: '50 minutos', value: 50 },
        { label: '90 minutos', value: 90 }
    ];

    const handleStartTimer = () => {
        startTimer(selectedPreset * 60);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleNavigation}>
                <ChevronLeft color="white" fontSize={24} />
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>

            <View style={styles.timerContainer}>
                <Text style={styles.modeTitle}>
                    {isBreak ? 'Descanso' : 'Sesión de Trabajo'}
                </Text>

                <CircularProgressBase
                    value={(time / (isBreak ? 5 * 60 : 25 * 60)) * 100}
                    maxValue={100}
                    radius={width * 0.35}
                    activeStrokeWidth={15}
                    inActiveStrokeWidth={15}
                    activeStrokeColor="#4ECDC4"
                    inActiveStrokeColor="#253242"
                >
                    <Text style={styles.timerText}>
                        {formatTime(time)}
                    </Text>
                </CircularProgressBase>

                <View style={styles.controlsContainer}>
                    {!isRunning ? (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={handleStartTimer}
                        >
                            <Play color="white" fontSize={30} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={pauseTimer}
                        >
                            <Pause color="white" fontSize={30} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={resetTimer}
                    >
                        <RotateCw color="white" fontSize={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={switchMode}
                    >
                        <Clock color="white" fontSize={30} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => setSettingsModalVisible(true)}
            >
                <Text style={styles.settingsButtonText}>Configuración</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isSettingsModalVisible}
                onRequestClose={() => setSettingsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Configurar Temporizador</Text>

                        {presets.map((preset) => (
                            <TouchableOpacity
                                key={preset.value}
                                style={[
                                    styles.presetButton,
                                    selectedPreset === preset.value && styles.selectedPreset
                                ]}
                                onPress={() => {
                                    setSelectedPreset(preset.value);
                                    setSettingsModalVisible(false);
                                }}
                            >
                                <Text style={styles.presetButtonText}>
                                    {preset.label}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setSettingsModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Cancelar</Text>
                        </TouchableOpacity>
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
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modeTitle: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    timerText: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        gap: 30,
    },
    controlButton: {
        backgroundColor: '#4ECDC4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButton: {
        backgroundColor: '#253242',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    settingsButtonText: {
        color: 'white',
        fontSize: 16,
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
    presetButton: {
        backgroundColor: '#1A2634',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    selectedPreset: {
        backgroundColor: '#4ECDC4',
    },
    presetButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalCloseButton: {
        backgroundColor: '#4ECDC4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TimerScreen;