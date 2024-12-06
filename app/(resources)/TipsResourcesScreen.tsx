import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronLeft, Repeat } from 'react-native-feather';
import { useRouter } from "expo-router";

interface Tip {
    id: string;
    title: string;
    description: string;
}

const TipsResourcesScreen = () => {
    const router = useRouter();
    const [tips] = useState<Tip[]>([
        {
            id: '1',
            title: 'Técnica Pomodoro',
            description: 'Trabaja enfocado por 25 minutos y luego toma un descanso de 5 minutos. Después de 4 ciclos, toma un descanso más largo de 15-30 minutos.'
        },
        {
            id: '2',
            title: 'Divide y Vence',
            description: 'Divide tareas grandes en subtareas más pequeñas y manejables. Esto reduce la sensación de abrumamiento y te ayuda a avanzar gradualmente.'
        },
        {
            id: '3',
            title: 'Minimiza Distracciones',
            description: 'Apaga notificaciones, usa modo de concentración y crea un espacio de trabajo libre de interrupciones.'
        },


    ]);

    const handleNavigation = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleNavigation}>
                <ChevronLeft color="white" fontSize={24} />
                <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Repeat color="#4ECDC4" fontSize={24} />
                <Text style={styles.title}>Consejos y Recursos</Text>
            </View>

            <ScrollView>
                {tips.map((tip) => (
                    <View key={tip.id} style={styles.tipCard}>
                        <Text style={styles.tipTitle}>{tip.title}</Text>
                        <Text style={styles.tipDescription}>{tip.description}</Text>
                    </View>
                ))}

                <View style={styles.resourceSection}>
                    <Text style={styles.resourceTitle}>Recursos Útiles</Text>
                    <TouchableOpacity style={styles.resourceItem}>
                        <Text style={styles.resourceText}>Guía de Productividad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resourceItem}>
                        <Text style={styles.resourceText}>Curso de Gestión de Tiempo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resourceItem}>
                        <Text style={styles.resourceText}>Técnicas de Concentración</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    tipCard: {
        backgroundColor: '#253242',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    tipTitle: {
        color: '#4ECDC4',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tipDescription: {
        color: 'white',
        fontSize: 14,
    },
    resourceSection: {
        marginTop: 20,
        backgroundColor: '#253242',
        borderRadius: 10,
        padding: 15,
    },
    resourceTitle: {
        color: '#4ECDC4',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    resourceItem: {
        backgroundColor: '#1A2634',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    resourceText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default TipsResourcesScreen;