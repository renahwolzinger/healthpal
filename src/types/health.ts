export type ActivityType = 'Yoga' | 'Zumba' | 'Softball' | 'Walking' | 'Weight Lifting' | 'Running' | 'Cycling' | 'Swimming' | 'HIIT' | 'Other';
export type VitalType = 'Blood Pressure' | 'Heart Rate' | 'Weight' | 'Blood Sugar';
export type LifestyleType = 'Sleeping' | 'Eating' | 'Water' | 'Meditation';

export type Category = 'Activity' | 'Vital' | 'Lifestyle';

export interface BaseEntry {
    id: string;
    date: string;
    notes?: string;
}

export interface ActivityEntry extends BaseEntry {
    type: ActivityType;
    durationMinutes: number;
    intensity?: 'Low' | 'Medium' | 'High';
}

export interface VitalEntry extends BaseEntry {
    type: VitalType;
    value: number | string; // string for BP like "120/80"
    unit: string;
}

export interface LifestyleEntry extends BaseEntry {
    type: LifestyleType;
    value: string | number;
    metric?: string; // e.g., "hours" for sleep, "calories" for eating
}

export type HealthEntry = ActivityEntry | VitalEntry | LifestyleEntry;
