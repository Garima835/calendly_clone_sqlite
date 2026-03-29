import { FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <FiCalendar className="brand-icon" />
                        <span>Calendly Clone</span>
                    </div>
                    <p className="footer-tagline">Simplify scheduling for everyone</p>
                </div>
                <div className="footer-columns">
                    <div className="footer-col">
                        <h4>Product</h4>
                        <Link to="/">Home</Link>
                        <Link to="/event-types/new">Create Event</Link>
                        <Link to="/bookings">Bookings</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Account</h4>
                        <Link to="/login">Log In</Link>
                        <Link to="/register">Sign Up</Link>
                        <Link to="/profile">Profile</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <span>Documentation</span>
                        <span>Support</span>
                        <span>API</span>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Calendly Clone. Built with React and Node.js.</p>
                </div>
            </div>
        </footer>
    );
}