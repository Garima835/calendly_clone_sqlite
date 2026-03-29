import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { showToast } from '../utils/toast';

const COLORS = ['#0D9488', '#0EA5E9', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#10B981', '#6366F1'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CreateEventType() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [form, setForm] = useState({
        title: '',
        description: '',
        duration: 30,
        location: 'Online Meeting',
        color: '#0D9488',
        availableDays: [1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '17:00',
        isActive: true
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            loadEventType();
        }
    }, [id]);

    const loadEventType = async () => {
        try {
            const res = await API.get(`/event-types/${id}`);
            const et = res.data;
            setForm({
                title: et.title || '',
                description: et.description || '',
                duration: et.duration || 30,
                location: et.location || 'Online Meeting',
                color: et.color || '#0D9488',
                availableDays: et.availableDays || [1, 2, 3, 4, 5],
                startTime: et.startTime || '09:00',
                endTime: et.endTime || '17:00',
                isActive: et.isActive !== false
            });
        } catch (error) {
            showToast('Failed to load event type', 'error');
            navigate('/event-types');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleDay = (day) => {
        setForm(prev => {
            const days = prev.availableDays.includes(day)
                ? prev.availableDays.filter(d => d !== day)
                : [...prev.availableDays, day];
            return { ...prev, availableDays: days.sort() };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            showToast('Title is required', 'error');
            return;
        }
        if (form.availableDays.length === 0) {
            showToast('Select at least one available day', 'error');
            return;
        }
        if (form.startTime >= form.endTime) {
            showToast('End time must be after start time', 'error');
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                await API.put(`/event-types/${id}`, form);
                showToast('Event type updated!');
            } else {
                await API.post('/event-types', form);
                showToast('Event type created!');
            }
            navigate('/event-types');
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to save', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="page-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="et-form-page">
            <button className="back-btn" onClick={() => navigate('/event-types')}>
                <FiArrowLeft /> Back to Event Types
            </button>

            <div className="et-form-header">
                <h1>{isEditing ? 'Edit Event Type' : 'Create Event Type'}</h1>
                <p>{isEditing ? 'Update your meeting type settings' : 'Set up a new meeting type for booking'}</p>
            </div>

            <form onSubmit={handleSubmit} className="et-form">
                <div className="et-form-grid">
                    {/* Left Column */}
                    <div className="et-form-left">
                        <div className="form-card">
                            <h3>Basic Details</h3>
                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Quick Chat, Strategy Call"
                                    value={form.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="What is this meeting about?"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Duration (minutes)</label>
                                    <select name="duration" value={form.duration} onChange={handleChange}>
                                        {[15, 20, 30, 45, 60, 90, 120].map(d => (
                                            <option key={d} value={d}>{d} min</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Online Meeting"
                                        value={form.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-card">
                            <h3>Availability</h3>
                            <div className="form-group">
                                <label>Available Days</label>
                                <div className="day-toggles">
                                    {DAY_LABELS.map((label, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            className={`day-toggle ${form.availableDays.includes(idx) ? 'day-toggle-active' : ''}`}
                                            onClick={() => toggleDay(idx)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Start Time</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={form.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Time</label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={form.endTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="et-form-right">
                        <div className="form-card">
                            <h3>Appearance</h3>
                            <div className="form-group">
                                <label>Color</label>
                                <div className="color-picker">
                                    {COLORS.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            className={`color-swatch ${form.color === c ? 'color-swatch-active' : ''}`}
                                            style={{ background: c }}
                                            onClick={() => setForm(prev => ({ ...prev, color: c }))}
                                        >
                                            {form.color === c && <span className="color-check">&#10003;</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {isEditing && (
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={form.isActive}
                                            onChange={handleChange}
                                        />
                                        <span>Active (visible on booking page)</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="form-card form-card-preview">
                            <h3>Preview</h3>
                            <div className="et-preview">
                                <div className="et-preview-color" style={{ background: form.color }}></div>
                                <h4>{form.title || 'Untitled Event'}</h4>
                                <p>{form.description || 'No description'}</p>
                                <div className="et-preview-meta">
                                    <span>{form.duration} min</span>
                                    <span>{form.location}</span>
                                </div>
                                <div className="et-preview-days">
                                    {form.availableDays.map(d => (
                                        <span key={d} className="day-chip">{DAY_LABELS[d]}</span>
                                    ))}
                                    {form.availableDays.length === 0 && <span className="text-muted">No days selected</span>}
                                </div>
                                <p className="et-preview-time">{form.startTime} – {form.endTime}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="et-form-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => navigate('/event-types')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <span className="btn-spinner"></span> : <><FiSave /> {isEditing ? 'Save Changes' : 'Create Event Type'}</>}
                    </button>
                </div>
            </form>
        </div>
    );
}