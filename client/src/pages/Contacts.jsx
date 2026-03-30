// src/pages/Contacts.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiUsers, FiPlus, FiSearch, FiMail, FiPhone, FiCalendar, 
    FiStar, FiMoreVertical, FiEdit2, FiTrash2, FiDownload,
    FiUpload, FiFilter, FiX, FiChevronLeft, FiCheckCircle,
    FiClock, FiMessageSquare, FiTag, FiUserPlus
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { showToast } from '../utils/toast';

export default function Contacts() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            setLoading(true);
            // Simulate API call - replace with actual API
            const mockContacts = [
                {
                    id: 1,
                    name: 'Sarah Johnson',
                    email: 'sarah.johnson@techcorp.com',
                    phone: '+1 (555) 123-4567',
                    company: 'TechCorp',
                    meetings: 12,
                    lastMeeting: '2024-03-15',
                    tags: ['client', 'important'],
                    avatar: 'SJ',
                    color: '#006bff'
                },
                {
                    id: 2,
                    name: 'Michael Chen',
                    email: 'michael.chen@startup.io',
                    phone: '+1 (555) 987-6543',
                    company: 'Startup.io',
                    meetings: 8,
                    lastMeeting: '2024-03-10',
                    tags: ['lead'],
                    avatar: 'MC',
                    color: '#7c3aed'
                },
                {
                    id: 3,
                    name: 'Emily Rodriguez',
                    email: 'emily.r@designlab.com',
                    phone: '+1 (555) 456-7890',
                    company: 'DesignLab',
                    meetings: 24,
                    lastMeeting: '2024-03-18',
                    tags: ['client', 'vip'],
                    avatar: 'ER',
                    color: '#ec489a'
                }
            ];
            setContacts(mockContacts);
        } catch (error) {
            console.error('Error loading contacts:', error);
            showToast('Failed to load contacts', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async () => {
        if (!formData.name || !formData.email) {
            showToast('Name and email are required', 'error');
            return;
        }

        try {
            const newContact = {
                id: Date.now(),
                ...formData,
                meetings: 0,
                lastMeeting: null,
                avatar: formData.name.split(' ').map(n => n[0]).join(''),
                color: '#006bff'
            };
            setContacts([newContact, ...contacts]);
            showToast('Contact added successfully', 'success');
            setShowAddModal(false);
            resetForm();
        } catch (error) {
            showToast('Failed to add contact', 'error');
        }
    };

    const handleUpdateContact = async () => {
        try {
            const updatedContacts = contacts.map(c => 
                c.id === editingContact.id ? { ...c, ...formData } : c
            );
            setContacts(updatedContacts);
            showToast('Contact updated successfully', 'success');
            setEditingContact(null);
            resetForm();
        } catch (error) {
            showToast('Failed to update contact', 'error');
        }
    };

    const handleDeleteContact = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;
        try {
            setContacts(contacts.filter(c => c.id !== id));
            showToast('Contact deleted', 'success');
        } catch (error) {
            showToast('Failed to delete contact', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            notes: '',
            tags: []
        });
        setTagInput('');
    };

    const addTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput]
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterType === 'all') return matchesSearch;
        if (filterType === 'recent') return matchesSearch && contact.lastMeeting;
        if (filterType === 'frequent') return matchesSearch && contact.meetings > 10;
        return matchesSearch;
    });

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
        addButton: {
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
        searchBar: {
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap'
        },
        searchInput: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 16px',
            gap: '8px'
        },
        filterButtons: {
            display: 'flex',
            gap: '8px'
        },
        filterButton: {
            padding: '10px 20px',
            border: '1px solid #e2e8f0',
            background: 'white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
        },
        contactsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
        },
        contactCard: {
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s ease'
        },
        contactHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
        },
        avatar: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '600',
            color: 'white'
        },
        contactInfo: {
            flex: 1
        },
        contactName: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '4px'
        },
        contactEmail: {
            fontSize: '13px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        },
        contactDetails: {
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0'
        },
        detailRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
            fontSize: '13px',
            color: '#475569'
        },
        tags: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '12px'
        },
        tag: {
            padding: '4px 10px',
            background: '#f1f5f9',
            borderRadius: '12px',
            fontSize: '11px',
            color: '#475569'
        },
        contactActions: {
            display: 'flex',
            gap: '8px',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #e2e8f0'
        },
        actionButton: {
            flex: 1,
            padding: '8px',
            border: '1px solid #e2e8f0',
            background: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '12px'
        },
        modal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        modalContent: {
            background: 'white',
            borderRadius: '24px',
            padding: '32px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
        },
        formGroup: {
            marginBottom: '20px'
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#0f172a',
            marginBottom: '8px'
        },
        input: {
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '14px'
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={styles.spinner}></div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
                    <FiChevronLeft /> Back to Dashboard
                </button>
                <div style={styles.headerTitle}>
                    <h1 style={styles.title}>Contacts</h1>
                    <p style={styles.subtitle}>Manage your contacts and meeting history</p>
                </div>
                <button style={styles.addButton} onClick={() => setShowAddModal(true)}>
                    <FiPlus /> Add Contact
                </button>
            </div>

            <div style={styles.content}>
                <div style={styles.searchBar}>
                    <div style={styles.searchInput}>
                        <FiSearch color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', outline: 'none', flex: 1 }}
                        />
                    </div>
                    <div style={styles.filterButtons}>
                        <button 
                            style={{...styles.filterButton, ...(filterType === 'all' && { background: '#006bff', color: 'white' })}}
                            onClick={() => setFilterType('all')}
                        >
                            All
                        </button>
                        <button 
                            style={{...styles.filterButton, ...(filterType === 'recent' && { background: '#006bff', color: 'white' })}}
                            onClick={() => setFilterType('recent')}
                        >
                            Recent
                        </button>
                        <button 
                            style={{...styles.filterButton, ...(filterType === 'frequent' && { background: '#006bff', color: 'white' })}}
                            onClick={() => setFilterType('frequent')}
                        >
                            Frequent
                        </button>
                    </div>
                </div>

                <div style={styles.contactsGrid}>
                    {filteredContacts.map(contact => (
                        <div key={contact.id} style={styles.contactCard}>
                            <div style={styles.contactHeader}>
                                <div style={{...styles.avatar, background: contact.color}}>
                                    {contact.avatar}
                                </div>
                                <div style={styles.contactInfo}>
                                    <div style={styles.contactName}>{contact.name}</div>
                                    <div style={styles.contactEmail}>
                                        <FiMail size={12} /> {contact.email}
                                    </div>
                                </div>
                            </div>
                            
                            <div style={styles.contactDetails}>
                                {contact.phone && (
                                    <div style={styles.detailRow}>
                                        <FiPhone size={12} /> {contact.phone}
                                    </div>
                                )}
                                {contact.company && (
                                    <div style={styles.detailRow}>
                                        <FiUsers size={12} /> {contact.company}
                                    </div>
                                )}
                                <div style={styles.detailRow}>
                                    <FiCalendar size={12} /> {contact.meetings} meetings
                                </div>
                                {contact.tags && contact.tags.length > 0 && (
                                    <div style={styles.tags}>
                                        {contact.tags.map(tag => (
                                            <span key={tag} style={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={styles.contactActions}>
                                <button style={styles.actionButton} onClick={() => {
                                    setEditingContact(contact);
                                    setFormData(contact);
                                    setShowAddModal(true);
                                }}>
                                    <FiEdit2 size={12} /> Edit
                                </button>
                                <button style={styles.actionButton} onClick={() => handleDeleteContact(contact.id)}>
                                    <FiTrash2 size={12} /> Delete
                                </button>
                                <button style={styles.actionButton}>
                                    <FiMessageSquare size={12} /> Message
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div style={styles.modal} onClick={() => {
                    setShowAddModal(false);
                    setEditingContact(null);
                    resetForm();
                }}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '24px' }}>
                            {editingContact ? 'Edit Contact' : 'Add New Contact'}
                        </h2>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name *</label>
                            <input
                                style={styles.input}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Full name"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email *</label>
                            <input
                                style={styles.input}
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="email@example.com"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone</label>
                            <input
                                style={styles.input}
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Company</label>
                            <input
                                style={styles.input}
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                placeholder="Company name"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tags</label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <input
                                    style={{...styles.input, flex: 1}}
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add tag"
                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                />
                                <button onClick={addTag} style={styles.addButton}>Add</button>
                            </div>
                            <div style={styles.tags}>
                                {formData.tags.map(tag => (
                                    <span key={tag} style={{...styles.tag, display: 'flex', alignItems: 'center', gap: '4px'}}>
                                        {tag}
                                        <FiX size={10} onClick={() => removeTag(tag)} style={{ cursor: 'pointer' }} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Notes</label>
                            <textarea
                                style={{...styles.input, minHeight: '80px'}}
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                placeholder="Additional notes..."
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button 
                                onClick={editingContact ? handleUpdateContact : handleAddContact}
                                style={{...styles.addButton, flex: 1}}
                            >
                                {editingContact ? 'Update' : 'Add'} Contact
                            </button>
                            <button 
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingContact(null);
                                    resetForm();
                                }}
                                style={{...styles.filterButton, flex: 1}}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}