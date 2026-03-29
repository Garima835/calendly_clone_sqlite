import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import { FiClock, FiMapPin, FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function BookingPage() {
    const { id } = useParams();

    const [eventType, setEventType] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    // const [availableSlots, setAvailableSlots] = useState([]);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ guestName: '', guestEmail: '' });
    const [booked, setBooked] = useState(false);

    useEffect(() => {
        loadEvent();
    }, []);

    const loadEvent = async () => {
        try {
            const res = await API.get(`/event-types/${id}`);
            setEventType(res.data);
        } catch {
            showToast('Event not found', 'error');
        }
    };

    const days = Array.from({ length: 10 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d.toISOString().split('T')[0];
    });

    const times = ['10:00', '11:00', '13:00', '15:00'];

    const handleBook = async () => {
        if (!form.guestName || !form.guestEmail) {
            showToast('Fill all fields', 'error');
            return;
        }
        setBooked(true);
    };

    if (!eventType) return <p style={{ padding: 40 }}>Loading...</p>;

    if (booked) {
        return (
            <div className="booking-page center">
                <div className="card">
                    <FiCheck className="success-icon"/>
                    <h2>Booking Confirmed</h2>
                    <p>{selectedDate} at {selectedTime}</p>
                    <Link to="/" className="btn-primary">Done</Link>
                </div>
                <style>{styles}</style>
            </div>
        );
    }

    return (
        <div className="booking-page">

            <div className="layout">

                {/* LEFT */}
                <div className="left">

                    <h1>{eventType.title}</h1>

                    <p className="meta">
                        <FiClock /> {eventType.duration} min &nbsp;
                        <FiMapPin /> {eventType.location}
                    </p>

                    {step === 1 && (
                        <>
                            <h2>Select a date</h2>

                            <div className="card">
                                <div className="grid">
                                    {days.map(d => (
                                        <button
                                            key={d}
                                            className={selectedDate === d ? 'active' : ''}
                                            onClick={() => setSelectedDate(d)}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedDate && (
                                <>
                                    <h2>Select time</h2>

                                    <div className="card">
                                        <div className="grid">
                                            {times.map(t => (
                                                <button
                                                    key={t}
                                                    className={selectedTime === t ? 'active' : ''}
                                                    onClick={() => setSelectedTime(t)}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedTime && (
                                <button className="btn-primary" onClick={() => setStep(2)}>
                                    Next <FiArrowRight />
                                </button>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2>Your details</h2>

                            <div className="card form">
                                <input placeholder="Name" onChange={e => setForm({ ...form, guestName: e.target.value })}/>
                                <input placeholder="Email" onChange={e => setForm({ ...form, guestEmail: e.target.value })}/>
                            </div>

                            <div className="actions">
                                <button className="btn-ghost" onClick={() => setStep(1)}>
                                    <FiArrowLeft /> Back
                                </button>
                                <button className="btn-primary" onClick={handleBook}>
                                    Confirm
                                </button>
                            </div>
                        </>
                    )}

                </div>

                {/* RIGHT VISUAL */}
                <div className="right">
                    <div className="preview-card">
                        <h4>Select a Date & Time</h4>
                        <div className="preview-box"></div>
                    </div>
                </div>

            </div>

            <style>{styles}</style>
        </div>
    );
}

/* 🔥 INTERNAL CSS */
const styles = `
.booking-page{
    min-height:100vh;
    background:#f8fafc;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto;
}

.layout{
    display:flex;
    min-height:100vh;
}

/* LEFT */
.left{
    flex:1.2;
    padding:60px 80px;
}

.left h1{
    font-size:28px;
    font-weight:700;
}

.meta{
    color:#6b7280;
    margin-bottom:20px;
}

/* RIGHT */
.right{
    flex:1;
    background:#eef2f7;
    display:flex;
    align-items:center;
    justify-content:center;
}

.preview-card{
    background:white;
    padding:20px;
    border-radius:16px;
    box-shadow:0 10px 40px rgba(0,0,0,0.1);
}

.preview-box{
    width:200px;
    height:200px;
    background:#e5e7eb;
    border-radius:12px;
    margin-top:10px;
}

/* CARD */
.card{
    background:white;
    padding:20px;
    border-radius:16px;
    margin-top:15px;
    box-shadow:0 4px 20px rgba(0,0,0,0.05);
}

/* GRID */
.grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:10px;
}

button{
    padding:12px;
    border-radius:10px;
    border:1px solid #d1d5db;
    background:white;
    cursor:pointer;
}

button:hover{
    border-color:#2563eb;
}

button.active{
    background:#2563eb;
    color:white;
}

/* BUTTON */
.btn-primary{
    margin-top:20px;
    padding:12px 20px;
    background:#2563eb;
    color:white;
    border-radius:999px;
    border:none;
}

.btn-ghost{
    background:none;
    border:none;
}

/* FORM */
.form input{
    margin-bottom:10px;
    padding:10px;
    border-radius:8px;
    border:1px solid #ccc;
    width:100%;
}

/* CENTER */
.center{
    display:flex;
    justify-content:center;
    align-items:center;
}

.success-icon{
    font-size:40px;
    color:green;
}

@media(max-width:900px){
    .layout{
        flex-direction:column;
    }
}
`;