// src/pages/Routing.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiRepeat, FiPlus, FiEdit2, FiTrash2, FiChevronLeft,
    FiUsers, FiClock, FiCalendar, FiMail, FiUserCheck,
    FiActivity, FiPieChart, FiSettings, FiCopy, FiMoreVertical
} from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Routing() {
    const navigate = useNavigate();
    const [routingRules, setRoutingRules] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        loadRoutingRules();
    }, []);

    const loadRoutingRules = async () => {
        // Mock data
        const mockRules = [
            {
                id: 1,
                name: 'Sales Team Routing',
                description: 'Route leads to available sales reps',
                condition: 'Round Robin',
                targets: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'],
                active: true,
                priority: 1,
                meetingsRouted: 147
            },
            {
                id: 2,
                name: 'Support Queue',
                description: 'Assign support tickets to support team',
                condition: 'Load Balancing',
                targets: ['Alex Thompson', 'Maria Garcia'],
                active: true,
                priority: 2,
                meetingsRouted: 89
            },
            {
                id: 3,
                name: 'Enterprise Accounts',
                description: 'Route enterprise leads to senior team',
                condition: 'Round Robin',
                targets: ['David Wilson', 'Jennifer Lee'],
                active: false,
                priority: 1,
                meetingsRouted: 32
            }
        ];
        setRoutingRules(mockRules);
    };

    const deleteRule = (id) => {
        if (window.confirm('Are you sure you want to delete this routing rule?')) {
            setRoutingRules(routingRules.filter(r => r.id !== id));
            showToast('Routing rule deleted', 'success');
        }
    };

    const toggleRuleStatus = (id) => {
        setRoutingRules(routingRules.map(r => 
            r.id === id ? { ...r, active: !r.active } : r
        ));
        showToast('Rule status updated', 'success');
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: '#f8fafc',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        header: {
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
        },
        backButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '8px'
        },
        headerTitle: {
            flex: 1
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '4px'
        },
        subtitle: {
            color: '#64748b',
            fontSize: '14px'
        },
        createButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #006bff, #3b82f6)',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer'
        },
        content: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '32px'
        },
        statCard: {
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            border: '1px solid #e2e8f0'
        },
        routingGrid: {
            display: 'grid',
            gap: '16px'
        },
        routingCard: {
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease'
        },
        routingHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
        },
        routingTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '4px'
        },
        routingDescription: {
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '16px'
        },
        routingDetails: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px'
        },
        detailItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#475569'
        },
        targetsList: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px'
        },
        targetBadge: {
            padding: '6px 12px',
            background: '#eef4ff',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#006bff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        },
        routingFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        routingStats: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        routingActions: {
            display: 'flex',
            gap: '8px'
        },
        iconButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#64748b'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
                    <FiChevronLeft /> Back to Dashboard
                </button>
                <div style={styles.headerTitle}>
                    <h1 style={styles.title}>Routing</h1>
                    <p style={styles.subtitle}>Intelligently route meetings to the right people</p>
                </div>
                <button style={styles.createButton} onClick={() => setShowCreateModal(true)}>
                    <FiPlus /> Create Routing Rule
                </button>
            </div>

            <div style={styles.content}>
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {routingRules.filter(r => r.active).length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Active Rules</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {routingRules.reduce((sum, r) => sum + r.meetingsRouted, 0)}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Meetings Routed</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {routingRules.length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Total Rules</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {routingRules.filter(r => r.condition === 'Round Robin').length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Round Robin Rules</div>
                    </div>
                </div>

                <div style={styles.routingGrid}>
                    {routingRules.map(rule => (
                        <div key={rule.id} style={styles.routingCard}>
                            <div style={styles.routingHeader}>
                                <div>
                                    <div style={styles.routingTitle}>{rule.name}</div>
                                    <div style={styles.routingDescription}>{rule.description}</div>
                                </div>
                                <div style={{
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    background: rule.active ? '#d1fae5' : '#fee2e2',
                                    color: rule.active ? '#059669' : '#dc2626'
                                }}>
                                    {rule.active ? 'Active' : 'Inactive'}
                                </div>
                            </div>

                            <div style={styles.routingDetails}>
                                <div style={styles.detailItem}>
                                    <FiRepeat /> Condition: {rule.condition}
                                </div>
                                <div style={styles.detailItem}>
                                    <FiActivity /> Priority: {rule.priority}
                                </div>
                                <div style={styles.detailItem}>
                                    <FiCalendar /> {rule.meetingsRouted} meetings routed
                                </div>
                            </div>

                            <div style={styles.targetsList}>
                                {rule.targets.map((target, idx) => (
                                    <span key={idx} style={styles.targetBadge}>
                                        <FiUserCheck size={12} /> {target}
                                    </span>
                                ))}
                            </div>

                            <div style={styles.routingFooter}>
                                <div style={styles.routingStats}>
                                    Last updated: Today
                                </div>
                                <div style={styles.routingActions}>
                                    <button style={styles.iconButton} onClick={() => toggleRuleStatus(rule.id)}>
                                        {rule.active ? 'Pause' : 'Activate'}
                                    </button>
                                    <button style={styles.iconButton} onClick={() => deleteRule(rule.id)}>
                                        <FiTrash2 /> Delete
                                    </button>
                                    <button style={styles.iconButton}>
                                        <FiPieChart /> Analytics
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}