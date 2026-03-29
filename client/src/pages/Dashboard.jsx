import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { 
    FiPlus, FiClock, FiCalendar, FiUsers, FiX, FiExternalLink, FiCopy, 
    FiMenu, FiBell, FiSearch, FiChevronDown, FiGrid, FiList, FiBarChart2,
    FiSettings, FiHelpCircle, FiLogOut, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({ total: 0, upcoming: 0, past: 0, cancelled: 0 });
    const [eventTypes, setEventTypes] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('event-types');

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

    const copyLink = (slug) => {
        const link = `${window.location.origin}/book/${slug}`;
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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <style>{dashboardStyles}</style>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <style>{dashboardStyles}</style>
            
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FiMenu />
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon">C</span>
                        <span className="logo-text">Calendly</span>
                    </div>
                    <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
                        <FiX />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className={`nav-item ${activeTab === 'event-types' ? 'active' : ''}`} onClick={() => setActiveTab('event-types')}>
                        <FiGrid /> Event Types
                    </div>
                    <div className={`nav-item ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
                        <FiCalendar /> Upcoming
                    </div>
                    <div className="nav-item" onClick={() => navigate('/availability')}>
                        <FiClock /> Availability
                    </div>
                    <div className="nav-item" onClick={() => navigate('/analytics')}>
                        <FiBarChart2 /> Analytics
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="nav-item" onClick={() => navigate('/settings')}>
                        <FiSettings /> Settings
                    </div>
                    <div className="nav-item" onClick={() => navigate('/help')}>
                        <FiHelpCircle /> Help
                    </div>
                    <div className="nav-item logout" onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

            {/* Main Content */}
            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="search-area">
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="Search event types or meetings..." />
                    </div>
                    <div className="user-area">
                        <button className="notification-btn">
                            <FiBell />
                        </button>
                        <div className="user-info">
                            <div className="user-avatar">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name || 'User'}</span>
                                <span className="user-email">{user?.email || 'user@example.com'}</span>
                            </div>
                            <FiChevronDown />
                        </div>
                    </div>
                </div>

                {/* Welcome Section */}
                <div className="welcome-section">
                    <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
                    <p>Here's what's happening with your scheduling</p>
                </div>

                {/* Stats Grid - Calendly Style */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon total">
                            <FiCalendar size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.total || 0}</h3>
                            <p>Total Meetings</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon upcoming">
                            <FiClock size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.upcoming || 0}</h3>
                            <p>Upcoming</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon past">
                            <FiCheckCircle size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.past || 0}</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon cancelled">
                            <FiAlertCircle size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.cancelled || 0}</h3>
                            <p>Cancelled</p>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="action-bar">
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'event-types' ? 'active' : ''}`} onClick={() => setActiveTab('event-types')}>
                            <FiGrid /> Event Types
                        </button>
                        <button className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
                            <FiCalendar /> Upcoming Meetings
                        </button>
                    </div>
                    <button className="create-btn" onClick={() => navigate('/event-types/new')}>
                        <FiPlus /> Create Event Type
                    </button>
                </div>

                {/* Event Types Section */}
                {activeTab === 'event-types' && (
                    <div className="event-types-section">
                        {eventTypes.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📅</div>
                                <h3>No event types yet</h3>
                                <p>Create your first event type to start accepting bookings</p>
                                <button className="btn-primary" onClick={() => navigate('/event-types/new')}>
                                    <FiPlus /> Create Event Type
                                </button>
                            </div>
                        ) : (
                            <div className="event-types-grid">
                                {eventTypes.map(et => (
                                    <div key={et._id} className="event-card">
                                        <div className="event-card-header">
                                            <div className="event-color" style={{ background: et.color || '#006bff' }}></div>
                                            <div className="event-title-section">
                                                <h3>{et.title}</h3>
                                                <span className="event-badge">{et.duration} min</span>
                                            </div>
                                        </div>
                                        <p className="event-description">{et.description || 'No description provided'}</p>
                                        <div className="event-meta">
                                            <span><FiUsers /> One-on-One</span>
                                            <span><FiClock /> {et.duration} minutes</span>
                                        </div>
                                        <div className="event-availability">
                                            {et.availableDays?.map(day => {
                                                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                                                return <span key={day} className="day-badge">{days[day]}</span>;
                                            })}
                                        </div>
                                        <div className="event-actions">
                                            <button className="btn-outline" onClick={() => copyLink(et.slug || et._id)}>
                                                <FiCopy /> Copy Link
                                            </button>
                                            <button className="btn-outline" onClick={() => navigate(`/book/${et._id}`)}>
                                                <FiExternalLink /> Preview
                                            </button>
                                            <button className="btn-outline" onClick={() => navigate(`/event-types/${et._id}/edit`)}>
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Upcoming Meetings Section */}
                {activeTab === 'upcoming' && (
                    <div className="upcoming-section">
                        {upcomingBookings.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📆</div>
                                <h3>No upcoming meetings</h3>
                                <p>When someone books a meeting with you, it will appear here</p>
                            </div>
                        ) : (
                            <div className="bookings-list">
                                {upcomingBookings.map(booking => (
                                    <div key={booking._id} className="booking-card">
                                        <div className="booking-date">
                                            <div className="date-day">{new Date(booking.startTime).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                            <div className="date-number">{new Date(booking.startTime).getDate()}</div>
                                            <div className="date-month">{new Date(booking.startTime).toLocaleDateString('en-US', { month: 'short' })}</div>
                                        </div>
                                        <div className="booking-info">
                                            <h4>{booking.eventType?.title || 'Meeting'}</h4>
                                            <p className="booking-guest">
                                                <FiUsers size={12} /> {booking.guestName} • {booking.guestEmail}
                                            </p>
                                            <span className="booking-time">
                                                <FiClock size={12} /> {new Date(booking.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} 
                                                ({booking.duration || booking.eventType?.duration || 30} min)
                                            </span>
                                        </div>
                                        <div className="booking-actions">
                                            <button className="btn-danger" onClick={() => cancelBooking(booking._id)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const dashboardStyles = `
    /* Reset & Base */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .dashboard-container {
        display: flex;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #f8fafc 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, Helvetica, Arial, sans-serif;
    }

    /* Loading State */
    .dashboard-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #f8fafc 100%);
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

    /* Mobile Menu Button */
    .mobile-menu-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 100;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 10px;
        cursor: pointer;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: all 0.2s ease;
    }

    .mobile-menu-btn:hover {
        background: #f8fafc;
        transform: scale(1.02);
    }

    /* Sidebar - Calendly Style */
    .sidebar {
        width: 280px;
        background: white;
        border-right: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100vh;
        z-index: 200;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02);
    }

    .sidebar-header {
        padding: 28px 24px;
        border-bottom: 1px solid #f1f5f9;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .logo-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #006bff, #3b82f6);
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 20px;
        box-shadow: 0 4px 10px rgba(0, 107, 255, 0.3);
    }

    .logo-text {
        font-size: 20px;
        font-weight: 700;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

    .close-sidebar {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
        color: #94a3b8;
        transition: color 0.2s;
    }

    .close-sidebar:hover {
        color: #006bff;
    }

    .sidebar-nav {
        flex: 1;
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        border-radius: 12px;
        color: #475569;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
        font-weight: 500;
    }

    .nav-item svg {
        font-size: 18px;
    }

    .nav-item:hover {
        background: #f1f5f9;
        color: #006bff;
        transform: translateX(4px);
    }

    .nav-item.active {
        background: linear-gradient(135deg, #eef4ff, #e0e7ff);
        color: #006bff;
        font-weight: 600;
    }

    .sidebar-footer {
        padding: 20px 16px;
        border-top: 1px solid #f1f5f9;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .logout {
        color: #ef4444;
    }

    .logout:hover {
        background: #fef2f2;
        color: #dc2626;
    }

    /* Sidebar Overlay */
    .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 150;
        display: none;
        animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Main Content */
    .main-content {
        flex: 1;
        margin-left: 280px;
        padding: 28px 36px;
        min-height: 100vh;
    }

    /* Top Bar */
    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 36px;
        flex-wrap: wrap;
        gap: 16px;
    }

    .search-area {
        display: flex;
        align-items: center;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 10px 18px;
        min-width: 320px;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    }

    .search-area:focus-within {
        border-color: #006bff;
        box-shadow: 0 0 0 3px rgba(0, 107, 255, 0.1);
    }

    .search-icon {
        color: #94a3b8;
        margin-right: 12px;
    }

    .search-area input {
        border: none;
        outline: none;
        width: 100%;
        font-size: 14px;
        background: transparent;
    }

    .user-area {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .notification-btn {
        background: white;
        border: 1px solid #e2e8f0;
        cursor: pointer;
        font-size: 18px;
        color: #475569;
        padding: 10px;
        border-radius: 12px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
    }

    .notification-btn:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
        transform: translateY(-1px);
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 14px;
        transition: all 0.2s;
        background: white;
        border: 1px solid #e2e8f0;
    }

    .user-info:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
    }

    .user-avatar {
        width: 42px;
        height: 42px;
        background: linear-gradient(135deg, #006bff, #3b82f6);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
    }

    .user-details {
        display: flex;
        flex-direction: column;
    }

    .user-name {
        font-size: 14px;
        font-weight: 600;
        color: #0f172a;
    }

    .user-email {
        font-size: 11px;
        color: #64748b;
    }

    /* Welcome Section */
    .welcome-section {
        margin-bottom: 32px;
    }

    .welcome-section h1 {
        font-size: 32px;
        font-weight: 700;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 8px;
        letter-spacing: -0.02em;
    }

    .welcome-section p {
        font-size: 15px;
        color: #64748b;
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 36px;
    }

    .stat-card {
        background: white;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.12);
        border-color: #cbd5e1;
    }

    .stat-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .stat-icon.total { background: linear-gradient(135deg, #eef4ff, #e0e7ff); color: #006bff; }
    .stat-icon.upcoming { background: linear-gradient(135deg, #fef3c7, #fde68a); color: #d97706; }
    .stat-icon.past { background: linear-gradient(135deg, #d1fae5, #a7f3d0); color: #059669; }
    .stat-icon.cancelled { background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; }

    .stat-info h3 {
        font-size: 28px;
        font-weight: 700;
        color: #0f172a;
    }

    .stat-info p {
        font-size: 13px;
        color: #64748b;
        font-weight: 500;
    }

    /* Action Bar */
    .action-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        flex-wrap: wrap;
        gap: 16px;
    }

    .tabs {
        display: flex;
        gap: 8px;
        background: white;
        padding: 4px;
        border-radius: 14px;
        border: 1px solid #e2e8f0;
    }

    .tab {
        padding: 10px 24px;
        border: none;
        background: none;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #64748b;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .tab:hover {
        color: #006bff;
        background: #f8fafc;
    }

    .tab.active {
        background: #006bff;
        color: white;
        box-shadow: 0 2px 8px rgba(0, 107, 255, 0.3);
    }

    .create-btn {
        background: linear-gradient(135deg, #006bff, #3b82f6);
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
        box-shadow: 0 2px 6px rgba(0, 107, 255, 0.3);
    }

    .create-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 107, 255, 0.35);
    }

    /* Event Types Grid */
    .event-types-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 24px;
    }

    .event-card {
        background: white;
        border-radius: 20px;
        padding: 24px;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
    }

    .event-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.1);
        border-color: #cbd5e1;
    }

    .event-card-header {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        margin-bottom: 16px;
    }

    .event-color {
        width: 6px;
        height: 50px;
        border-radius: 6px;
    }

    .event-title-section {
        flex: 1;
    }

    .event-title-section h3 {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 6px;
    }

    .event-badge {
        display: inline-block;
        padding: 4px 10px;
        background: #f1f5f9;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        color: #475569;
    }

    .event-description {
        font-size: 13px;
        color: #64748b;
        margin-bottom: 16px;
        line-height: 1.5;
    }

    .event-meta {
        display: flex;
        gap: 16px;
        margin-bottom: 14px;
    }

    .event-meta span {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #64748b;
    }

    .event-availability {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .day-badge {
        padding: 4px 12px;
        background: #f8fafc;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 500;
        color: #475569;
        border: 1px solid #e2e8f0;
    }

    .event-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .btn-outline {
        padding: 8px 16px;
        border: 1px solid #e2e8f0;
        background: white;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
    }

    .btn-outline:hover {
        border-color: #006bff;
        color: #006bff;
        transform: translateY(-1px);
    }

    .btn-danger {
        padding: 8px 18px;
        border: 1px solid #fee2e2;
        background: white;
        color: #dc2626;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-danger:hover {
        background: #fef2f2;
        border-color: #fecaca;
        transform: translateY(-1px);
    }

    .btn-primary {
        background: linear-gradient(135deg, #006bff, #3b82f6);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(0, 107, 255, 0.3);
    }

    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 64px 32px;
        background: white;
        border-radius: 24px;
        border: 1px solid #e2e8f0;
    }

    .empty-icon {
        font-size: 56px;
        margin-bottom: 20px;
    }

    .empty-state h3 {
        font-size: 20px;
        color: #0f172a;
        margin-bottom: 8px;
        font-weight: 600;
    }

    .empty-state p {
        font-size: 14px;
        color: #64748b;
        margin-bottom: 28px;
    }

    /* Bookings List */
    .bookings-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .booking-card {
        background: white;
        border-radius: 20px;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 24px;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
    }

    .booking-card:hover {
        transform: translateX(5px);
        box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.1);
        border-color: #cbd5e1;
    }

    .booking-date {
        text-align: center;
        min-width: 80px;
        padding: 10px;
        background: #f8fafc;
        border-radius: 16px;
    }

    .date-day {
        font-size: 11px;
        font-weight: 600;
        color: #006bff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .date-number {
        font-size: 32px;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.1;
    }

    .date-month {
        font-size: 11px;
        color: #64748b;
        font-weight: 500;
    }

    .booking-info {
        flex: 1;
    }

    .booking-info h4 {
        font-size: 17px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 6px;
    }

    .booking-guest {
        font-size: 13px;
        color: #64748b;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .booking-time {
        font-size: 12px;
        color: #006bff;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #eef4ff;
        padding: 4px 12px;
        border-radius: 20px;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
        .stats-grid {
            gap: 16px;
        }
        
        .event-types-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
    }

    @media (max-width: 1024px) {
        .main-content {
            padding: 24px;
        }
        
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }

        .sidebar {
            transform: translateX(-100%);
        }

        .sidebar-open {
            transform: translateX(0);
        }

        .close-sidebar {
            display: block;
        }

        .sidebar-overlay {
            display: block;
        }

        .main-content {
            margin-left: 0;
            padding: 80px 20px 20px;
        }

        .top-bar {
            flex-direction: column;
            align-items: stretch;
        }

        .search-area {
            width: 100%;
            min-width: auto;
        }

        .user-details {
            display: none;
        }

        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }

        .action-bar {
            flex-direction: column;
            align-items: stretch;
        }

        .tabs {
            justify-content: center;
        }

        .create-btn {
            justify-content: center;
        }

        .event-types-grid {
            grid-template-columns: 1fr;
        }

        .booking-card {
            flex-direction: column;
            text-align: center;
        }

        .booking-date {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
        }

        .booking-guest {
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }

        .welcome-section h1 {
            font-size: 26px;
        }

        .event-actions {
            flex-direction: column;
        }

        .btn-outline {
            width: 100%;
            justify-content: center;
        }
    }
`;