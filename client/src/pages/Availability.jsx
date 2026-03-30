// src/pages/Availability.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiClock, FiPlus, FiTrash2, FiCopy, FiCheck, FiAlertCircle, FiSave, FiRefreshCw } from 'react-icons/fi';
// import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { showToast } from '../utils/toast';
// import './Availability.css';

export default function Availability() {
    const navigate = useNavigate();
    // const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [availability, setAvailability] = useState({});
    const [timezone, setTimezone] = useState('America/New_York');
    // const [timeSlots, setTimeSlots] = useState([]);
    const [bufferTime, setBufferTime] = useState(0);
    const [schedulingLimit, setSchedulingLimit] = useState(30);
    const [scheduleType, setScheduleType] = useState('weekly');

    // Week days
    const weekDays = [
        { id: 0, name: 'Sunday', short: 'Sun' },
        { id: 1, name: 'Monday', short: 'Mon' },
        { id: 2, name: 'Tuesday', short: 'Tue' },
        { id: 3, name: 'Wednesday', short: 'Wed' },
        { id: 4, name: 'Thursday', short: 'Thu' },
        { id: 5, name: 'Friday', short: 'Fri' },
        { id: 6, name: 'Saturday', short: 'Sat' }
    ];

    // Timezone options
    const timezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Asia/Dubai',
        'Australia/Sydney'
    ];

    useEffect(() => {
        loadAvailability();
    }, []);

    const loadAvailability = async () => {
        try {
            setLoading(true);
            const response = await API.get('/availability');
            if (response.data) {
                setAvailability(response.data.weeklySchedule || {});
                setBufferTime(response.data.bufferTime || 0);
                setSchedulingLimit(response.data.schedulingLimit || 30);
                setTimezone(response.data.timezone || 'America/New_York');
            } else {
                // Initialize default availability
                initializeDefaultAvailability();
            }
        } catch (error) {
            console.error('Error loading availability:', error);
            initializeDefaultAvailability();
        } finally {
            setLoading(false);
        }
    };

    const initializeDefaultAvailability = () => {
        const defaultSchedule = {
            // Monday to Friday: 9 AM to 5 PM
            1: [{ start: '09:00', end: '17:00' }],
            2: [{ start: '09:00', end: '17:00' }],
            3: [{ start: '09:00', end: '17:00' }],
            4: [{ start: '09:00', end: '17:00' }],
            5: [{ start: '09:00', end: '17:00' }],
            6: [],
            0: []
        };
        setAvailability(defaultSchedule);
    };

    const handleSaveAvailability = async () => {
        try {
            setSaving(true);
            const data = {
                weeklySchedule: availability,
                timezone,
                bufferTime,
                schedulingLimit
            };
            await API.post('/availability', data);
            showToast('Availability saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving availability:', error);
            showToast('Failed to save availability', 'error');
        } finally {
            setSaving(false);
        }
    };

    const addTimeSlot = (dayId) => {
        const newSlot = { start: '09:00', end: '17:00' };
        const currentSlots = availability[dayId] || [];
        setAvailability({
            ...availability,
            [dayId]: [...currentSlots, newSlot]
        });
        setSelectedDay({ dayId, slotIndex: currentSlots.length });
    };

    const removeTimeSlot = (dayId, slotIndex) => {
        const currentSlots = [...(availability[dayId] || [])];
        currentSlots.splice(slotIndex, 1);
        setAvailability({
            ...availability,
            [dayId]: currentSlots
        });
    };

    const updateTimeSlot = (dayId, slotIndex, field, value) => {
        const currentSlots = [...(availability[dayId] || [])];
        currentSlots[slotIndex][field] = value;
        setAvailability({
            ...availability,
            [dayId]: currentSlots
        });
    };

    const toggleDayEnabled = (dayId) => {
        if (availability[dayId] && availability[dayId].length > 0) {
            // Disable day
            setAvailability({
                ...availability,
                [dayId]: []
            });
        } else {
            // Enable day with default slot
            setAvailability({
                ...availability,
                [dayId]: [{ start: '09:00', end: '17:00' }]
            });
        }
    };

    const copyTimeSlots = (fromDayId, toDayId) => {
        const slotsToCopy = availability[fromDayId];
        if (slotsToCopy && slotsToCopy.length > 0) {
            setAvailability({
                ...availability,
                [toDayId]: slotsToCopy.map(slot => ({ ...slot }))
            });
            showToast(`Copied schedule to ${weekDays[toDayId].name}`);
        }
    };

    const getMonthDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    if (loading) {
        return (
            <div className="availability-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="availability-container">
            <style>{availabilityStyles}</style>
            
            {/* Header */}
            <div className="availability-header">
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <FiChevronLeft /> Back to Dashboard
                </button>
                <div className="header-title">
                    <h1>Availability Schedule</h1>
                    <p>Set your working hours and availability for scheduling</p>
                </div>
                <button 
                    className={`save-button ${saving ? 'saving' : ''}`}
                    onClick={handleSaveAvailability}
                    disabled={saving}
                >
                    {saving ? <FiRefreshCw className="spinning" /> : <FiSave />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="availability-content">
                {/* Main Settings Grid */}
                <div className="settings-grid">
                    {/* Timezone Settings */}
                    <div className="settings-card">
                        <h3>
                            <FiClock />
                            Time Zone
                        </h3>
                        <select 
                            value={timezone} 
                            onChange={(e) => setTimezone(e.target.value)}
                            className="timezone-select"
                        >
                            {timezones.map(tz => (
                                <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                            ))}
                        </select>
                        <p className="helper-text">
                            All times are displayed in your selected timezone
                        </p>
                    </div>

                    {/* Additional Settings */}
                    <div className="settings-card">
                        <h3>Meeting Settings</h3>
                        <div className="setting-item">
                            <label>Buffer time between meetings</label>
                            <select 
                                value={bufferTime} 
                                onChange={(e) => setBufferTime(parseInt(e.target.value))}
                            >
                                <option value={0}>No buffer</option>
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={60}>1 hour</option>
                            </select>
                        </div>
                        <div className="setting-item">
                            <label>Scheduling limit (days ahead)</label>
                            <select 
                                value={schedulingLimit} 
                                onChange={(e) => setSchedulingLimit(parseInt(e.target.value))}
                            >
                                <option value={7}>1 week</option>
                                <option value={14}>2 weeks</option>
                                <option value={30}>1 month</option>
                                <option value={60}>2 months</option>
                                <option value={90}>3 months</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Weekly Schedule */}
                <div className="weekly-schedule">
                    <div className="section-header">
                        <h2>Weekly Working Hours</h2>
                        <div className="schedule-type-toggle">
                            <button 
                                className={scheduleType === 'weekly' ? 'active' : ''}
                                onClick={() => setScheduleType('weekly')}
                            >
                                Weekly Schedule
                            </button>
                            <button 
                                className={scheduleType === 'custom' ? 'active' : ''}
                                onClick={() => setScheduleType('custom')}
                            >
                                Custom Date Range
                            </button>
                        </div>
                    </div>

                    {scheduleType === 'weekly' ? (
                        <div className="weekly-grid">
                            {weekDays.map(day => {
                                const slots = availability[day.id] || [];
                                const isEnabled = slots.length > 0;
                                
                                return (
                                    <div key={day.id} className="day-schedule-card">
                                        <div className="day-header">
                                            <div className="day-name">
                                                <span className="day-short">{day.short}</span>
                                                <span className="day-full">{day.name}</span>
                                            </div>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={isEnabled}
                                                    onChange={() => toggleDayEnabled(day.id)}
                                                />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>

                                        {isEnabled && (
                                            <div className="time-slots">
                                                {slots.map((slot, idx) => (
                                                    <div key={idx} className="time-slot">
                                                        <div className="time-inputs">
                                                            <input
                                                                type="time"
                                                                value={slot.start}
                                                                onChange={(e) => updateTimeSlot(day.id, idx, 'start', e.target.value)}
                                                                className="time-input"
                                                            />
                                                            <span>to</span>
                                                            <input
                                                                type="time"
                                                                value={slot.end}
                                                                onChange={(e) => updateTimeSlot(day.id, idx, 'end', e.target.value)}
                                                                className="time-input"
                                                            />
                                                        </div>
                                                        <div className="slot-actions">
                                                            {idx === 0 && slots.length === 1 && (
                                                                <button 
                                                                    className="icon-btn copy-btn"
                                                                    onClick={() => {
                                                                        const nextDay = (day.id + 1) % 7;
                                                                        copyTimeSlots(day.id, nextDay);
                                                                    }}
                                                                    title="Copy to next day"
                                                                >
                                                                    <FiCopy />
                                                                </button>
                                                            )}
                                                            <button 
                                                                className="icon-btn delete-btn"
                                                                onClick={() => removeTimeSlot(day.id, idx)}
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button 
                                                    className="add-slot-btn"
                                                    onClick={() => addTimeSlot(day.id)}
                                                >
                                                    <FiPlus /> Add time slot
                                                </button>
                                            </div>
                                        )}

                                        {!isEnabled && (
                                            <div className="disabled-message">
                                                <FiAlertCircle />
                                                <span>Not available</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="custom-schedule">
                            <div className="calendar-container">
                                <div className="calendar-header">
                                    <button onClick={previousMonth} className="month-nav">
                                        <FiChevronLeft />
                                    </button>
                                    <h3>
                                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </h3>
                                    <button onClick={nextMonth} className="month-nav">
                                        <FiChevronRight />
                                    </button>
                                </div>
                                <div className="calendar-weekdays">
                                    {weekDays.map(day => (
                                        <div key={day.id} className="calendar-weekday">
                                            {day.short}
                                        </div>
                                    ))}
                                </div>
                                <div className="calendar-days">
                                    {getMonthDays().map((date, idx) => (
                                        <div key={idx} className="calendar-day">
                                            {date && (
                                                <div className="day-content">
                                                    <span className="day-number">{date.getDate()}</span>
                                                    {/* Custom availability for specific dates can be added here */}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="coming-soon">
                                Custom date range scheduling coming soon!
                            </p>
                        </div>
                    )}
                </div>

                {/* Preview Section */}
                <div className="preview-section">
                    <div className="section-header">
                        <h2>Preview</h2>
                        <p>How your availability appears to others</p>
                    </div>
                    <div className="preview-grid">
                        {weekDays.map(day => {
                            const slots = availability[day.id] || [];
                            const isEnabled = slots.length > 0;
                            
                            return (
                                <div key={day.id} className="preview-day">
                                    <div className="preview-day-name">{day.short}</div>
                                    {isEnabled ? (
                                        <div className="preview-slots">
                                            {slots.map((slot, idx) => (
                                                <div key={idx} className="preview-slot">
                                                    {formatTime(slot.start)} - {formatTime(slot.end)}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="preview-unavailable">Unavailable</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const availabilityStyles = `
    .availability-container {
        min-height: 100vh;
        background: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .availability-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f8fafc;
    }

    .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid #e2e8f0;
        border-top-color: #006bff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .availability-header {
        background: white;
        border-bottom: 1px solid #e2e8f0;
        padding: 24px 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    .back-button {
        display: flex;
        align-items: center;
        gap: 8px;
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        font-size: 14px;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.2s;
    }

    .back-button:hover {
        background: #f1f5f9;
        color: #006bff;
    }

    .header-title h1 {
        font-size: 28px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 4px;
    }

    .header-title p {
        color: #64748b;
        font-size: 14px;
    }

    .save-button {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #006bff, #3b82f6);
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .save-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 107, 255, 0.3);
    }

    .save-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinning {
        animation: spin 1s linear infinite;
    }

    .availability-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 32px;
    }

    .settings-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        margin-bottom: 32px;
    }

    .settings-card {
        background: white;
        border-radius: 20px;
        padding: 24px;
        border: 1px solid #e2e8f0;
    }

    .settings-card h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 20px;
    }

    .timezone-select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        font-size: 14px;
        margin-bottom: 12px;
    }

    .helper-text {
        font-size: 12px;
        color: #64748b;
    }

    .setting-item {
        margin-bottom: 20px;
    }

    .setting-item label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #0f172a;
        margin-bottom: 8px;
    }

    .setting-item select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        font-size: 14px;
    }

    .weekly-schedule {
        background: white;
        border-radius: 20px;
        padding: 24px;
        margin-bottom: 32px;
        border: 1px solid #e2e8f0;
    }

    .section-header {
        margin-bottom: 24px;
    }

    .section-header h2 {
        font-size: 20px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 4px;
    }

    .section-header p {
        font-size: 13px;
        color: #64748b;
    }

    .schedule-type-toggle {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }

    .schedule-type-toggle button {
        padding: 8px 20px;
        border: 1px solid #e2e8f0;
        background: white;
        border-radius: 20px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
    }

    .schedule-type-toggle button.active {
        background: #006bff;
        color: white;
        border-color: #006bff;
    }

    .weekly-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 16px;
        overflow-x: auto;
        min-width: 800px;
    }

    .day-schedule-card {
        background: #f8fafc;
        border-radius: 16px;
        padding: 16px;
        border: 1px solid #e2e8f0;
    }

    .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e2e8f0;
    }

    .day-name {
        font-weight: 600;
    }

    .day-short {
        display: none;
    }

    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
    }

    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #cbd5e1;
        transition: 0.3s;
        border-radius: 24px;
    }

    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
    }

    input:checked + .toggle-slider {
        background-color: #006bff;
    }

    input:checked + .toggle-slider:before {
        transform: translateX(20px);
    }

    .time-slots {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .time-slot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
    }

    .time-inputs {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
    }

    .time-input {
        flex: 1;
        padding: 6px 8px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 12px;
        font-family: monospace;
    }

    .slot-actions {
        display: flex;
        gap: 4px;
    }

    .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: #eef4ff;
        color: #006bff;
    }

    .delete-btn:hover {
        background: #fee2e2;
        color: #dc2626;
    }

    .add-slot-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        padding: 8px;
        background: white;
        border: 1px dashed #cbd5e1;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        color: #006bff;
        transition: all 0.2s;
        margin-top: 8px;
    }

    .add-slot-btn:hover {
        border-color: #006bff;
        background: #eef4ff;
    }

    .disabled-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 20px 0;
        color: #94a3b8;
        font-size: 12px;
    }

    .custom-schedule {
        text-align: center;
        padding: 40px;
    }

    .calendar-container {
        background: white;
        border-radius: 16px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        margin-bottom: 20px;
    }

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .month-nav {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.2s;
    }

    .month-nav:hover {
        background: #f1f5f9;
    }

    .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        margin-bottom: 8px;
    }

    .calendar-weekday {
        text-align: center;
        font-weight: 600;
        font-size: 12px;
        color: #64748b;
        padding: 8px;
    }

    .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
    }

    .calendar-day {
        aspect-ratio: 1;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 8px;
    }

    .day-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .day-number {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
    }

    .coming-soon {
        color: #94a3b8;
        font-size: 14px;
        margin-top: 16px;
    }

    .preview-section {
        background: white;
        border-radius: 20px;
        padding: 24px;
        border: 1px solid #e2e8f0;
    }

    .preview-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 16px;
        overflow-x: auto;
        min-width: 700px;
    }

    .preview-day {
        text-align: center;
    }

    .preview-day-name {
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 2px solid #e2e8f0;
    }

    .preview-slots {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .preview-slot {
        font-size: 11px;
        color: #006bff;
        background: #eef4ff;
        padding: 4px 8px;
        border-radius: 12px;
        font-weight: 500;
    }

    .preview-unavailable {
        font-size: 11px;
        color: #94a3b8;
        font-style: italic;
    }

    @media (max-width: 768px) {
        .availability-header {
            flex-direction: column;
            align-items: stretch;
        }

        .settings-grid {
            grid-template-columns: 1fr;
        }

        .weekly-grid {
            grid-template-columns: 1fr;
            min-width: auto;
        }

        .day-full {
            display: inline;
        }

        .day-short {
            display: none;
        }

        .preview-grid {
            grid-template-columns: repeat(7, 1fr);
            min-width: auto;
            gap: 8px;
        }

        .preview-day-name {
            font-size: 12px;
        }

        .preview-slot {
            font-size: 9px;
            padding: 2px 4px;
        }
    }
`;