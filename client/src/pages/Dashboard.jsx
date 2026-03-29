import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { FiPlus, FiClock, FiCalendar, FiUsers, FiX, FiExternalLink, FiCopy } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 0, upcoming: 0, past: 0, cancelled: 0 });
    const [eventTypes, setEventTypes] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsRes, etRes, bookingsRes] = await Promise.all([
                API.get('/bookings/stats'),
                API.get('/event-types'),
                API.get('/bookings?type=upcoming')
            ]);
            setStats(statsRes.data);
            setEventTypes(etRes.data);
            setUpcomingBookings(bookingsRes.data.slice(0, 5));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyLink = (username) => {
        const link = `${window.location.origin}/u/${username}`;
        navigator.clipboard.writeText(link).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(() => {
            showToast('Failed to copy link', 'error');
        });
    };

    const cancelBooking = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        try {
            await API.put(`/bookings/${id}/status`, { status: 'cancelled' });
            showToast('Booking cancelled');
            loadData();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to cancel', 'error');
        }
    };

    if (loading) {
        return (
            <div className="page-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dash-header">
                <div>
                    <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
                    <p>Here's what's happening with your schedule</p>
                </div>
                <Link to="/event-types/new" className="btn btn-primary">
                    <FiPlus /> New Event Type
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: 'rgba(13,148,136,0.15)', color: '#0D9488' }}>
                        <FiCalendar />
                    </div>
                    <div>
                        <p className="stat-card-label">Total Bookings</p>
                        <h3 className="stat-card-value">{stats.total}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                        <FiClock />
                    </div>
                    <div>
                        <p className="stat-card-label">Upcoming</p>
                        <h3 className="stat-card-value">{stats.upcoming}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: 'rgba(107,114,128,0.15)', color: '#6B7280' }}>
                        <FiCalendar />
                    </div>
                    <div>
                        <p className="stat-card-label">Past</p>
                        <h3 className="stat-card-value">{stats.past}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon" style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>
                        <FiX />
                    </div>
                    <div>
                        <p className="stat-card-label">Cancelled</p>
                        <h3 className="stat-card-value">{stats.cancelled}</h3>
                    </div>
                </div>
            </div>

            <div className="dash-grid">
                {/* Upcoming Bookings */}
                <div className="dash-card">
                    <div className="dash-card-header">
                        <h2>Upcoming Bookings</h2>
                        <Link to="/bookings" className="dash-card-link">View all</Link>
                    </div>
                    {upcomingBookings.length === 0 ? (
                        <div className="empty-state-sm">
                            <FiCalendar size={32} />
                            <p>No upcoming bookings yet</p>
                        </div>
                    ) : (
                        <div className="booking-list-sm">
                            {upcomingBookings.map(booking => (
                                <div key={booking._id} className="booking-item-sm">
                                    <div
                                        className="booking-color-bar"
                                        style={{ background: booking.eventTypeId?.color || '#0D9488' }}
                                    ></div>
                                    <div className="booking-item-info">
                                        <p className="booking-item-title">{booking.eventTypeId?.title || 'Meeting'}</p>
                                        <p className="booking-item-meta">
                                            {booking.date} at {booking.time} &middot; {booking.guestName}
                                        </p>
                                    </div>
                                    <div className="booking-item-status">
                                        <span className={`status-badge status-${booking.status}`}>
                                            {booking.status}
                                        </span>
                                        {booking.status !== 'cancelled' && (
                                            <button
                                                className="btn-icon-danger"
                                                onClick={() => cancelBooking(booking._id)}
                                                title="Cancel"
                                            >
                                                <FiX size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Event Types */}
                <div className="dash-card">
                    <div className="dash-card-header">
                        <h2>Your Event Types</h2>
                        <Link to="/event-types" className="dash-card-link">Manage</Link>
                    </div>
                    {eventTypes.length === 0 ? (
                        <div className="empty-state-sm">
                            <FiClock size={32} />
                            <p>No event types created</p>
                            <Link to="/event-types/new" className="btn btn-outline btn-sm" style={{ marginTop: '12px' }}>
                                Create one now
                            </Link>
                        </div>
                    ) : (
                        <div className="et-list-sm">
                            {eventTypes.map(et => (
                                <div key={et._id} className="et-item-sm">
                                    <div
                                        className="et-color-dot"
                                        style={{ background: et.color || '#0D9488' }}
                                    ></div>
                                    <div className="et-item-info">
                                        <p className="et-item-title">{et.title}</p>
                                        <p className="et-item-meta">{et.duration} min &middot; {et.bookingCount} bookings</p>
                                    </div>
                                    <div className="et-item-actions">
                                        <button
                                            className="btn-icon"
                                            onClick={() => copyLink(user.username)}
                                            title="Copy booking link"
                                        >
                                            <FiCopy size={16} />
                                        </button>
                                        <button
                                            className="btn-icon"
                                            onClick={() => navigate(`/book/${et._id}`)}
                                            title="Preview"
                                        >
                                            <FiExternalLink size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Link Section */}
            <div className="dash-card link-section">
                <div className="link-section-content">
                    <div>
                        <h2>Your Booking Page</h2>
                        <p>Share this link with anyone to let them book time with you</p>
                    </div>
                    <div className="link-box">
                        <span className="link-url">{window.location.origin}/u/{user?.username}</span>
                        <button className="btn btn-primary btn-sm" onClick={() => copyLink(user.username)}>
                            <FiCopy /> Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}