import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';

interface TimerContextType {
    time: number;
    isRunning: boolean;
    isBreak: boolean;
    startTimer: (duration: number) => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    resumeTimer: () => void;
    switchMode: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [time, setTime] = useState(25 * 60); // 25 minutos por defecto
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startTimer = (duration: number) => {
        setTime(duration);
        setIsRunning(true);

        timerRef.current = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timerRef.current!);
                    setIsRunning(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const pauseTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const resumeTimer = () => {
        startTimer(time);
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setTime(isBreak ? 5 * 60 : 25 * 60);
        setIsRunning(false);
    };

    const switchMode = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const newMode = !isBreak;
        setIsBreak(newMode);
        setTime(newMode ? 5 * 60 : 25 * 60);
        setIsRunning(false);
    };

    return (
        <TimerContext.Provider value={{
            time,
            isRunning,
            isBreak,
            startTimer,
            pauseTimer,
            resetTimer,
            resumeTimer,
            switchMode
        }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
};