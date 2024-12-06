import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import {useUser} from "@/app/context/UserContext";


export default function RegisterScreen() {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const router = useRouter();
    const { updateUserData } = useUser();

    const handleSubmit = async () => {
        // Validaciones básicas
        if (!name.trim() || !age.trim()) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const ageNumber = parseInt(age);
        if (isNaN(ageNumber) || ageNumber < 13 || ageNumber > 120) {
            alert('Por favor, ingresa una edad válida');
            return;
        }

        // Guardar datos de usuario
        await updateUserData({
            name: name.trim(),
            age: ageNumber,
            profileCompleted: true
        });

        // Navegar a la pantalla principal
        router.push('/(dashboard)/DashBoardScreen');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Completa tu Perfil</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    placeholderTextColor="#888"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Comenzar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A2634',
        justifyContent: 'center',
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#2C3E50',
        color: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4ECDC4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});