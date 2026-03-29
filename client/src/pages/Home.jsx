import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiUsers, FiArrowRight, FiCheck, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi';

export default function Home() {
  const styles = {
    // Hero Section with Split Layout
    hero: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(40px, 5vw, 80px) 20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    },

    heroContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(40px, 8vw, 80px)',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
      padding: '0 20px'
    },

    // Left Side - Text Content
    leftContent: {
      textAlign: 'left'
    },

    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e4ff 100%)',
      color: '#006bff',
      padding: '8px 20px',
      borderRadius: '100px',
      fontSize: 'clamp(12px, 3vw, 14px)',
      fontWeight: 600,
      marginBottom: 'clamp(20px, 5vw, 32px)',
      letterSpacing: '0.5px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0, 107, 255, 0.1)'
    },

    heroTitle: {
      fontSize: 'clamp(40px, 6vw, 64px)',
      fontWeight: 800,
      color: '#0b3558',
      marginBottom: 'clamp(16px, 4vw, 24px)',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #0b3558 0%, #1e4a76 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    heroSub: {
      fontSize: 'clamp(16px, 4vw, 18px)',
      color: '#4b5563',
      marginBottom: 'clamp(24px, 6vw, 40px)',
      maxWidth: '90%',
      lineHeight: 1.6
    },

    heroActions: {
      display: 'flex',
      gap: 'clamp(12px, 3vw, 20px)',
      marginBottom: 'clamp(32px, 6vw, 48px)',
      flexWrap: 'wrap'
    },

    btnPrimary: {
      background: 'linear-gradient(135deg, #006bff 0%, #0052cc 100%)',
      color: 'white',
      padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 40px)',
      borderRadius: '12px',
      border: 'none',
      fontWeight: 600,
      fontSize: 'clamp(14px, 4vw, 16px)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      boxShadow: '0 4px 15px rgba(0, 107, 255, 0.3)'
    },

    btnOutline: {
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#374151',
      padding: 'clamp(12px, 4vw, 16px) clamp(24px, 6vw, 40px)',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      fontWeight: 600,
      fontSize: 'clamp(14px, 4vw, 16px)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      backdropFilter: 'blur(10px)'
    },

    heroStats: {
      display: 'flex',
      gap: 'clamp(20px, 5vw, 40px)',
      paddingTop: 'clamp(24px, 5vw, 32px)',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      flexWrap: 'wrap'
    },

    heroStat: {
      textAlign: 'left'
    },

    heroStatStrong: {
      display: 'block',
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: 800,
      color: '#006bff',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #006bff 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },

    heroStatSpan: {
      fontSize: 'clamp(12px, 3vw, 14px)',
      color: '#6b7280',
      fontWeight: 500
    },

    statDivider: {
      width: '1px',
      height: 'clamp(40px, 8vw, 60px)',
      background: 'linear-gradient(180deg, transparent, #e5e7eb, transparent)'
    },

    // Right Side - Calendar with Gradients
    rightContent: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    gradientContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    outerGlow: {
      position: 'absolute',
      width: 'clamp(300px, 40vw, 500px)',
      height: 'clamp(300px, 40vw, 500px)',
      background: 'radial-gradient(circle, rgba(0, 107, 255, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite'
    },

    innerGlow: {
      position: 'absolute',
      width: 'clamp(320px, 42vw, 520px)',
      height: 'clamp(320px, 42vw, 520px)',
      background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(0, 107, 255, 0.3) 50%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(50px)',
      animation: 'pulseReverse 5s ease-in-out infinite'
    },

    calendarCard: {
      position: 'relative',
      zIndex: 10,
      background: 'white',
      borderRadius: '32px',
      padding: 'clamp(20px, 4vw, 32px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
      transform: 'rotate(2deg)',
      transition: 'transform 0.3s ease',
      width: '100%',
      maxWidth: '450px'
    },

    calendarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e5e7eb'
    },

    calendarMonth: {
      fontSize: 'clamp(16px, 4vw, 18px)',
      fontWeight: 600,
      color: '#0b3558'
    },

    calendarNav: {
      display: 'flex',
      gap: '16px',
      color: '#9ca3af'
    },

    calendarWeekdays: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px',
      marginBottom: '16px'
    },

    weekday: {
      textAlign: 'center',
      fontSize: 'clamp(11px, 2.5vw, 13px)',
      fontWeight: 500,
      color: '#6b7280',
      padding: '8px 0'
    },

    calendarDays: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px',
      marginBottom: '20px'
    },

    day: {
      textAlign: 'center',
      padding: 'clamp(8px, 2vw, 12px)',
      fontSize: 'clamp(12px, 3vw, 14px)',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#374151'
    },

    today: {
      background: 'linear-gradient(135deg, #006bff, #3b82f6)',
      color: 'white'
    },

    selected: {
      background: '#006bff',
      color: 'white',
      boxShadow: '0 4px 10px rgba(0, 107, 255, 0.3)'
    },

    timeSlots: {
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    },

    timeSlotsTitle: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '12px'
    },

    slotsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px'
    },

    slot: {
      padding: '8px',
      textAlign: 'center',
      fontSize: '12px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: 'white',
      color: '#006bff'
    },

    // Features Section - Centered
    featuresSection: {
      padding: 'clamp(60px, 10vw, 100px) 20px',
      background: 'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)',
      textAlign: 'center'
    },

    sectionLabel: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: 'clamp(12px, 3vw, 13px)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      color: '#006bff',
      background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e4ff 100%)',
      padding: '8px 20px',
      borderRadius: '100px',
      marginBottom: 'clamp(16px, 4vw, 24px)',
      display: 'inline-flex',
      justifyContent: 'center'
    },

    featuresTitle: {
      fontSize: 'clamp(28px, 6vw, 48px)',
      fontWeight: 800,
      color: '#0b3558',
      marginBottom: 'clamp(32px, 6vw, 56px)',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      textAlign: 'center'
    },

    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
      gap: 'clamp(24px, 4vw, 40px)',
      maxWidth: 'min(1400px, 95%)',
      margin: '0 auto',
      padding: '0 20px'
    },

    featureCard: {
      textAlign: 'center',
      padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 32px)',
      background: 'white',
      borderRadius: '24px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(0, 107, 255, 0.1)'
    },

    featureIcon: {
      width: 'clamp(70px, 12vw, 80px)',
      height: 'clamp(70px, 12vw, 80px)',
      background: 'linear-gradient(135deg, #e8f0ff 0%, #d4e4ff 100%)',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      fontSize: 'clamp(32px, 6vw, 40px)',
      color: '#006bff'
    },

    featureCardTitle: {
      fontSize: 'clamp(20px, 4vw, 24px)',
      fontWeight: 700,
      color: '#0b3558',
      marginBottom: '12px'
    },

    featureCardDesc: {
      fontSize: 'clamp(14px, 3vw, 16px)',
      color: '#6b7280',
      lineHeight: 1.6
    },

    // How It Works Section - Centered
    howSection: {
      padding: 'clamp(60px, 10vw, 100px) 20px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      textAlign: 'center'
    },

    howTitle: {
      fontSize: 'clamp(28px, 6vw, 48px)',
      fontWeight: 800,
      color: '#0b3558',
      marginBottom: 'clamp(32px, 6vw, 56px)',
      letterSpacing: '-0.02em',
      textAlign: 'center'
    },

    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
      gap: 'clamp(24px, 4vw, 40px)',
      maxWidth: 'min(1200px, 95%)',
      margin: '0 auto',
      padding: '0 20px'
    },

    stepCard: {
      textAlign: 'center',
      padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 32px)',
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    },

    stepNumber: {
      width: 'clamp(60px, 10vw, 70px)',
      height: 'clamp(60px, 10vw, 70px)',
      background: 'linear-gradient(135deg, #006bff 0%, #3b82f6 100%)',
      color: 'white',
      fontSize: 'clamp(28px, 6vw, 32px)',
      fontWeight: 800,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 8px 20px rgba(0, 107, 255, 0.3)'
    },

    stepCardTitle: {
      fontSize: 'clamp(20px, 4vw, 24px)',
      fontWeight: 700,
      color: '#0b3558',
      marginBottom: '12px'
    },

    stepCardDesc: {
      fontSize: 'clamp(14px, 3vw, 16px)',
      color: '#6b7280',
      lineHeight: 1.6
    },

    // CTA Section - Centered
    ctaSection: {
      position: 'relative',
      padding: 'clamp(60px, 10vw, 100px) 20px',
      background: 'linear-gradient(135deg, #0b3558 0%, #1a4d7a 50%, #2b5f8a 100%)',
      textAlign: 'center',
      overflow: 'hidden'
    },

    ctaGlow: {
      position: 'absolute',
      width: 'clamp(400px, 60vw, 700px)',
      height: 'clamp(400px, 60vw, 700px)',
      background: 'radial-gradient(circle, rgba(0, 107, 255, 0.4) 0%, transparent 70%)',
      borderRadius: '50%',
      top: '-200px',
      right: '-200px',
      pointerEvents: 'none',
      animation: 'pulse 4s ease-in-out infinite'
    },

    ctaContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 'min(800px, 95%)',
      margin: '0 auto'
    },

    ctaTitle: {
      fontSize: 'clamp(28px, 6vw, 48px)',
      fontWeight: 800,
      color: 'white',
      marginBottom: '16px',
      letterSpacing: '-0.02em',
      textAlign: 'center'
    },

    ctaDesc: {
      fontSize: 'clamp(16px, 4vw, 18px)',
      color: 'rgba(255, 255, 255, 0.95)',
      marginBottom: 'clamp(32px, 6vw, 48px)',
      lineHeight: 1.6,
      textAlign: 'center'
    },

    ctaChecklist: {
      display: 'flex',
      justifyContent: 'center',
      gap: 'clamp(20px, 5vw, 40px)',
      marginBottom: 'clamp(32px, 6vw, 48px)',
      flexWrap: 'wrap'
    },

    ctaChecklistItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'white',
      fontSize: 'clamp(13px, 3vw, 15px)',
      fontWeight: 500,
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '100px',
      backdropFilter: 'blur(10px)'
    },

    ctaButton: {
      background: 'white',
      color: '#006bff',
      padding: 'clamp(14px, 4vw, 18px) clamp(32px, 8vw, 48px)',
      borderRadius: '12px',
      border: 'none',
      fontSize: 'clamp(15px, 4vw, 18px)',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
    },

    '@media (max-width: 968px)': {
      heroContainer: {
        gridTemplateColumns: '1fr',
        gap: '48px',
        textAlign: 'center'
      },
      leftContent: {
        textAlign: 'center'
      },
      heroSub: {
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      heroActions: {
        justifyContent: 'center'
      },
      heroStats: {
        justifyContent: 'center'
      },
      heroStat: {
        textAlign: 'center'
      },
      calendarCard: {
        margin: '0 auto'
      }
    }
  };

  const animationStyles = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    @keyframes pulseReverse {
      0%, 100% { transform: scale(1.1); opacity: 0.5; }
      50% { transform: scale(1); opacity: 0.7; }
    }
  `;

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const timeSlots = ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'];

  return (
    <div>
      <style>{animationStyles}</style>
      
      {/* Hero Section with Split Layout */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          {/* Left Side - Text Content */}
          <div style={styles.leftContent}>
            <div style={styles.heroBadge}>
              <FiZap size={14} /> Scheduling Made Simple
            </div>
            <h1 style={styles.heroTitle}>
              Say goodbye to<br />back-and-forth emails
            </h1>
            <p style={styles.heroSub}>
              Share your availability and let others book time with you instantly.
              No more email ping-pong, no more timezone confusion.
            </p>
            <div style={styles.heroActions}>
              <Link 
                to="/register" 
                style={styles.btnPrimary}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 107, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 107, 255, 0.3)';
                }}
              >
                Get Started Free <FiArrowRight />
              </Link>
              <Link 
                to="/login" 
                style={styles.btnOutline}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#006bff';
                  e.target.style.color = '#006bff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.color = '#374151';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Log In
              </Link>
            </div>
            <div style={styles.heroStats}>
              <div style={styles.heroStat}>
                <strong style={styles.heroStatStrong}>10K+</strong>
                <span style={styles.heroStatSpan}>Meetings booked</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.heroStat}>
                <strong style={styles.heroStatStrong}>98%</strong>
                <span style={styles.heroStatSpan}>Satisfaction rate</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.heroStat}>
                <strong style={styles.heroStatStrong}>5 min</strong>
                <span style={styles.heroStatSpan}>Setup time</span>
              </div>
            </div>
          </div>

          {/* Right Side - Calendar with Gradients */}
          <div style={styles.rightContent}>
            <div style={styles.gradientContainer}>
              <div style={styles.outerGlow}></div>
              <div style={styles.innerGlow}></div>
              
              <div 
                style={styles.calendarCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(2deg) scale(1)';
                }}
              >
                <div style={styles.calendarHeader}>
                  <div style={styles.calendarMonth}>March 2024</div>
                  <div style={styles.calendarNav}>
                    <span>←</span>
                    <span>→</span>
                  </div>
                </div>
                
                <div style={styles.calendarWeekdays}>
                  {days.map((day, i) => (
                    <div key={i} style={styles.weekday}>{day}</div>
                  ))}
                </div>
                
                <div style={styles.calendarDays}>
                  {dates.slice(0, 35).map((date, i) => (
                    <div 
                      key={i} 
                      style={{
                        ...styles.day,
                        ...(date === 15 && styles.today),
                        ...(date === 22 && styles.selected)
                      }}
                      onMouseEnter={(e) => {
                        if (date !== 15 && date !== 22) {
                          e.target.style.background = '#f3f4f6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (date !== 15 && date !== 22) {
                          e.target.style.background = 'transparent';
                        }
                      }}
                    >
                      {date}
                    </div>
                  ))}
                </div>
                
                <div style={styles.timeSlots}>
                  <div style={styles.timeSlotsTitle}>Popular time slots</div>
                  <div style={styles.slotsGrid}>
                    {timeSlots.map((slot, i) => (
                      <div 
                        key={i} 
                        style={styles.slot}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#006bff';
                          e.target.style.color = 'white';
                          e.target.style.borderColor = '#006bff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#006bff';
                          e.target.style.borderColor = '#e5e7eb';
                        }}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Centered */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionLabel}>
          <FiStar size={14} /> Features
        </div>
        <h2 style={styles.featuresTitle}>Everything you need to schedule smarter</h2>
        <div style={styles.featuresGrid}>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#006bff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 107, 255, 0.1)';
            }}
          >
            <div style={styles.featureIcon}>
              <FiCalendar />
            </div>
            <h3 style={styles.featureCardTitle}>Custom Event Types</h3>
            <p style={styles.featureCardDesc}>Create different meeting types with custom durations, descriptions, and availability settings for every scenario.</p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#006bff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 107, 255, 0.1)';
            }}
          >
            <div style={styles.featureIcon}>
              <FiClock />
            </div>
            <h3 style={styles.featureCardTitle}>Smart Availability</h3>
            <p style={styles.featureCardDesc}>Set your available days and hours. The system automatically shows only open slots to your guests — no double bookings.</p>
          </div>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#006bff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0, 107, 255, 0.1)';
            }}
          >
            <div style={styles.featureIcon}>
              <FiUsers />
            </div>
            <h3 style={styles.featureCardTitle}>Shareable Booking Page</h3>
            <p style={styles.featureCardDesc}>Get a personal booking link. Share it anywhere — email, social media, website — and let people book instantly.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section - Centered */}
      <section style={styles.howSection}>
        <div style={styles.sectionLabel}>
          <FiTrendingUp size={14} /> How It Works
        </div>
        <h2 style={styles.howTitle}>Three simple steps</h2>
        <div style={styles.stepsGrid}>
          <div 
            style={styles.stepCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepCardTitle}>Create an Event Type</h3>
            <p style={styles.stepCardDesc}>Set your meeting title, duration, and availability window. Customize it however you like.</p>
          </div>
          <div 
            style={styles.stepCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepCardTitle}>Share Your Link</h3>
            <p style={styles.stepCardDesc}>Copy your personal booking page URL and send it to clients, colleagues, or friends.</p>
          </div>
          <div 
            style={styles.stepCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepCardTitle}>Get Booked</h3>
            <p style={styles.stepCardDesc}>Guests pick a time that works for them. You get a confirmed booking — no emails needed.</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Centered */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaGlow}></div>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to simplify your scheduling?</h2>
          <p style={styles.ctaDesc}>Join thousands who've already ditched the email back-and-forth.</p>
          <div style={styles.ctaChecklist}>
            <span style={styles.ctaChecklistItem}><FiCheck size={16} /> Free to get started</span>
            <span style={styles.ctaChecklistItem}><FiCheck size={16} /> No credit card required</span>
            <span style={styles.ctaChecklistItem}><FiCheck size={16} /> Set up in under 5 minutes</span>
          </div>
          <Link 
            to="/register" 
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
          >
            Create Your Free Account <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}