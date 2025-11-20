import React, { useState } from 'react';
import type {
    Category,
    ActivityType,
    VitalType,
    LifestyleType,
    HealthEntry,
    ActivityEntry,
    VitalEntry,
    LifestyleEntry
} from '../types/health';
import { useHealth } from '../context/HealthContext';

export const ImportData: React.FC = () => {
    const { addEntry } = useHealth();
    const [category, setCategory] = useState<Category>('Activity');
    const [activityType, setActivityType] = useState<ActivityType>('Yoga');
    const [vitalType, setVitalType] = useState<VitalType>('Blood Pressure');
    const [lifestyleType, setLifestyleType] = useState<LifestyleType>('Sleeping');

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [duration, setDuration] = useState('');
    const [intensity, setIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [value, setValue] = useState('');
    const [notes, setNotes] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let entry: HealthEntry;

        if (category === 'Activity') {
            entry = {
                id: Date.now().toString(),
                date,
                notes,
                type: activityType,
                durationMinutes: Number(duration),
                intensity
            } as ActivityEntry;
        } else if (category === 'Vital') {
            entry = {
                id: Date.now().toString(),
                date,
                notes,
                type: vitalType,
                value: value,
                unit: vitalType === 'Blood Pressure' ? 'mmHg' : vitalType === 'Weight' ? 'lbs' : vitalType === 'Blood Sugar' ? 'mg/dL' : 'bpm'
            } as VitalEntry;
        } else {
            entry = {
                id: Date.now().toString(),
                date,
                notes,
                type: lifestyleType,
                value: value,
                metric: lifestyleType === 'Sleeping' ? 'hours' : lifestyleType === 'Water' ? 'oz' : lifestyleType === 'Meditation' ? 'minutes' : 'calories'
            } as LifestyleEntry;
        }

        addEntry(entry);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);

        // Reset form
        setValue('');
        setDuration('');
        setNotes('');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>Import Data</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>Track your activities, vitals, and lifestyle choices.</p>
            </header>

            <div className="card">
                {submitted ? (
                    <div style={{
                        padding: 'var(--spacing-lg)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--color-success)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        Entry saved successfully!
                    </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                    {/* Category Selection */}
                    <div className="input-group">
                        <label className="input-label">Category</label>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            {(['Activity', 'Vital', 'Lifestyle'] as Category[]).map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        flex: 1,
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: category === cat ? 'var(--color-primary)' : 'var(--color-background)',
                                        color: category === cat ? 'white' : 'var(--color-text-secondary)',
                                        border: category === cat ? 'none' : '1px solid var(--color-surface-hover)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type Selection */}
                    <div className="input-group">
                        <label className="input-label">Type</label>
                        <select
                            className="input-field"
                            value={
                                category === 'Activity' ? activityType :
                                    category === 'Vital' ? vitalType :
                                        lifestyleType
                            }
                            onChange={(e) => {
                                if (category === 'Activity') setActivityType(e.target.value as ActivityType);
                                else if (category === 'Vital') setVitalType(e.target.value as VitalType);
                                else setLifestyleType(e.target.value as LifestyleType);
                            }}
                        >
                            {category === 'Activity' && (
                                <>
                                    <option value="Yoga">Yoga</option>
                                    <option value="Zumba">Zumba</option>
                                    <option value="Softball">Softball</option>
                                    <option value="Walking">Walking</option>
                                    <option value="Running">Running</option>
                                    <option value="Cycling">Cycling</option>
                                    <option value="Swimming">Swimming</option>
                                    <option value="Weight Lifting">Weight Lifting</option>
                                    <option value="HIIT">HIIT</option>
                                    <option value="Other">Other</option>
                                </>
                            )}
                            {category === 'Vital' && (
                                <>
                                    <option value="Blood Pressure">Blood Pressure</option>
                                    <option value="Heart Rate">Heart Rate</option>
                                    <option value="Weight">Weight</option>
                                    <option value="Blood Sugar">Blood Sugar</option>
                                </>
                            )}
                            {category === 'Lifestyle' && (
                                <>
                                    <option value="Sleeping">Sleeping</option>
                                    <option value="Eating">Eating</option>
                                    <option value="Water">Water</option>
                                    <option value="Meditation">Meditation</option>
                                </>
                            )}
                        </select>
                    </div>

                    {/* Date */}
                    <div className="input-group">
                        <label className="input-label">Date</label>
                        <input
                            type="date"
                            className="input-field"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Dynamic Fields */}
                    {category === 'Activity' && (
                        <>
                            <div className="input-group">
                                <label className="input-label">Duration (minutes)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="e.g. 30"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Intensity</label>
                                <select
                                    className="input-field"
                                    value={intensity}
                                    onChange={(e) => setIntensity(e.target.value as any)}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </>
                    )}

                    {category === 'Vital' && (
                        <div className="input-group">
                            <label className="input-label">
                                Value ({vitalType === 'Blood Pressure' ? 'mmHg' : vitalType === 'Weight' ? 'lbs' : vitalType === 'Blood Sugar' ? 'mg/dL' : 'bpm'})
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={vitalType === 'Blood Pressure' ? '120/80' : vitalType === 'Weight' ? '150' : vitalType === 'Blood Sugar' ? '90' : '72'}
                                required
                            />
                        </div>
                    )}

                    {category === 'Lifestyle' && (
                        <div className="input-group">
                            <label className="input-label">
                                {lifestyleType === 'Sleeping' ? 'Hours' : lifestyleType === 'Water' ? 'Ounces' : lifestyleType === 'Meditation' ? 'Minutes' : 'Calories'}
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={lifestyleType === 'Sleeping' ? '8' : lifestyleType === 'Water' ? '64' : lifestyleType === 'Meditation' ? '15' : '2000'}
                                required
                            />
                        </div>
                    )}

                    {/* Notes */}
                    <div className="input-group">
                        <label className="input-label">Notes</label>
                        <textarea
                            className="input-field"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any additional details..."
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Save Entry
                    </button>
                </form>
            </div>
        </div>
    );
};
