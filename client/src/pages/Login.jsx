import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { showToast } from '../utils/toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            showToast('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            showToast(error.response?.data?.message || 'Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="auth-page">

            {/* Gradient Background */}
            <div className="auth-gradient"></div>

            <div className="auth-card">

                <div className="auth-header">
                    <FiCalendar className="auth-logo" />
                    <h1>Welcome back</h1>
                    <p>Log in to manage your scheduling</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary full" disabled={loading}>
                        {loading ? <span className="spinner"></span> : <>Log In <FiArrowRight /></>}
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
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
            font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto;
            background:#ffffff;
            position:relative;
            overflow:hidden;
        }

        /* GRADIENT (MATCH HOME PAGE) */
        .auth-gradient{
            position:absolute;
            right:-250px;
            top:-100px;
            width:800px;
            height:800px;
            background:radial-gradient(circle, #e0f2ff 0%, #ffffff 70%);
            z-index:0;
        }

        /* CARD */
        .auth-card{
            background:white;
            padding:40px;
            border-radius:20px;
            box-shadow:0 30px 80px rgba(0,0,0,0.15);
            width:100%;
            max-width:420px;
            position:relative;
            z-index:2;
        }

        /* HEADER */
        .auth-header{
            text-align:center;
            margin-bottom:30px;
        }

        .auth-logo{
            font-size:32px;
            color:#006bff;
            margin-bottom:10px;
        }

        .auth-header h1{
            font-size:28px;
            color:#0b3558;
            font-weight:700;
        }

        .auth-header p{
            color:#6b7280;
            font-size:14px;
        }

        /* FORM */
        .auth-form{
            display:flex;
            flex-direction:column;
            gap:20px;
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
            font-size:14px;
        }

        /* BUTTON */
        .btn-primary{
            background:#006bff;
            color:white;
            padding:12px;
            border:none;
            border-radius:10px;
            font-weight:600;
            cursor:pointer;
            display:flex;
            justify-content:center;
            align-items:center;
            gap:6px;
            transition:0.2s;
        }

        .btn-primary:hover{
            background:#0052cc;
        }

        .full{
            width:100%;
        }

        /* FOOTER */
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

        /* LOADER */
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

        /* RESPONSIVE */
        @media(max-width:768px){
            .auth-card{
                margin:20px;
                padding:30px;
            }
        }

        `}</style>
        </>
    );
}