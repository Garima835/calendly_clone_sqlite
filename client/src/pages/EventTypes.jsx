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
            showToast('Failed to load event types', error.message);
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
                <style>{styles}</style>
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
            <style>{styles}</style>
        </div>
    );
}

const styles = `
    /* Page Container */
    .et-page {
        max-width: 1400px;
        margin: 0 auto;
        padding: clamp(20px, 5vw, 40px);
        min-height: 100vh;
        background: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    /* Header Section */
    .et-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: clamp(24px, 6vw, 40px);
        flex-wrap: wrap;
        gap: 20px;
    }

    .et-header h1 {
        font-size: clamp(24px, 6vw, 32px);
        font-weight: 700;
        color: #0b3558;
        margin-bottom: 8px;
    }

    .et-header p {
        font-size: clamp(13px, 3.5vw, 15px);
        color: #6b7280;
    }

    /* Buttons */
    .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        border: none;
        font-family: inherit;
    }

    .btn-primary {
        background: #006bff;
        color: white;
    }

    .btn-primary:hover {
        background: #0052cc;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 107, 255, 0.3);
    }

    .btn-ghost {
        background: transparent;
        color: #4b5563;
        padding: 6px 12px;
        font-size: 13px;
    }

    .btn-ghost:hover {
        background: #f3f4f6;
        color: #006bff;
    }

    .btn-sm {
        padding: 6px 12px;
        font-size: 12px;
    }

    .btn-danger-text {
        color: #dc2626;
    }

    .btn-danger-text:hover {
        background: #fee2e2;
        color: #dc2626;
    }

    /* Empty State */
    .empty-state {
        text-align: center;
        padding: clamp(40px, 10vw, 80px) 20px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .empty-state svg {
        color: #9ca3af;
        margin-bottom: 16px;
    }

    .empty-state h3 {
        font-size: clamp(18px, 5vw, 20px);
        color: #374151;
        margin-bottom: 8px;
    }

    .empty-state p {
        color: #6b7280;
        margin-bottom: 24px;
    }

    /* Loading Spinner */
    .page-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top-color: #006bff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Event Types Grid */
    .et-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr));
        gap: clamp(16px, 4vw, 24px);
    }

    /* Event Card */
    .et-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
    }

    .et-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.15);
    }

    .et-card-inactive {
        opacity: 0.7;
        background: #f9fafb;
    }

    .et-card-color {
        height: 4px;
        width: 100%;
    }

    .et-card-body {
        padding: clamp(16px, 4vw, 20px);
    }

    .et-card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
        flex-wrap: wrap;
        gap: 8px;
    }

    .et-card-top h3 {
        font-size: clamp(16px, 4vw, 18px);
        font-weight: 600;
        color: #0b3558;
        margin: 0;
    }

    .et-card-desc {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 16px;
        line-height: 1.5;
    }

    .et-card-details {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    .et-card-details span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #4b5563;
    }

    .et-card-days {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .day-chip {
        padding: 4px 10px;
        background: #f3f4f6;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 500;
        color: #4b5563;
    }

    .et-card-time {
        font-size: 13px;
        color: #006bff;
        font-weight: 500;
        margin-bottom: 12px;
    }

    .et-card-meta {
        font-size: 12px;
        color: #9ca3af;
        margin-bottom: 16px;
        padding-top: 12px;
        border-top: 1px solid #e5e7eb;
    }

    .et-card-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    /* Status Badge */
    .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .status-cancelled {
        background: #fee2e2;
        color: #dc2626;
    }

    /* Responsive Breakpoints */
    @media (max-width: 1024px) {
        .et-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
        }
    }

    @media (max-width: 768px) {
        .et-page {
            padding: 20px;
        }

        .et-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .et-header .btn-primary {
            width: 100%;
            justify-content: center;
        }

        .et-grid {
            grid-template-columns: 1fr;
            gap: 16px;
        }

        .et-card-actions {
            flex-direction: column;
        }

        .et-card-actions .btn {
            width: 100%;
            justify-content: center;
        }

        .et-card-top {
            flex-direction: column;
        }

        .et-card-details {
            flex-direction: column;
            gap: 8px;
        }
    }

    @media (max-width: 640px) {
        .et-page {
            padding: 16px;
        }

        .et-header h1 {
            font-size: 24px;
        }

        .et-header p {
            font-size: 13px;
        }

        .et-card-body {
            padding: 16px;
        }

        .et-card-top h3 {
            font-size: 16px;
        }

        .et-card-desc {
            font-size: 12px;
        }

        .et-card-details span {
            font-size: 12px;
        }

        .day-chip {
            padding: 3px 8px;
            font-size: 10px;
        }

        .et-card-time {
            font-size: 12px;
        }

        .btn {
            padding: 8px 16px;
            font-size: 13px;
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 12px;
        }
    }

    @media (max-width: 480px) {
        .et-page {
            padding: 12px;
        }

        .empty-state {
            padding: 40px 16px;
        }

        .empty-state svg {
            width: 32px;
            height: 32px;
        }

        .empty-state h3 {
            font-size: 18px;
        }

        .empty-state p {
            font-size: 13px;
        }

        .et-card-actions {
            gap: 6px;
        }

        .et-card-actions .btn {
            padding: 6px 12px;
            font-size: 11px;
        }

        .et-card-details span {
            font-size: 11px;
        }
    }

    /* Dark mode support (optional) */
    @media (prefers-color-scheme: dark) {
        .et-page {
            background: #0f172a;
        }

        .et-header h1 {
            color: #f1f5f9;
        }

        .et-card {
            background: #1e293b;
        }

        .et-card-top h3 {
            color: #f1f5f9;
        }

        .et-card-desc,
        .et-card-details span,
        .et-card-meta {
            color: #94a3b8;
        }

        .day-chip {
            background: #334155;
            color: #cbd5e1;
        }

        .btn-ghost {
            color: #cbd5e1;
        }

        .btn-ghost:hover {
            background: #334155;
        }

        .empty-state {
            background: #1e293b;
        }

        .empty-state h3 {
            color: #f1f5f9;
        }

        .empty-state p {
            color: #94a3b8;
        }
    }

    /* Print styles */
    @media print {
        .et-page {
            padding: 0;
            background: white;
        }

        .et-card {
            break-inside: avoid;
            box-shadow: none;
            border: 1px solid #e5e7eb;
        }

        .et-card-actions {
            display: none;
        }
    }
`;