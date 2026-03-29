import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiCopy, FiClock, FiMapPin } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function EventTypes() {
    const [eventTypes, setEventTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEventTypes();
    }, []);

    const loadEventTypes = async () => {
        try {
            const res = await API.get('/event-types');
            setEventTypes(res.data);
        } catch (error) {
            showToast('Failed to load event types', 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteEventType = async (id) => {
        if (!window.confirm('Delete this event type? All its bookings will also be deleted.')) return;
        try {
            await API.delete(`/event-types/${id}`);
            showToast('Event type deleted');
            loadEventTypes();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to delete', 'error');
        }
    };

    const copyLink = (etId) => {
        const link = `${window.location.origin}/book/${etId}`;
        navigator.clipboard.writeText(link).then(() => {
            showToast('Link copied!');
        });
    };

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (loading) {
        return (
            <div className="page-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="et-page">
            <div className="et-header">
                <div>
                    <h1>Event Types</h1>
                    <p>Create and manage the meetings people can book with you</p>
                </div>
                <Link to="/event-types/new" className="btn btn-primary">
                    <FiPlus /> New Event Type
                </Link>
            </div>

            {eventTypes.length === 0 ? (
                <div className="empty-state">
                    <FiClock size={48} />
                    <h3>No event types yet</h3>
                    <p>Create your first event type to start accepting bookings</p>
                    <Link to="/event-types/new" className="btn btn-primary">
                        <FiPlus /> Create Event Type
                    </Link>
                </div>
            ) : (
                <div className="et-grid">
                    {eventTypes.map(et => (
                        <div key={et._id} className={`et-card ${!et.isActive ? 'et-card-inactive' : ''}`}>
                            <div className="et-card-color" style={{ background: et.color || '#0D9488' }}></div>
                            <div className="et-card-body">
                                <div className="et-card-top">
                                    <h3>{et.title}</h3>
                                    {!et.isActive && <span className="status-badge status-cancelled">Inactive</span>}
                                </div>
                                {et.description && <p className="et-card-desc">{et.description}</p>}
                                <div className="et-card-details">
                                    <span><FiClock /> {et.duration} min</span>
                                    <span><FiMapPin /> {et.location || 'Online'}</span>
                                </div>
                                <div className="et-card-days">
                                    {et.availableDays.map(d => (
                                        <span key={d} className="day-chip">{dayNames[d]}</span>
                                    ))}
                                </div>
                                <div className="et-card-time">
                                    {et.startTime} – {et.endTime}
                                </div>
                                <div className="et-card-meta">
                                    {et.bookingCount} booking{et.bookingCount !== 1 ? 's' : ''}
                                </div>
                                <div className="et-card-actions">
                                    <button className="btn btn-ghost btn-sm" onClick={() => copyLink(et._id)}>
                                        <FiCopy /> Copy Link
                                    </button>
                                    <a
                                        href={`/book/${et._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-ghost btn-sm"
                                    >
                                        <FiExternalLink /> Preview
                                    </a>
                                    <Link to={`/event-types/${et._id}/edit`} className="btn btn-ghost btn-sm">
                                        <FiEdit2 /> Edit
                                    </Link>
                                    <button
                                        className="btn btn-ghost btn-sm btn-danger-text"
                                        onClick={() => deleteEventType(et._id)}
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}