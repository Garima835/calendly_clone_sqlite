import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import { FiClock, FiMapPin, FiArrowLeft, FiArrowRight, FiCheck, FiCalendar, FiUser, FiMail } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function BookingPage() {
    const { id } = useParams();

    const [eventType, setEventType] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ guestName: '', guestEmail: '' });
    const [booked, setBooked] = useState(false);

    const loadEvent = async () => {
        try {
            const res = await API.get(`/event-types/${id}`);
            setEventType(res.data);
        } catch {
            showToast('Event not found', 'error');
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadEvent();
    }, []);

    const days = Array.from({ length: 10 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d.toISOString().split('T')[0];
    });

    const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

    const handleBook = async () => {
        if (!form.guestName || !form.guestEmail) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        setBooked(true);
    };

    if (!eventType) return (
        <div className="booking-page loading-page">
            <div className="spinner"></div>
            <style>{styles}</style>
        </div>
    );

    if (booked) {
        return (
            <div className="booking-page center">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h2>Booking Confirmed!</h2>
                    <p className="success-details">
                        {new Date(selectedDate).toDateString()} at {selectedTime}
                    </p>
                    <p className="success-message">
                        A confirmation email has been sent to {form.guestEmail}
                    </p>
                    <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
                </div>
                <style>{styles}</style>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <div className="booking-container">
                {/* LEFT SIDE - Main Content */}
                <div className="booking-left">
                    {/* Progress Indicator */}
                    <div className="progress-section">
                        <div className="step-indicator">
                            <span>STEP {step} OF 2</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(step / 2) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="event-info">
                        <h1>{eventType.title}</h1>
                        <div className="event-meta">
                            <span><FiClock /> {eventType.duration} min</span>
                            <span><FiMapPin /> {eventType.location || 'Online Meeting'}</span>
                        </div>
                    </div>

                    {/* Step 1: Date & Time Selection */}
                    {step === 1 && (
                        <>
                            <div className="selection-section">
                                <h2>Select a date</h2>
                                <div className="date-grid">
                                    {days.map(d => {
                                        const dateObj = new Date(d);
                                        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                                        const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
                                        const dayNum = dateObj.getDate();
                                        return (
                                            <button
                                                key={d}
                                                className={`date-card ${selectedDate === d ? 'active' : ''}`}
                                                onClick={() => setSelectedDate(d)}
                                            >
                                                <div className="day-name">{dayName}</div>
                                                <div className="day-number">{dayNum}</div>
                                                <div className="month-name">{monthName}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="selection-section">
                                    <h2>Select a time</h2>
                                    <div className="time-grid">
                                        {times.map(t => (
                                            <button
                                                key={t}
                                                className={`time-slot ${selectedTime === t ? 'active' : ''}`}
                                                onClick={() => setSelectedTime(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedTime && (
                                <button className="next-button" onClick={() => setStep(2)}>
                                    Next <FiArrowRight />
                                </button>
                            )}
                        </>
                    )}

                    {/* Step 2: Your Details */}
                    {step === 2 && (
                        <>
                            <div className="details-section">
                                <h2>Your details</h2>
                                <div className="details-form">
                                    <div className="input-group">
                                        <FiUser className="input-icon" />
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            value={form.guestName}
                                            onChange={e => setForm({ ...form, guestName: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <FiMail className="input-icon" />
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={form.guestEmail}
                                            onChange={e => setForm({ ...form, guestEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="button-group">
                                <button className="back-button" onClick={() => setStep(1)}>
                                    <FiArrowLeft /> Back
                                </button>
                                <button className="confirm-button" onClick={handleBook}>
                                    Confirm Booking <FiCheck />
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* RIGHT SIDE - Preview Card */}
                <div className="booking-right">
                    <div className="preview-card">
                        <div className="preview-header">
                            <FiCalendar size={24} />
                            <h4>Booking Summary</h4>
                        </div>
                        <div className="preview-content">
                            {selectedDate && (
                                <div className="preview-item">
                                    <div className="preview-label">📅 Date</div>
                                    <div className="preview-value">{new Date(selectedDate).toDateString()}</div>
                                </div>
                            )}
                            {selectedTime && (
                                <div className="preview-item">
                                    <div className="preview-label">⏰ Time</div>
                                    <div className="preview-value">{selectedTime}</div>
                                </div>
                            )}
                            <div className="preview-item">
                                <div className="preview-label">📋 Event</div>
                                <div className="preview-value">{eventType.title}</div>
                            </div>
                            <div className="preview-item">
                                <div className="preview-label">⏱️ Duration</div>
                                <div className="preview-value">{eventType.duration} minutes</div>
                            </div>
                            {form.guestName && (
                                <div className="preview-item">
                                    <div className="preview-label">👤 Name</div>
                                    <div className="preview-value">{form.guestName}</div>
                                </div>
                            )}
                            {form.guestEmail && (
                                <div className="preview-item">
                                    <div className="preview-label">📧 Email</div>
                                    <div className="preview-value">{form.guestEmail}</div>
                                </div>
                            )}
                            {!selectedDate && !selectedTime && (
                                <div className="preview-placeholder">
                                    <FiCalendar size={32} />
                                    <p>Select a date and time to see your booking summary</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{styles}</style>
        </div>
    );
}

const styles = `
    /* Main Container */
    .booking-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .booking-container {
        display: flex;
        min-height: 100vh;
        max-width: 1400px;
        margin: 0 auto;
    }

    /* Loading State */
    .loading-page {
        display: flex;
        justify-content: center;
        align-items: center;
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

    /* LEFT SIDE */
    .booking-left {
        flex: 1.2;
        padding: clamp(30px, 5vw, 60px) clamp(30px, 5vw, 80px);
        background: white;
        border-radius: 0 40px 40px 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    /* Progress Section */
    .progress-section {
        margin-bottom: clamp(24px, 6vw, 32px);
    }

    .step-indicator span {
        font-size: clamp(11px, 3vw, 13px);
        font-weight: 600;
        color: #006bff;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .progress-bar {
        height: 4px;
        background: #e5e7eb;
        border-radius: 2px;
        margin-top: 8px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #006bff, #3b82f6);
        border-radius: 2px;
        transition: width 0.3s ease;
    }

    /* Event Info */
    .event-info {
        margin-bottom: clamp(24px, 6vw, 32px);
    }

    .event-info h1 {
        font-size: clamp(24px, 6vw, 32px);
        font-weight: 700;
        color: #0b3558;
        margin-bottom: 12px;
    }

    .event-meta {
        display: flex;
        gap: clamp(16px, 4vw, 24px);
        flex-wrap: wrap;
    }

    .event-meta span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: clamp(13px, 3.5vw, 14px);
        color: #6b7280;
    }

    /* Selection Sections */
    .selection-section {
        margin-bottom: 32px;
    }

    .selection-section h2 {
        font-size: clamp(16px, 4vw, 18px);
        font-weight: 600;
        color: #0b3558;
        margin-bottom: 16px;
    }

    /* Date Grid */
    .date-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(80px, 100%), 1fr));
        gap: clamp(10px, 3vw, 12px);
        margin-bottom: 8px;
    }

    .date-card {
        padding: clamp(10px, 3vw, 12px);
        text-align: center;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        background: white;
    }

    .date-card:hover {
        border-color: #006bff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 107, 255, 0.1);
    }

    .date-card.active {
        background: #006bff;
        border-color: #006bff;
    }

    .date-card.active .day-name,
    .date-card.active .day-number,
    .date-card.active .month-name {
        color: white;
    }

    .day-name {
        font-size: clamp(10px, 2.5vw, 11px);
        font-weight: 500;
        color: #6b7280;
        margin-bottom: 4px;
    }

    .day-number {
        font-size: clamp(18px, 5vw, 20px);
        font-weight: 700;
        color: #0b3558;
        margin-bottom: 2px;
    }

    .month-name {
        font-size: clamp(9px, 2vw, 10px);
        color: #9ca3af;
    }

    /* Time Grid */
    .time-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100px, 100%), 1fr));
        gap: clamp(10px, 3vw, 12px);
    }

    .time-slot {
        padding: clamp(10px, 3vw, 12px);
        text-align: center;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        background: white;
        font-size: clamp(13px, 3.5vw, 14px);
        font-weight: 500;
        color: #374151;
    }

    .time-slot:hover {
        border-color: #006bff;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 107, 255, 0.1);
    }

    .time-slot.active {
        background: #006bff;
        color: white;
        border-color: #006bff;
    }

    /* Details Form */
    .details-section {
        margin-bottom: 32px;
    }

    .details-section h2 {
        font-size: clamp(16px, 4vw, 18px);
        font-weight: 600;
        color: #0b3558;
        margin-bottom: 20px;
    }

    .details-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .input-group {
        display: flex;
        align-items: center;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 12px 16px;
        transition: all 0.2s ease;
        background: white;
    }

    .input-group:focus-within {
        border-color: #006bff;
        box-shadow: 0 0 0 3px rgba(0, 107, 255, 0.1);
    }

    .input-icon {
        color: #9ca3af;
        margin-right: 12px;
        font-size: 18px;
    }

    .input-group input {
        border: none;
        outline: none;
        width: 100%;
        font-size: clamp(14px, 3.5vw, 15px);
        font-family: inherit;
    }

    .input-group input::placeholder {
        color: #cbd5e1;
    }

    /* Buttons */
    .next-button {
        width: 100%;
        padding: 14px 24px;
        background: linear-gradient(135deg, #006bff, #0052cc);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: clamp(14px, 3.5vw, 16px);
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .next-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 107, 255, 0.3);
    }

    .button-group {
        display: flex;
        gap: 16px;
        margin-top: 24px;
    }

    .back-button {
        flex: 1;
        padding: 12px 24px;
        background: white;
        color: #374151;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .back-button:hover {
        border-color: #006bff;
        color: #006bff;
        transform: translateY(-1px);
    }

    .confirm-button {
        flex: 2;
        padding: 12px 24px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .confirm-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }

    /* RIGHT SIDE - Preview Card */
    .booking-right {
        flex: 0.8;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: clamp(20px, 5vw, 40px);
    }

    .preview-card {
        background: white;
        border-radius: 24px;
        padding: clamp(24px, 5vw, 32px);
        width: 100%;
        max-width: 320px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .preview-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #e5e7eb;
    }

    .preview-header svg {
        color: #006bff;
    }

    .preview-header h4 {
        font-size: 18px;
        font-weight: 600;
        color: #0b3558;
        margin: 0;
    }

    .preview-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .preview-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .preview-label {
        font-size: 13px;
        font-weight: 500;
        color: #6b7280;
    }

    .preview-value {
        font-size: 13px;
        font-weight: 600;
        color: #0b3558;
        text-align: right;
    }

    .preview-placeholder {
        text-align: center;
        padding: 40px 20px;
        color: #9ca3af;
    }

    .preview-placeholder svg {
        margin-bottom: 12px;
        opacity: 0.5;
    }

    .preview-placeholder p {
        font-size: 13px;
        margin: 0;
    }

    /* Success Card */
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
    }

    .success-card {
        background: white;
        border-radius: 24px;
        padding: clamp(32px, 8vw, 48px);
        text-align: center;
        max-width: 450px;
        width: 100%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .success-icon {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        margin: 0 auto 20px;
    }

    .success-card h2 {
        font-size: clamp(24px, 6vw, 28px);
        color: #0b3558;
        margin-bottom: 12px;
    }

    .success-details {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 8px;
    }

    .success-message {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 24px;
    }

    .success-card .btn-primary {
        display: inline-block;
        padding: 12px 24px;
        background: #006bff;
        color: white;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .success-card .btn-primary:hover {
        background: #0052cc;
        transform: translateY(-2px);
    }

    /* Responsive Breakpoints */
    @media (max-width: 968px) {
        .booking-container {
            flex-direction: column;
        }

        .booking-left {
            border-radius: 0;
            padding: 30px;
        }

        .booking-right {
            min-height: 400px;
        }

        .preview-card {
            max-width: 100%;
        }
    }

    @media (max-width: 640px) {
        .booking-left {
            padding: 20px;
        }

        .date-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(70px, 100%), 1fr));
        }

        .time-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(85px, 100%), 1fr));
        }

        .button-group {
            flex-direction: column;
        }

        .preview-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
        }

        .preview-value {
            text-align: left;
        }
    }

    @media (max-width: 480px) {
        .booking-left {
            padding: 16px;
        }

        .date-card {
            padding: 8px;
        }

        .day-number {
            font-size: 16px;
        }

        .time-slot {
            padding: 8px;
            font-size: 12px;
        }

        .input-group {
            padding: 10px 14px;
        }

        .next-button, .back-button, .confirm-button {
            padding: 12px 20px;
        }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        .booking-page {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        }

        .booking-left {
            background: #1e293b;
        }

        .event-info h1,
        .selection-section h2,
        .details-section h2 {
            color: #f1f5f9;
        }

        .date-card,
        .time-slot,
        .input-group {
            background: #334155;
            border-color: #475569;
        }

        .date-card .day-name,
        .date-card .month-name {
            color: #94a3b8;
        }

        .date-card .day-number {
            color: #f1f5f9;
        }

        .input-group input {
            background: #334155;
            color: #f1f5f9;
        }

        .preview-card {
            background: #1e293b;
        }

        .preview-header h4 {
            color: #f1f5f9;
        }

        .preview-value {
            color: #f1f5f9;
        }

        .success-card {
            background: #1e293b;
        }

        .success-card h2 {
            color: #f1f5f9;
        }
    }
`;