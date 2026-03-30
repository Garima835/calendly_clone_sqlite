// src/pages/Integrations.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiGrid, FiPlus, FiCheck, FiX, FiChevronLeft, 
    FiExternalLink, FiSettings, FiRefreshCw, FiAlertCircle
} from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Integrations() {
    const navigate = useNavigate();
    const [integrations, setIntegrations] = useState([
        {
            id: 1,
            name: 'Google Calendar',
            description: 'Sync meetings with Google Calendar',
            icon: '📅',
            category: 'calendar',
            connected: true,
            popular: true
        },
        {
            id: 2,
            name: 'Zoom',
            description: 'Generate Zoom meeting links automatically',
            icon: '🎥',
            category: 'video',
            connected: true,
            popular: true
        },
        {
            id: 3,
            name: 'Microsoft Teams',
            description: 'Create Teams meetings for your events',
            icon: '💬',
            category: 'video',
            connected: false,
            popular: true
        },
        {
            id: 4,
            name: 'Slack',
            description: 'Get notifications in Slack channels',
            icon: '💬',
            category: 'communication',
            connected: false,
            popular: true
        },
        {
            id: 5,
            name: 'HubSpot',
            description: 'Sync contacts and meetings with HubSpot',
            icon: '📊',
            category: 'crm',
            connected: false,
            popular: false
        },
        {
            id: 6,
            name: 'Salesforce',
            description: 'Log meetings directly to Salesforce',
            icon: '☁️',
            category: 'crm',
            connected: false,
            popular: true
        },
        {
            id: 7,
            name: 'Zapier',
            description: 'Connect with 5000+ apps',
            icon: '⚡',
            category: 'automation',
            connected: false,
            popular: true
        },
        {
            id: 8,
            name: 'Mailchimp',
            description: 'Sync contacts with Mailchimp lists',
            icon: '📧',
            category: 'marketing',
            connected: false,
            popular: false
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'calendar', name: 'Calendar' },
        { id: 'video', name: 'Video Conferencing' },
        { id: 'crm', name: 'CRM' },
        { id: 'communication', name: 'Communication' },
        { id: 'automation', name: 'Automation' },
        { id: 'marketing', name: 'Marketing' }
    ];

    const toggleIntegration = (id) => {
        setIntegrations(integrations.map(integration => 
            integration.id === id 
                ? { ...integration, connected: !integration.connected }
                : integration
        ));
        const integration = integrations.find(i => i.id === id);
        showToast(
            `${integration.name} ${!integration.connected ? 'connected' : 'disconnected'} successfully`,
            !integration.connected ? 'success' : 'info'
        );
    };

    const filteredIntegrations = selectedCategory === 'all' 
        ? integrations 
        : integrations.filter(i => i.category === selectedCategory);

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
        content: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px'
        },
        categories: {
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '16px'
        },
        categoryButton: {
            padding: '8px 20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            color: '#64748b',
            borderRadius: '20px',
            transition: 'all 0.2s'
        },
        integrationsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
        },
        integrationCard: {
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        integrationHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
        },
        integrationIcon: {
            fontSize: '48px'
        },
        integrationInfo: {
            flex: 1
        },
        integrationName: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        popularBadge: {
            fontSize: '10px',
            padding: '2px 8px',
            background: '#fef3c7',
            color: '#d97706',
            borderRadius: '12px'
        },
        integrationDescription: {
            fontSize: '13px',
            color: '#64748b'
        },
        connectButton: {
            width: '100%',
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            background: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
                    <FiChevronLeft /> Back to Dashboard
                </button>
                <div style={styles.headerTitle}>
                    <h1 style={styles.title}>Integrations & Apps</h1>
                    <p style={styles.subtitle}>Connect your favorite tools and automate your workflow</p>
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.categories}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            style={{
                                ...styles.categoryButton,
                                ...(selectedCategory === cat.id && {
                                    background: '#006bff',
                                    color: 'white'
                                })
                            }}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div style={styles.integrationsGrid}>
                    {filteredIntegrations.map(integration => (
                        <div key={integration.id} style={styles.integrationCard}>
                            <div style={styles.integrationHeader}>
                                <div style={styles.integrationIcon}>{integration.icon}</div>
                                <div style={styles.integrationInfo}>
                                    <div style={styles.integrationName}>
                                        {integration.name}
                                        {integration.popular && (
                                            <span style={styles.popularBadge}>Popular</span>
                                        )}
                                    </div>
                                    <div style={styles.integrationDescription}>
                                        {integration.description}
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                style={{
                                    ...styles.connectButton,
                                    ...(integration.connected && {
                                        background: '#10b981',
                                        color: 'white',
                                        borderColor: '#10b981'
                                    })
                                }}
                                onClick={() => toggleIntegration(integration.id)}
                            >
                                {integration.connected ? (
                                    <>
                                        <FiCheck /> Connected
                                    </>
                                ) : (
                                    <>
                                        <FiPlus /> Connect
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}