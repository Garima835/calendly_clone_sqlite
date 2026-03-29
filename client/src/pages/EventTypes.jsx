import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import {
  FiPlus, FiClock, FiCalendar, FiUsers, FiSearch, FiChevronDown, 
  FiGrid, FiSettings, FiHelpCircle, FiLink, FiMoreVertical, 
  FiExternalLink, FiRepeat, FiBarChart2
} from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadEventTypes();
  }, []);

  const loadEventTypes = async () => {
    try {
      const res = await API.get('/event-types');
      setEventTypes(res.data);
    } catch (error) {
      console.error('Failed to load event types', error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (etId) => {
    const link = `${window.location.origin}/book/${etId}`;
    navigator.clipboard.writeText(link).then(() => {
      showToast('Link copied to clipboard!');
    });
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="calendly-container">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">Calendly</span>
        </div>

        <button className="btn-sidebar-create" onClick={() => navigate('/event-types/new')}>
          <FiPlus /> Create
        </button>

        <nav className="sidebar-nav">
          <div className="nav-item active"><FiLink /> Scheduling</div>
          <div className="nav-item"><FiCalendar /> Meetings</div>
          <div className="nav-item"><FiClock /> Availability</div>
          <div className="nav-item"><FiUsers /> Contacts</div>
          <div className="nav-item"><FiRepeat /> Workflows</div>
          <div className="nav-item"><FiGrid /> Integrations & apps</div>
          <div className="nav-item"><FiRepeat /> Routing</div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item upgrade"><span className="coin-icon">$</span> Upgrade plan</div>
          <div className="nav-item"><FiBarChart2 /> Analytics</div>
          <div className="nav-item"><FiSettings /> Admin center</div>
          <div className="nav-item">
            <FiHelpCircle /> Help <FiChevronDown style={{ marginLeft: 'auto' }} />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-right">
            <div className="user-profile">
              <div className="avatar">G</div>
              <FiChevronDown />
            </div>
            <button className="btn-header-create">
              <FiPlus /> Create <FiChevronDown />
            </button>
          </div>
        </header>

        <div className="content-inner">
          <div className="page-title">
            <h1>Scheduling <FiHelpCircle className="info-icon" /></h1>
          </div>

          <div className="tab-navigation">
            <button className="tab active">Event types</button>
            <button className="tab">Single-use links</button>
            <button className="tab">Meeting polls</button>
          </div>

          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search event types" />
          </div>

          <div className="user-info-row">
            <div className="user-identity">
              <div className="small-avatar">G</div>
              <span className="user-name">Garima Gupta</span>
            </div>
            <div className="view-landing-page">
              <FiExternalLink /> View landing page
              <FiMoreVertical className="more-icon" />
            </div>
          </div>

          {/* --- EVENT TYPE LIST --- */}
          <div className="event-list">
            {eventTypes.length > 0 ? (
              eventTypes.map((et) => (
                <div key={et._id} className="event-row-card">
                  <div className="accent-bar" style={{ background: et.color || '#8145f4' }}></div>
                  <div className="card-inner">
                    <div className="card-left">
                      <input type="checkbox" className="custom-checkbox" />
                      <div className="event-details">
                        <h3>{et.title}</h3>
                        <p>{et.duration} min • Google Meet • One-on-One</p>
                        <span className="availability">Weekdays, 9 am - 5 pm</span>
                      </div>
                    </div>
                    <div className="card-right">
                      <button className="btn-copy-link" onClick={() => copyLink(et._id)}>
                        <FiLink /> Copy link
                      </button>
                      <FiMoreVertical className="more-dots" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Fallback/Sample Item matching the image exactly */
              <div className="event-row-card">
                <div className="accent-bar purple"></div>
                <div className="card-inner">
                  <div className="card-left">
                    <input type="checkbox" className="custom-checkbox" />
                    <div className="event-details">
                      <h3>30 Minute Meeting</h3>
                      <p>30 min • Google Meet • One-on-One</p>
                      <span className="availability">Weekdays, 9 am - 5 pm</span>
                    </div>
                  </div>
                  <div className="card-right">
                    <button className="btn-copy-link">
                      <FiLink /> Copy link
                    </button>
                    <FiMoreVertical className="more-dots" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{dashboardStyles}</style>
    </div>
  );
}

const dashboardStyles = `
  :root {
    --primary-blue: #006bff;
    --text-dark: #0b3558;
    --text-gray: #667085;
    --border-color: #e5e7eb;
    --sidebar-width: 240px;
  }

  .calendly-container {
    display: flex;
    min-height: 100vh;
    background: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  /* SIDEBAR STYLING */
  .sidebar {
    width: var(--sidebar-width);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    position: fixed;
    height: 100vh;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px 24px;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
    background: var(--primary-blue);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 800;
    color: var(--primary-blue);
    letter-spacing: -0.5px;
  }

  .btn-sidebar-create {
    margin: 0 20px 20px;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    cursor: pointer;
    color: var(--text-dark);
  }

  .sidebar-nav { flex: 1; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 24px;
    font-size: 14px;
    color: #475467;
    cursor: pointer;
  }

  .nav-item.active {
    background: #f1f5f9;
    color: var(--primary-blue);
    font-weight: 600;
    border-left: 3px solid var(--primary-blue);
    padding-left: 21px;
  }

  .sidebar-footer {
    border-top: 1px solid var(--border-color);
    padding-top: 10px;
  }

  .coin-icon {
    width: 18px;
    height: 18px;
    background: #eee;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  /* MAIN CONTENT STYLING */
  .main-content {
    margin-left: var(--sidebar-width);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .top-header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 32px;
  }

  .header-right { display: flex; align-items: center; gap: 20px; }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-gray);
    cursor: pointer;
  }

  .avatar {
    width: 32px;
    height: 32px;
    background: #e2e8f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    color: #475467;
  }

  .btn-header-create {
    background: var(--primary-blue);
    color: white;
    border: none;
    padding: 8px 18px;
    border-radius: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .content-inner {
    padding: 0 32px 40px;
    max-width: 1000px;
  }

  .page-title h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 24px;
  }

  .info-icon { font-size: 18px; color: #98a2b3; }

  .tab-navigation {
    display: flex;
    gap: 24px;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 24px;
  }

  .tab {
    background: none;
    border: none;
    padding: 12px 0;
    font-size: 14px;
    color: var(--text-gray);
    cursor: pointer;
    position: relative;
  }

  .tab.active {
    color: var(--text-dark);
    font-weight: 600;
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-blue);
  }

  .search-bar {
    position: relative;
    width: 350px;
    margin-bottom: 24px;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #98a2b3;
  }

  .search-bar input {
    width: 100%;
    padding: 8px 12px 8px 38px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 14px;
    outline: none;
  }

  .user-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    margin-bottom: 16px;
  }

  .user-identity { display: flex; align-items: center; gap: 10px; }
  .small-avatar {
    width: 24px;
    height: 24px;
    background: #f2f4f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
  }

  .user-name { font-size: 14px; font-weight: 500; }

  .view-landing-page {
    color: var(--primary-blue);
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .more-icon { color: #667085; margin-left: 12px; }

  /* EVENT ROW CARD STYLING */
  .event-row-card {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    overflow: hidden;
    margin-bottom: 12px;
    background: white;
  }

  .accent-bar { width: 6px; }
  .accent-bar.purple { background: #8145f4; }

  .card-inner {
    flex: 1;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-left { display: flex; gap: 16px; align-items: flex-start; }
  .custom-checkbox {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    border: 1px solid #d0d5dd;
    border-radius: 4px;
  }

  .event-details h3 { font-size: 16px; font-weight: 700; margin: 0 0 4px; }
  .event-details p { font-size: 13px; color: var(--text-gray); margin: 0 0 4px; }
  .availability { font-size: 13px; color: var(--text-gray); }

  .card-right { display: flex; align-items: center; gap: 12px; }

  .btn-copy-link {
    background: white;
    border: 1px solid var(--border-color);
    padding: 8px 16px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .more-dots { color: var(--text-gray); font-size: 20px; cursor: pointer; }

  /* Responsive Fixes */
  @media (max-width: 768px) {
    .sidebar { display: none; }
    .main-content { margin-left: 0; }
    .search-bar { width: 100%; }
  }
`;