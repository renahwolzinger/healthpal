import React, { createContext, useContext, useState, useEffect } from 'react';
import type { HealthEntry } from '../types/health';

interface HealthContextType {
    entries: HealthEntry[];
    addEntry: (entry: HealthEntry) => void;
    deleteEntry: (id: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [entries, setEntries] = useState<HealthEntry[]>(() => {
        // Load from localStorage on init
        const saved = localStorage.getItem('healthpal-entries');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever entries change
    useEffect(() => {
        localStorage.setItem('healthpal-entries', JSON.stringify(entries));
    }, [entries]);

    const addEntry = (entry: HealthEntry) => {
        setEntries(prev => [entry, ...prev]);
    };

    const deleteEntry = (id: string) => {
        setEntries(prev => prev.filter(e => e.id !== id));
    };

    return (
        <HealthContext.Provider value={{ entries, addEntry, deleteEntry }}>
            {children}
        </HealthContext.Provider>
    );
};

export const useHealth = () => {
    const context = useContext(HealthContext);
    if (!context) {
        throw new Error('useHealth must be used within HealthProvider');
    }
    return context;
};
