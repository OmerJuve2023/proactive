import { View, Text, Image, useWindowDimensions, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import {useUser} from "@/app/context/UserContext";

export default function SplashScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const { userData } = useUser();
    // Animated values for entrance animations
    const titleTranslate = useRef(new Animated.Value(-width)).current;
    const imageTranslate = useRef(new Animated.Value(width)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate title and image entrance
        Animated.parallel([
            Animated.timing(titleTranslate, {
                toValue: 0,
                duration: 2000,
                easing: Easing.elastic(1),
                useNativeDriver: true
            }),
            Animated.timing(imageTranslate, {
                toValue: 0,
                duration: 2000,
                easing: Easing.elastic(1),
                useNativeDriver: true
            }),
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            })
        ]).start();

        const navigationTimer = setTimeout(() => {
            if (!userData.profileCompleted) {
                // Si el perfil no está completado, ir al registro
                router.push('/(auth)/register');
            } else {
                // Si ya está completado, ir a la pantalla principal
                router.push('/(dashboard)/DashBoardScreen');
            }
        }, 2500);

        return () => clearTimeout(navigationTimer);
    }, [userData]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1A2634",
                justifyContent: "center",
                alignItems: "center",
                height: height,
            }}
        >
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Animated.View style={{
                    transform: [{ translateX: titleTranslate }],
                    opacity: titleOpacity
                }}>
                    <LinearGradient
                        colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
                        style={{
                            padding: 15,
                            borderRadius: 20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            elevation: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 50,
                                fontWeight: "900",
                                textAlign: 'center',
                                color: 'white',
                                letterSpacing: 2,
                                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                                textShadowOffset: {width: -1, height: 1},
                                textShadowRadius: 10
                            }}
                        >
                            PROACTIVIBE
                        </Text>
                    </LinearGradient>
                </Animated.View>

                <Animated.View style={{
                    transform: [{ translateX: imageTranslate }],
                    marginTop: 20
                }}>
                    <Image
                        source={require("../../assets/images/ProactiVibe.png")}
                        style={{
                            width: 150,
                            height: 150,
                            /*borderRadius: 25,*/
                            /*borderWidth: 4,*/
                            /*borderColor: '#4ECDC4',*/
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            /*elevation: 10,*/
                        }}
                        resizeMode="contain"
                    />
                </Animated.View>

                <Text
                    style={{
                        fontSize: 18,
                        color: "#FFFFFF",
                        opacity: 0.7,
                        marginTop: 20,
                        letterSpacing: 1
                    }}
                >
                    Cargando...
                </Text>
            </View>

            <Text
                style={{
                    position: 'absolute',
                    bottom: 30,
                    color: "#FFFFFF",
                    opacity: 0.5,
                    fontSize: 12
                }}
            >
                v1.0.0
            </Text>
        </View>
    );
}