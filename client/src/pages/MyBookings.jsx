import { useState, useEffect } from 'react';
import API from '../utils/api';
import { FiCalendar, FiFilter, FiX, FiClock, FiMapPin, FiUser, FiFileText, FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        loadBookings();
    }, [filter, currentPage]);

    const loadBookings = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                ...(filter !== 'all' && { type: filter })
            };
            const res = await API.get('/bookings', { params });
            setBookings(res.data.bookings || res.data);
            setTotalPages(res.data.totalPages || Math.ceil((res.data.length || 0) / 10) || 1);
        } catch (error) {
            console.error('Failed to load bookings', error);
            showToast('Failed to load bookings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        setCancellingId(id);
        try {
            await API.put(`/bookings/${id}/status`, { status: 'cancelled' });
            showToast('Booking cancelled successfully', 'success');
            await loadBookings();
        } catch (error) {
            showToast(error.response?.data?.message || 'Failed to cancel booking', 'error');
        } finally {
            setCancellingId(null);
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTimeRange = (timeStr, duration) => {
        const [startHour, startMin] = timeStr.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(startHour, startMin, 0);
        
        const endDate = new Date(startDate.getTime() + duration * 60000);
        
        const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 || 12;
            return `${hour12}:${String(minutes).padStart(2, '0')} ${ampm}`;
        };
        
        return `${formatTime(startDate)} - ${formatTime(endDate)}`;
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'confirmed': return { bg: '#d1fae5', text: '#065f46', icon: '✓' };
            case 'pending': return { bg: '#fef3c7', text: '#92400e', icon: '⏳' };
            case 'cancelled': return { bg: '#fee2e2', text: '#991b1b', icon: '✗' };
            case 'completed': return { bg: '#e0e7ff', text: '#3730a3', icon: '✔' };
            default: return { bg: '#f3f4f6', text: '#374151', icon: '•' };
        }
    };

    if (loading) {
        return (
            <div className="bookings-page">
                <style>{styles}</style>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bookings-page">
            <style>{styles}</style>
            
            {/* Header Section */}
            <div className="bookings-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1 className="page-title">
                            <FiCalendar className="title-icon" />
                            My Bookings
                        </h1>
                        <p className="page-subtitle">Manage and track all your scheduled meetings</p>
                    </div>
                    <button className="refresh-btn" onClick={loadBookings}>
                        <FiRefreshCw />
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
                <div className="stat-card">
                    <div className="stat-icon total">📅</div>
                    <div className="stat-info">
                        <span className="stat-value">{bookings.length}</span>
                        <span className="stat-label">Total Bookings</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon upcoming">⏰</div>
                    <div className="stat-info">
                        <span className="stat-value">{bookings.filter(b => b.status === 'confirmed' && new Date(b.date) > new Date()).length}</span>
                        <span className="stat-label">Upcoming</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon completed">✅</div>
                    <div className="stat-info">
                        <span className="stat-value">{bookings.filter(b => b.status === 'completed').length}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="filters-section">
                <div className="filters-header">
                    <FiFilter className="filter-icon" />
                    <span>Filter by</span>
                </div>
                <div className="filters-group">
                    {['upcoming', 'past', 'cancelled', 'all'].map(f => (
                        <button
                            key={f}
                            className={`filter-chip ${filter === f ? 'active' : ''}`}
                            onClick={() => {
                                setFilter(f);
                                setCurrentPage(1);
                            }}
                        >
                            {f === 'all' ? 'All Bookings' : f.charAt(0).toUpperCase() + f.slice(1)}
                            {filter === f && <span className="filter-indicator" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            {bookings.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📆</div>
                    <h3>No bookings found</h3>
                    <p>{filter === 'all' ? "You don't have any bookings yet" : `No ${filter} bookings to display`}</p>
                    <button className="empty-action" onClick={() => window.location.href = '/event-types'}>
                        Create Event Type
                    </button>
                </div>
            ) : (
                <>
                    <div className="bookings-list">
                        {bookings.map((booking, index) => {
                            const statusStyle = getStatusColor(booking.status);
                            const isPast = new Date(booking.date) < new Date() && booking.status !== 'cancelled';
                            const displayStatus = booking.status === 'cancelled' ? 'cancelled' : (isPast ? 'completed' : booking.status);
                            const finalStatus = displayStatus === 'completed' ? 'completed' : booking.status;
                            const finalStatusStyle = getStatusColor(finalStatus);
                            
                            return (
                                <div key={booking._id} className={`booking-card ${booking.status === 'cancelled' ? 'cancelled' : ''}`}>
                                    <div className="card-header">
                                        <div className="event-type-badge" style={{ background: booking.eventTypeId?.color || '#6366f1' }}>
                                            {booking.eventTypeId?.title?.charAt(0) || 'M'}
                                        </div>
                                        <div className="event-info">
                                            <h3 className="event-title">{booking.eventTypeId?.title || 'Meeting'}</h3>
                                            <span className={`status-badge ${finalStatus}`}>
                                                <span className="status-icon">{finalStatusStyle.icon}</span>
                                                {finalStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-details">
                                        <div className="detail-row">
                                            <div className="detail-icon">
                                                <FiCalendar />
                                            </div>
                                            <div className="detail-content">
                                                <span className="detail-label">Date & Time</span>
                                                <span className="detail-value">
                                                    {formatDate(booking.date)}
                                                    <br />
                                                    <span className="time-range">{formatTimeRange(booking.time, booking.duration)}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="detail-row">
                                            <div className="detail-icon">
                                                <FiClock />
                                            </div>
                                            <div className="detail-content">
                                                <span className="detail-label">Duration</span>
                                                <span className="detail-value">{booking.duration} minutes</span>
                                            </div>
                                        </div>

                                        <div className="detail-row">
                                            <div className="detail-icon">
                                                <FiMapPin />
                                            </div>
                                            <div className="detail-content">
                                                <span className="detail-label">Location</span>
                                                <span className="detail-value">{booking.eventTypeId?.location || 'Google Meet'}</span>
                                            </div>
                                        </div>

                                        <div className="detail-row">
                                            <div className="detail-icon">
                                                <FiUser />
                                            </div>
                                            <div className="detail-content">
                                                <span className="detail-label">Guest</span>
                                                <span className="detail-value">
                                                    {booking.guestName}
                                                    <span className="guest-email">{booking.guestEmail}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {booking.notes && (
                                            <div className="detail-row">
                                                <div className="detail-icon">
                                                    <FiFileText />
                                                </div>
                                                <div className="detail-content">
                                                    <span className="detail-label">Notes</span>
                                                    <span className="detail-value notes">{booking.notes}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {booking.status !== 'cancelled' && !isPast && (
                                        <div className="card-actions">
                                            <button 
                                                className="cancel-btn"
                                                onClick={() => cancelBooking(booking._id)}
                                                disabled={cancellingId === booking._id}
                                            >
                                                {cancellingId === booking._id ? (
                                                    <div className="btn-spinner"></div>
                                                ) : (
                                                    <>
                                                        <FiX />
                                                        Cancel Booking
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}

                                    {isPast && booking.status !== 'cancelled' && (
                                        <div className="completed-badge">Completed</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                className="page-btn"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <FiChevronLeft />
                            </button>
                            <span className="page-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button 
                                className="page-btn"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const styles = `
    /* Global Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .bookings-page {
        min-height: 100vh;
        max-width: 1400px;
        margin: 0 auto;
        background: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        padding: 32px 40px;
    }

    /* Loading State */
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        gap: 20px;
    }

    .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid #e2e8f0;
        border-top-color: #006bff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .loading-container p {
        color: #64748b;
        font-size: 14px;
    }

    /* Header */
    .bookings-header {
        margin-bottom: 32px;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
    }

    .page-title {
        font-size: 24px;
        font-weight: 700;
        color: #0b3558;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .title-icon {
        color: #006bff;
        font-size: 24px;
    }

    .page-subtitle {
        font-size: 15px;
        color: #667085;
        margin-top: 8px;
    }

    .refresh-btn {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 10px 14px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #475569;
    }

    .refresh-btn:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
        transform: rotate(15deg);
    }

    /* Stats Summary */
    .stats-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
    }

    .stat-card {
        background: white;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.1);
        border-color: #cbd5e1;
    }

    .stat-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
    }

    .stat-icon.total { background: #eef2ff; }
    .stat-icon.upcoming { background: #fef3c7; }
    .stat-icon.completed { background: #d1fae5; }

    .stat-info {
        display: flex;
        flex-direction: column;
    }

    .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: #0b3558;
    }

    .stat-label {
        font-size: 13px;
        color: #667085;
        font-weight: 500;
    }

    /* Filters Section */
    .filters-section {
        background: white;
        border-radius: 16px;
        padding: 16px 24px;
        margin-bottom: 28px;
        border: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
    }

    .filters-header {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #475569;
        font-size: 14px;
        font-weight: 500;
    }

    .filter-icon {
        font-size: 16px;
    }

    .filters-group {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .filter-chip {
        padding: 8px 20px;
        border-radius: 40px;
        border: 1px solid #e2e8f0;
        background: white;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        color: #475569;
        position: relative;
    }

    .filter-chip:hover {
        border-color: #006bff;
        color: #006bff;
        transform: translateY(-1px);
    }

    .filter-chip.active {
        background: #006bff;
        color: white;
        border-color: transparent;
    }

    .filter-indicator {
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 3px;
        background: white;
        border-radius: 3px;
    }

    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 80px 20px;
        background: white;
        border-radius: 24px;
        border: 1px solid #e2e8f0;
    }

    .empty-icon {
        font-size: 64px;
        margin-bottom: 20px;
    }

    .empty-state h3 {
        font-size: 20px;
        font-weight: 600;
        color: #0b3558;
        margin-bottom: 8px;
    }

    .empty-state p {
        font-size: 14px;
        color: #667085;
        margin-bottom: 24px;
    }

    .empty-action {
        background: #006bff;
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 40px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .empty-action:hover {
        background: #005ce6;
    }

    /* Bookings List */
    .bookings-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 32px;
    }

    .booking-card {
        background: white;
        border-radius: 24px;
        border: 1px solid #e2e8f0;
        overflow: hidden;
        transition: all 0.3s ease;
        position: relative;
    }

    .booking-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
        border-color: #cbd5e1;
    }

    .booking-card.cancelled {
        opacity: 0.7;
        background: #fef2f2;
    }

    .card-header {
        padding: 24px 28px 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        border-bottom: 1px solid #f1f5f9;
    }

    .event-type-badge {
        width: 48px;
        height: 48px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 700;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .event-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
    }

    .event-title {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
    }

    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: 600;
        text-transform: capitalize;
    }

    .status-badge.confirmed {
        background: #d1fae5;
        color: #065f46;
    }

    .status-badge.pending {
        background: #fef3c7;
        color: #92400e;
    }

    .status-badge.cancelled {
        background: #fee2e2;
        color: #991b1b;
    }

    .status-badge.completed {
        background: #e0e7ff;
        color: #3730a3;
    }

    .status-icon {
        font-size: 12px;
    }

    /* Card Details */
    .card-details {
        padding: 20px 28px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .detail-row {
        display: flex;
        gap: 14px;
        align-items: flex-start;
    }

    .detail-icon {
        width: 36px;
        height: 36px;
        background: #f8fafc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #006bff;
        font-size: 16px;
    }

    .detail-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .detail-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #94a3b8;
    }

    .detail-value {
        font-size: 14px;
        font-weight: 500;
        color: #1e293b;
        line-height: 1.4;
    }

    .time-range {
        font-size: 13px;
        font-weight: 400;
        color: #006bff;
        margin-top: 2px;
        display: inline-block;
    }

    .guest-email {
        font-size: 12px;
        font-weight: 400;
        color: #64748b;
        display: block;
        margin-top: 2px;
    }

    .detail-value.notes {
        font-weight: 400;
        color: #475569;
        font-style: italic;
    }

    /* Card Actions */
    .card-actions {
        padding: 16px 28px 24px;
        border-top: 1px solid #f1f5f9;
        display: flex;
        justify-content: flex-end;
    }

    .cancel-btn {
        background: white;
        border: 1px solid #fee2e2;
        border-radius: 40px;
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 600;
        color: #dc2626;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
    }

    .cancel-btn:hover:not(:disabled) {
        background: #fef2f2;
        border-color: #fecaca;
        transform: translateY(-1px);
    }

    .cancel-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #dc2626;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }

    .completed-badge {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 24px;
        padding: 20px;
    }

    .page-btn {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        color: #475569;
    }

    .page-btn:hover:not(:disabled) {
        border-color: #6366f1;
        color: #6366f1;
        transform: translateY(-1px);
    }

    .page-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .page-info {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .bookings-page {
            padding: 24px 24px;
        }

        .card-details {
            grid-template-columns: 1fr;
            gap: 16px;
        }
    }

    @media (max-width: 768px) {
        .bookings-page {
            padding: 20px 16px;
        }

        .page-title {
            font-size: 26px;
        }

        .stats-summary {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }

        .stat-card {
            padding: 16px;
        }

        .stat-value {
            font-size: 22px;
        }

        .filters-section {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px;
        }

        .filters-group {
            width: 100%;
        }

        .filter-chip {
            flex: 1;
            text-align: center;
        }

        .card-header {
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
        }

        .event-info {
            width: 100%;
        }

        .event-title {
            font-size: 16px;
        }

        .card-details {
            padding: 16px 20px;
        }

        .detail-row {
            gap: 12px;
        }

        .detail-icon {
            width: 32px;
            height: 32px;
        }

        .card-actions {
            padding: 16px 20px 20px;
        }

        .cancel-btn {
            width: 100%;
            justify-content: center;
        }

        .completed-badge {
            top: 12px;
            right: 12px;
            font-size: 10px;
            padding: 3px 10px;
        }
    }

    @media (max-width: 480px) {
        .bookings-page {
            padding: 16px 12px;
        }

        .page-title {
            font-size: 22px;
        }

        .title-icon {
            font-size: 24px;
        }

        .page-subtitle {
            font-size: 13px;
        }

        .stats-summary {
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .stat-card {
            padding: 14px;
        }

        .stat-value {
            font-size: 20px;
        }

        .stat-icon {
            width: 44px;
            height: 44px;
            font-size: 22px;
        }

        .filter-chip {
            padding: 6px 16px;
            font-size: 13px;
        }

        .event-type-badge {
            width: 40px;
            height: 40px;
            font-size: 16px;
        }

        .event-title {
            font-size: 15px;
        }

        .status-badge {
            padding: 4px 12px;
            font-size: 11px;
        }

        .detail-value {
            font-size: 13px;
        }

        .time-range {
            font-size: 12px;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .card-details {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;