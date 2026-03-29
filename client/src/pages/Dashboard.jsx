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
  <div className="dash-wrapper">

    {/* LEFT CONTENT */}
    <div className="dash-left">

      <h1 className="dash-title">
        Welcome, {user?.name?.split(' ')[0]} 👋
      </h1>

      <p className="dash-sub">
        Manage your meetings, availability, and booking links
      </p>

      {/* STATS */}
      <div className="dash-section">
        <h2>Overview</h2>

        <div className="dash-box">
          <div className="stat-row">
            <span>Total Bookings</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="stat-row">
            <span>Upcoming</span>
            <strong>{stats.upcoming}</strong>
          </div>
          <div className="stat-row">
            <span>Past</span>
            <strong>{stats.past}</strong>
          </div>
          <div className="stat-row">
            <span>Cancelled</span>
            <strong>{stats.cancelled}</strong>
          </div>
        </div>
      </div>

      {/* EVENT TYPES */}
      <div className="dash-section">
        <h2>Your Event Types</h2>

        <div className="dash-box">
          {eventTypes.map(et => (
            <div key={et._id} className="et-row">
              <div className="et-left">
                <div className="dot" style={{ background: et.color }}></div>
                <div>
                  <p className="et-title">{et.title}</p>
                  <p className="et-meta">{et.duration} min</p>
                </div>
              </div>

              <button
                className="btn-sm"
                onClick={() => navigate(`/book/${et._id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING LINK */}
      <div className="dash-section">
        <h2>Your booking link</h2>

        <div className="dash-box link-box">
          <span>{window.location.origin}/u/{user?.username}</span>
          <button onClick={() => copyLink(user.username)}>Copy</button>
        </div>
      </div>

      {/* CTA */}
      <div className="dash-cta">
        <Link to="/event-types/new" className="btn-main">
          Create Event
        </Link>
      </div>

    </div>

    {/* RIGHT PREVIEW */}
    <div className="dash-right">
      <div className="preview-card">
        <h3>Select a Date & Time</h3>

        <div className="calendar-box">
          <div className="calendar-header">August</div>

          <div className="calendar-grid">
            {[...Array(30)].map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        </div>

        <div className="time-slots">
          <button>10:00am</button>
          <button className="active">11:00am</button>
          <button>1:00pm</button>
        </div>
      </div>
    </div>

    {/* INTERNAL CSS */}
    <style>{`
      .dash-wrapper {
        display: flex;
        min-height: 100vh;
        background: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
      }

      .dash-left {
        flex: 1;
        padding: 60px 80px;
      }

      .dash-title {
        font-size: 32px;
        font-weight: 700;
        color: #0f172a;
      }

      .dash-sub {
        color: #64748b;
        margin-bottom: 30px;
      }

      .dash-section {
        margin-bottom: 30px;
      }

      .dash-box {
        background: white;
        padding: 20px;
        border-radius: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }

      .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }

      .et-row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
      }

      .et-left {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .et-title {
        font-weight: 600;
      }

      .et-meta {
        font-size: 12px;
        color: #6b7280;
      }

      .btn-sm {
        background: #2563eb;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
      }

      .link-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .dash-cta {
        text-align: right;
      }

      .btn-main {
        background: #2563eb;
        color: white;
        padding: 12px 24px;
        border-radius: 999px;
        text-decoration: none;
      }

      .dash-right {
        width: 400px;
        background: linear-gradient(135deg, #e0f2ff, #f0f9ff);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .preview-card {
        background: white;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        width: 280px;
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 6px;
        margin-top: 10px;
      }

      .calendar-grid span {
        text-align: center;
        font-size: 12px;
        padding: 6px;
      }

      .time-slots {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .time-slots button {
        border: 1px solid #2563eb;
        background: white;
        color: #2563eb;
        padding: 6px;
        border-radius: 6px;
        cursor: pointer;
      }

      .time-slots .active {
        background: #2563eb;
        color: white;
      }
    `}</style>

  </div>
);
}