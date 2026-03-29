import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiCopy } from 'react-icons/fi';

export default function BookingPage() {

    const [events] = useState([
        {
            title: "30 Minute Meeting",
            duration: "30 min",
            type: "One-on-One",
            time: "Weekdays, 9 am - 5 pm"
        }
    ]);

    return (
        <div className="calendly-layout">

            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="logo">C</div>

                <div className="menu">
                    <div className="menu-item active">Scheduling</div>
                    <div className="menu-item">Meetings</div>
                    <div className="menu-item">Availability</div>
                    <div className="menu-item">Contacts</div>
                </div>
            </div>

            {/* MAIN */}
            <div className="main">

                {/* HEADER */}
                <div className="topbar">
                    <h1>Scheduling</h1>
                    <button className="create-btn">
                        <FiPlus /> Create
                    </button>
                </div>

                {/* TABS */}
                <div className="tabs">
                    <span className="active">Event types</span>
                    <span>Single-use links</span>
                    <span>Meeting polls</span>
                </div>

                {/* SEARCH */}
                <div className="search-box">
                    <FiSearch />
                    <input placeholder="Search event types" />
                </div>

                {/* USER */}
                <div className="user-row">
                    <div className="avatar">G</div>
                    <span>Garima Gupta</span>
                </div>

                {/* EVENT CARD */}
                {events.map((e, i) => (
                    <div key={i} className="event-card">
                        <div className="event-left">
                            <h3>{e.title}</h3>
                            <p>{e.duration} • {e.type}</p>
                            <span>{e.time}</span>
                        </div>

                        <button className="copy-btn">
                            <FiCopy /> Copy link
                        </button>
                    </div>
                ))}
            </div>

            {/* RIGHT PANEL */}
            <div className="right-panel">
                <h3>Get started</h3>

                <div className="panel-card">
                    <h4>Get to know Calendly</h4>
                    <p>1 video</p>
                </div>

                <div className="panel-card">
                    <h4>The perfect scheduling setup</h4>
                    <p>2 tasks</p>
                </div>

                <div className="panel-card">
                    <h4>Automate meeting prep</h4>
                    <p>2 tasks</p>
                </div>

                <button className="hide-btn">Don't show again</button>
            </div>

            {/* CSS */}
            <style>{`
            
            body {
                margin: 0;
            }

            .calendly-layout {
                display: flex;
                height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
                background: #f8fafc;
            }

            /* SIDEBAR */
            .sidebar {
                width: 80px;
                background: white;
                border-right: 1px solid #e5e7eb;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 0;
            }

            .logo {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #006bff;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                margin-bottom: 30px;
            }

            .menu {
                display: flex;
                flex-direction: column;
                gap: 20px;
                font-size: 12px;
                text-align: center;
            }

            .menu-item {
                color: #6b7280;
                cursor: pointer;
            }

            .menu-item.active {
                color: #006bff;
                font-weight: 600;
            }

            /* MAIN */
            .main {
                flex: 1;
                padding: 30px 40px;
            }

            .topbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .topbar h1 {
                font-size: 22px;
                color: #111827;
            }

            .create-btn {
                background: #006bff;
                color: white;
                border: none;
                padding: 10px 16px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                gap: 6px;
                align-items: center;
            }

            /* TABS */
            .tabs {
                display: flex;
                gap: 30px;
                margin-top: 20px;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 10px;
            }

            .tabs span {
                cursor: pointer;
                color: #6b7280;
            }

            .tabs .active {
                color: #006bff;
                border-bottom: 2px solid #006bff;
                padding-bottom: 6px;
            }

            /* SEARCH */
            .search-box {
                margin-top: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                border: 1px solid #e5e7eb;
                padding: 10px;
                border-radius: 8px;
                width: 300px;
                background: white;
            }

            .search-box input {
                border: none;
                outline: none;
                width: 100%;
            }

            /* USER */
            .user-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 20px;
            }

            .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* EVENT CARD */
            .event-card {
                margin-top: 20px;
                background: white;
                border-radius: 12px;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-left: 4px solid #7c3aed;
                box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            }

            .event-left h3 {
                margin: 0;
                font-size: 16px;
            }

            .event-left p {
                margin: 4px 0;
                color: #6b7280;
                font-size: 13px;
            }

            .event-left span {
                font-size: 12px;
                color: #9ca3af;
            }

            .copy-btn {
                border: 1px solid #e5e7eb;
                background: white;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
            }

            /* RIGHT PANEL */
            .right-panel {
                width: 300px;
                background: white;
                border-left: 1px solid #e5e7eb;
                padding: 20px;
            }

            .right-panel h3 {
                margin-bottom: 20px;
            }

            .panel-card {
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 14px;
                margin-bottom: 14px;
            }

            .panel-card h4 {
                margin: 0;
                font-size: 14px;
            }

            .panel-card p {
                font-size: 12px;
                color: #6b7280;
            }

            .hide-btn {
                margin-top: 20px;
                width: 100%;
                padding: 10px;
                border-radius: 20px;
                border: 1px solid #e5e7eb;
                background: white;
                cursor: pointer;
            }

            `}</style>
        </div>
    );
}