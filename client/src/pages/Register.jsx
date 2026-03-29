import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiAtSign, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !username || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password, username);
            showToast('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            showToast(error.response?.data?.message || 'Registration failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="auth-page">

            {/* Gradient */}
            <div className="auth-gradient"></div>

            <div className="auth-card">

                <div className="auth-header">
                    <FiCalendar className="auth-logo" />
                    <h1>Create your account</h1>
                    <p>Start scheduling in minutes</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <FiUser className="input-icon" />
                            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <FiMail className="input-icon" />
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-wrapper">
                            <FiAtSign className="input-icon" />
                            <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="johndoe"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <FiLock className="input-icon" />
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Min 6 characters"/>
                        </div>
                    </div>

                    <button className="btn-primary full">
                        {loading ? <span className="spinner"></span> : <>Create Account <FiArrowRight /></>}
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>

            </div>
        </div>

        {/* 🔥 CSS */}
        <style>{`

        .auth-page{
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#fff;
            position:relative;
            overflow:hidden;
            font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto;
        }

        /* SAME GRADIENT AS HOME */
        .auth-gradient{
            position:absolute;
            right:-250px;
            top:-100px;
            width:900px;
            height:900px;
            background:radial-gradient(circle,#dbeafe 0%,#fff 70%);
        }

        /* CARD */
        .auth-card{
            background:white;
            padding:40px;
            border-radius:22px;
            width:100%;
            max-width:450px;
            box-shadow:0 40px 100px rgba(0,0,0,0.15);
            z-index:2;
        }

        .auth-header{
            text-align:center;
            margin-bottom:30px;
        }

        .auth-logo{
            font-size:32px;
            color:#006bff;
        }

        .auth-header h1{
            font-size:28px;
            color:#0b3558;
            margin-top:10px;
        }

        .auth-header p{
            font-size:14px;
            color:#6b7280;
        }

        .auth-form{
            display:flex;
            flex-direction:column;
            gap:18px;
        }

        .form-group label{
            font-size:14px;
            font-weight:500;
            color:#374151;
            margin-bottom:6px;
            display:block;
        }

        .input-wrapper{
            display:flex;
            align-items:center;
            border:1px solid #d1d5db;
            border-radius:10px;
            padding:10px 12px;
            transition:0.2s;
        }

        .input-wrapper:focus-within{
            border-color:#006bff;
            box-shadow:0 0 0 3px rgba(0,107,255,0.1);
        }

        .input-icon{
            color:#9ca3af;
            margin-right:8px;
        }

        input{
            border:none;
            outline:none;
            width:100%;
        }

        .btn-primary{
            background:#006bff;
            color:white;
            padding:12px;
            border:none;
            border-radius:10px;
            font-weight:600;
            display:flex;
            justify-content:center;
            align-items:center;
            gap:6px;
            cursor:pointer;
        }

        .btn-primary:hover{
            background:#0052cc;
        }

        .full{
            width:100%;
        }

        .auth-footer{
            text-align:center;
            margin-top:20px;
            font-size:14px;
            color:#6b7280;
        }

        .auth-footer a{
            color:#006bff;
            text-decoration:none;
            font-weight:500;
        }

        .spinner{
            width:18px;
            height:18px;
            border:2px solid white;
            border-top:2px solid transparent;
            border-radius:50%;
            animation:spin 1s linear infinite;
        }

        @keyframes spin{
            to{ transform:rotate(360deg); }
        }

        `}</style>
        </>
    );
}