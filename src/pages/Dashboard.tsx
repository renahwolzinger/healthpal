import React from 'react';
import { useHealth } from '../context/HealthContext';
import type { ActivityEntry, VitalEntry } from '../types/health';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Zap, Calendar, Clock, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { entries } = useHealth();

    const activityEntries = entries.filter(e => 'durationMinutes' in e) as ActivityEntry[];
    const vitalEntries = entries.filter(e => 'unit' in e) as VitalEntry[];

    const totalMinutes = activityEntries.reduce((sum, e) => sum + e.durationMinutes, 0);

    // Prepare data for the chart (group by date)
    const chartData = activityEntries.reduce((acc, entry) => {
        const existing = acc.find(d => d.date === entry.date);
        if (existing) {
            existing.minutes += entry.durationMinutes;
        } else {
            acc.push({ date: entry.date, minutes: entry.durationMinutes });
        }
        return acc;
    }, [] as { date: string; minutes: number }[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-7); // Last 7 entries

    return (
        <div>
            <header style={{
                marginBottom: 'var(--spacing-xl)',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
            }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)', fontWeight: '800' }}>Welcome Back</h2>
                <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Your health journey is looking great today.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                {/* Activity Summary Card */}
                <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-lg)' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Total Activity</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-text)', marginTop: 'var(--spacing-xs)' }}>
                                {totalMinutes} <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>min</span>
                            </div>
                        </div>
                        <div style={{
                            padding: '10px',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '12px',
                            color: 'var(--color-primary)'
                        }}>
                            <Activity size={24} />
                        </div>
                    </div>

                    <div style={{ height: '200px', width: '100%', marginTop: 'var(--spacing-md)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="minutes" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Vitals Card */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Vitals</h3>
                        <Heart size={20} color="var(--color-secondary)" />
                    </div>

                    {vitalEntries.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {vitalEntries.slice(0, 3).map(entry => (
                                <div key={entry.id} style={{
                                    padding: 'var(--spacing-md)',
                                    backgroundColor: 'var(--color-background)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--color-secondary)'
                                        }} />
                                        <span style={{ fontWeight: '500' }}>{entry.type}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', color: 'var(--color-text)' }}>
                                            {entry.value} <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{entry.unit}</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{entry.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-secondary)',
                            gap: 'var(--spacing-sm)'
                        }}>
                            <Zap size={32} style={{ opacity: 0.2 }} />
                            <p>No vitals recorded yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Entries List */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent History</h3>
                    <Calendar size={20} color="var(--color-text-secondary)" />
                </div>

                {entries.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        {entries.slice(0, 5).map(entry => (
                            <div key={entry.id} style={{
                                padding: 'var(--spacing-md)',
                                borderBottom: '1px solid var(--color-surface-hover)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'background-color 0.2s',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <div style={{
                                        padding: '8px',
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--color-background)',
                                        color: 'var(--color-primary)'
                                    }}>
                                        {'durationMinutes' in entry ? <Activity size={16} /> :
                                            'unit' in entry ? <Heart size={16} /> : <TrendingUp size={16} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>{entry.type}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {entry.date}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    {'durationMinutes' in entry && (
                                        <div style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{entry.durationMinutes} min</div>
                                    )}
                                    {'value' in entry && (
                                        <div style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                            {entry.value}
                                            {'unit' in entry && <span style={{ fontSize: '0.8rem', marginLeft: '4px', color: 'var(--color-text-secondary)' }}>{entry.unit}</span>}
                                            {'metric' in entry && <span style={{ fontSize: '0.8rem', marginLeft: '4px', color: 'var(--color-text-secondary)' }}>{entry.metric}</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        padding: 'var(--spacing-xl)',
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)'
                    }}>
                        No entries yet. Start tracking to see your history!
                    </div>
                )}
            </div>
        </div>
    );
};
