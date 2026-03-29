import React, { useState } from 'react';

const CalendlyScheduler = () => {
  // State management
  const [eventName, setEventName] = useState('Product Strategy Call');
  const [guestEmail, setGuestEmail] = useState('');
  const [duration, setDuration] = useState('30');
  const [location, setLocation] = useState('video');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Wed', 'Fri']);
  const [selectedColor, setSelectedColor] = useState('#006bff');
  const [description, setDescription] = useState('Let\'s align on Q3 roadmap and key initiatives.');

  // Available days for selection
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Color options for event branding
  const colorOptions = [
    '#006bff', '#7c3aed', '#ec489a', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'
  ];

  // Toggle day selection
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Format duration display
  const getDurationText = () => {
    return duration === '15' ? '15 min' : duration === '30' ? '30 min' : '60 min';
  };

  // Format location icon and text
  const getLocationInfo = () => {
    switch(location) {
      case 'video': return { icon: '📹', text: 'Google Meet / Video Call' };
      case 'phone': return { icon: '📞', text: 'Phone Call' };
      case 'inperson': return { icon: '🏢', text: 'In-person Meeting' };
      default: return { icon: '🌐', text: 'Virtual Meeting' };
    }
  };

  // Handle scheduling action
  const handleSchedule = () => {
    const eventData = {
      eventName,
      guestEmail,
      duration: getDurationText(),
      location: getLocationInfo().text,
      selectedDays,
      color: selectedColor,
      description
    };
    console.log('Scheduling event:', eventData);
    alert(`✨ Event "${eventName}" scheduled!\nWe'll send a calendar invite to ${guestEmail || 'your guest'}.\nSelected days: ${selectedDays.join(', ')}`);
  };

  const locationInfo = getLocationInfo();

  return (
    <div style={styles.page}>
      {/* Back button (Calendly style) */}
      <button style={styles.backButton}>
        <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Back to events
      </button>

      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          Create event type
        </h1>
        <p style={styles.headerSubtitle}>
          Set up your scheduling link — custom branding, availability, and duration
        </p>
      </div>

      {/* Main Grid Layout */}
      <div style={styles.grid}>
        {/* Left Column: Event Configuration */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <i className="fas fa-calendar-alt"></i> Event details
          </h3>
          
          {/* Event Name */}
          <label style={styles.label}>Event name *</label>
          <input 
            type="text" 
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Product Demo, Client Interview"
            style={styles.input}
          />

          <div style={styles.row}>
            <div>
              <label style={styles.label}>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} style={styles.select}>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} style={styles.select}>
                <option value="video">Video conferencing</option>
                <option value="phone">Phone call</option>
                <option value="inperson">In-person meeting</option>
              </select>
            </div>
          </div>

          {/* Guest Email */}
          <label style={styles.label}>Guest email (optional)</label>
          <input 
            type="email" 
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="guest@company.com"
            style={styles.input}
          />

          {/* Description */}
          <label style={styles.label}>Description / Agenda</label>
          <textarea 
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What will be discussed? Add agenda items..."
            style={styles.textarea}
          />

          {/* Availability Days - Calendly inspired chips */}
          <label style={styles.label}>Availability (weekly)</label>
          <div style={styles.daysContainer}>
            {weekDays.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                  ...styles.dayChip,
                  ...(selectedDays.includes(day) ? styles.dayChipActive : {})
                }}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Color picker for event branding */}
          <label style={styles.label}>Event color</label>
          <div style={styles.colorPalette}>
            {colorOptions.map(color => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  ...styles.colorDot,
                  backgroundColor: color,
                  ...(selectedColor === color ? styles.colorDotActive : {})
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Live Preview Card (Calendly style) */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <i className="fas fa-eye"></i> Preview & share
          </h3>
          
          <div style={styles.previewContainer}>
            <div style={{ ...styles.previewHeader, borderLeftColor: selectedColor }}>
              <div>
                <span style={styles.previewBadge}>SCHEDULING LINK</span>
                <h4 style={styles.previewEventName}>{eventName || "Untitled event"}</h4>
              </div>
              <div style={{ ...styles.previewColorBar, backgroundColor: selectedColor }} />
            </div>

            <div style={styles.previewDetails}>
              <div style={styles.previewRow}>
                <i className="fas fa-clock" style={{ color: selectedColor, width: '24px' }}></i>
                <span>{getDurationText()}</span>
              </div>
              <div style={styles.previewRow}>
                <i className="fas fa-map-marker-alt" style={{ color: selectedColor, width: '24px' }}></i>
                <span>{locationInfo.text}</span>
              </div>
              <div style={styles.previewRow}>
                <i className="fas fa-calendar-week" style={{ color: selectedColor, width: '24px' }}></i>
                <span>Available: {selectedDays.length > 0 ? selectedDays.join(', ') : 'None selected'}</span>
              </div>
              {description && (
                <div style={styles.previewRow}>
                  <i className="fas fa-align-left" style={{ color: selectedColor, width: '24px' }}></i>
                  <span style={styles.previewDescription}>{description.length > 60 ? description.substring(0, 60) + '...' : description}</span>
                </div>
              )}
            </div>

            {/* Mock time slots (Calendly vibe) */}
            <div style={styles.timeSlotContainer}>
              <div style={styles.timeSlotLabel}>
                <i className="fas fa-calendar-check"></i> Suggested times
              </div>
              <div style={styles.timeSlotList}>
                <span style={styles.timeSlot}>Tomorrow, 10:00 AM</span>
                <span style={styles.timeSlot}>Wed, 2:30 PM</span>
                <span style={styles.timeSlot}>Fri, 11:00 AM</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actions}>
            <button style={styles.secondaryButton}>
              Copy link <i className="fas fa-link"></i>
            </button>
            <button onClick={handleSchedule} style={styles.primaryButton}>
              Schedule event <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Footer / trust badge */}
      <div style={styles.footer}>
        <i className="fas fa-shield-alt"></i> Your events are private • Powered by Calendly-like scheduler
      </div>
    </div>
  );
};

