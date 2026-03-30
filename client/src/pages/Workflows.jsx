// src/pages/Workflows.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiRepeat, FiPlus, FiPlay, FiPause, FiEdit2, FiTrash2,
    FiMail, FiMessageSquare, FiCalendar, FiZap, FiSettings,
    FiChevronLeft, FiClock, FiUsers, FiCheckCircle, FiAlertCircle,
    FiMoreVertical, FiCopy, FiBarChart2
} from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Workflows() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [workflows, setWorkflows] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);

    useEffect(() => {
        loadWorkflows();
    }, []);

    const loadWorkflows = async () => {
        // Mock data
        const mockWorkflows = [
            {
                id: 1,
                name: 'New Lead Follow-up',
                description: 'Automatically send follow-up email after first meeting',
                status: 'active',
                trigger: 'After meeting ends',
                actions: ['Send email', 'Add to CRM'],
                lastRun: '2024-03-18',
                runs: 47,
                icon: '⚡'
            },
            {
                id: 2,
                name: 'Meeting Reminders',
                description: 'Send reminders 24h and 1h before meetings',
                status: 'active',
                trigger: 'Before meeting',
                actions: ['Send email', 'Send SMS'],
                lastRun: '2024-03-18',
                runs: 128,
                icon: '⏰'
            },
            {
                id: 3,
                name: 'Post-Meeting Survey',
                description: 'Send feedback survey after meeting completion',
                status: 'paused',
                trigger: 'After meeting',
                actions: ['Send survey'],
                lastRun: '2024-03-15',
                runs: 32,
                icon: '📊'
            }
        ];
        setWorkflows(mockWorkflows);
    };

    const toggleWorkflowStatus = (id) => {
        setWorkflows(workflows.map(w => 
            w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
        ));
        showToast('Workflow status updated', 'success');
    };

    const deleteWorkflow = (id) => {
        if (window.confirm('Are you sure you want to delete this workflow?')) {
            setWorkflows(workflows.filter(w => w.id !== id));
            showToast('Workflow deleted', 'success');
        }
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px'
        },
        statCard: {
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            border: '1px solid #e2e8f0'
        },
        workflowsGrid: {
            display: 'grid',
            gap: '16px'
        },
        workflowCard: {
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease'
        },
        workflowHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
        },
        workflowIcon: {
            fontSize: '32px'
        },
        workflowStatus: {
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500'
        },
        workflowName: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '8px'
        },
        workflowDescription: {
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '16px'
        },
        workflowDetails: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #e2e8f0'
        },
        detailBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#475569',
            background: '#f8fafc',
            padding: '6px 12px',
            borderRadius: '20px'
        },
        actionsList: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
        },
        actionTag: {
            padding: '4px 12px',
            background: '#eef4ff',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#006bff'
        },
        workflowFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        workflowStats: {
            fontSize: '12px',
            color: '#94a3b8'
        },
        workflowActions: {
            display: 'flex',
            gap: '8px'
        },
        iconButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: '#64748b'
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
                    <FiChevronLeft /> Back to Dashboard
                </button>
                <div style={styles.headerTitle}>
                    <h1 style={styles.title}>Workflows</h1>
                    <p style={styles.subtitle}>Automate your scheduling processes</p>
                </div>
                <button style={styles.createButton} onClick={() => setShowCreateModal(true)}>
                    <FiPlus /> Create Workflow
                </button>
            </div>

            <div style={styles.content}>
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {workflows.filter(w => w.status === 'active').length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Active Workflows</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {workflows.reduce((sum, w) => sum + w.runs, 0)}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Total Runs</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {workflows.length}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '13px' }}>Total Workflows</div>
                    </div>
                </div>

                <div style={styles.workflowsGrid}>
                    {workflows.map(workflow => (
                        <div key={workflow.id} style={styles.workflowCard}>
                            <div style={styles.workflowHeader}>
                                <div style={styles.workflowIcon}>{workflow.icon}</div>
                                <div style={{
                                    ...styles.workflowStatus,
                                    background: workflow.status === 'active' ? '#d1fae5' : '#fee2e2',
                                    color: workflow.status === 'active' ? '#059669' : '#dc2626'
                                }}>
                                    {workflow.status === 'active' ? 'Active' : 'Paused'}
                                </div>
                            </div>
                            
                            <div style={styles.workflowName}>{workflow.name}</div>
                            <div style={styles.workflowDescription}>{workflow.description}</div>
                            
                            <div style={styles.workflowDetails}>
                                <div style={styles.detailBadge}>
                                    <FiZap size={12} /> Trigger: {workflow.trigger}
                                </div>
                                <div style={styles.detailBadge}>
                                    <FiClock size={12} /> Last run: {workflow.lastRun}
                                </div>
                            </div>

                            <div style={styles.actionsList}>
                                {workflow.actions.map((action, idx) => (
                                    <span key={idx} style={styles.actionTag}>{action}</span>
                                ))}
                            </div>

                            <div style={styles.workflowFooter}>
                                <div style={styles.workflowStats}>
                                    {workflow.runs} total executions
                                </div>
                                <div style={styles.workflowActions}>
                                    <button style={styles.iconButton} onClick={() => toggleWorkflowStatus(workflow.id)}>
                                        {workflow.status === 'active' ? <FiPause /> : <FiPlay />}
                                        {workflow.status === 'active' ? 'Pause' : 'Activate'}
                                    </button>
                                    <button style={styles.iconButton} onClick={() => deleteWorkflow(workflow.id)}>
                                        <FiTrash2 /> Delete
                                    </button>
                                    <button style={styles.iconButton}>
                                        <FiBarChart2 /> Analytics
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