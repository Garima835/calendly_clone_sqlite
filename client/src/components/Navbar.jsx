import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiCalendar, FiLogOut, FiPlus, FiGrid, FiClock, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate('/');
    };

    const closeMobile = () => setMobileOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand" onClick={closeMobile}>
                    <FiCalendar className="brand-icon" />
                    <span>Calendly</span>
                </Link>

                <div className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={closeMobile}><FiGrid /> Dashboard</Link>
                            <Link to="/event-types" onClick={closeMobile}><FiClock /> Event Types</Link>
                            <Link to="/bookings" onClick={closeMobile}>My Bookings</Link>
                            <Link to="/event-types/new" className="btn btn-primary btn-sm" onClick={closeMobile}>
                                <FiPlus /> Create
                            </Link>
                            <Link to="/profile" className="navbar-avatar" onClick={closeMobile}>
                                {user.name.charAt(0).toUpperCase()}
                            </Link>
                            <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                                <FiLogOut /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm" onClick={closeMobile}>Log In</Link>
                            <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMobile}>Sign Up</Link>
                        </>
                    )}
                </div>

                <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </nav>
    );
}