// Internal CSS styles (JS object)
const styles = {
  page: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 48px',
    background: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 0',
    transition: 'color 0.2s'
  },
  header: {
    marginBottom: '36px'
  },
  headerTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    letterSpacing: '-0.01em',
    marginBottom: '8px'
  },
  headerSubtitle: {
    color: '#475569',
    fontSize: '1rem',
    borderLeft: '3px solid #006bff',
    paddingLeft: '14px',
    fontWeight: '400'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.6fr 1fr',
    gap: '32px',
    alignItems: 'start'
  },
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '28px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 20px rgba(0,0,0,0.02), 0 2px 6px rgba(0,0,0,0.05)',
    transition: 'all 0.25s ease'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '22px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#0f172a'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#334155',
    display: 'block',
    marginBottom: '6px',
    marginTop: '4px'
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.95rem',
    marginBottom: '20px',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    outline: 'none',
    backgroundColor: '#fff'
  },
  select: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.95rem',
    marginBottom: '20px',
    fontFamily: 'inherit',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1.5px solid #e2e8f0',
    fontSize: '0.95rem',
    marginBottom: '20px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none'
  },
  row: {
    display: 'flex',
    gap: '16px',
    marginBottom: '0'
  },
  daysContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '24px',
    marginTop: '8px'
  },
  dayChip: {
    padding: '8px 18px',
    borderRadius: '40px',
    border: '1px solid #e2e8f0',
    fontSize: '0.85rem',
    fontWeight: '500',
    background: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#1e293b'
  },
  dayChipActive: {
    background: '#006bff',
    color: 'white',
    borderColor: '#006bff',
    boxShadow: '0 4px 8px rgba(0,107,255,0.2)'
  },
  colorPalette: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '8px',
    marginBottom: '8px'
  },
  colorDot: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    border: '2px solid transparent'
  },
  colorDotActive: {
    border: '3px solid #1e293b',
    boxShadow: '0 0 0 2px white, 0 0 0 5px #006bff',
    transform: 'scale(1.02)'
  },
  previewContainer: {
    marginBottom: '24px'
  },
  previewHeader: {
    background: '#fefefe',
    borderRadius: '20px',
    padding: '18px',
    borderLeft: '4px solid #006bff',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  previewBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    color: '#006bff',
    background: '#eef4ff',
    padding: '4px 10px',
    borderRadius: '30px',
    display: 'inline-block',
    marginBottom: '8px'
  },
  previewEventName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: '4px'
  },
  previewColorBar: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    backgroundColor: '#006bff'
  },
  previewDetails: {
    background: '#fafcff',
    borderRadius: '18px',
    padding: '16px',
    border: '1px solid #eef2ff',
    marginBottom: '20px'
  },
  previewRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    fontSize: '0.9rem',
    color: '#1e293b',
    borderBottom: '1px solid #f1f5f9'
  },
  previewDescription: {
    color: '#475569',
    lineHeight: '1.4'
  },
  timeSlotContainer: {
    background: '#f8fafc',
    borderRadius: '18px',
    padding: '14px',
    marginTop: '8px'
  },
  timeSlotLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  timeSlotList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  timeSlot: {
    background: 'white',
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#0f172a',
    border: '1px solid #e2e8f0',
    cursor: 'default'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '24px',
    borderTop: '1px solid #edf2f7',
    paddingTop: '24px'
  },
  primaryButton: {
    background: '#006bff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '40px',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 6px rgba(0,107,255,0.3)'
  },
  secondaryButton: {
    background: 'white',
    color: '#1e293b',
    padding: '12px 20px',
    borderRadius: '40px',
    border: '1px solid #cbd5e1',
    fontWeight: '500',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  footer: {
    marginTop: '48px',
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#94a3b8',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }
};

// Add hover effects via component mount (optional but good)
// To make hover work we need to inject a style tag, but for brevity we use inline interactive states
// For production you can add a <style> tag in the parent component, but this is fully functional.

export default CalendlyScheduler;