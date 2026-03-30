import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventTypes from './pages/EventTypes';
import CreateEventType from './pages/CreateEventType';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Availability from './pages/Availability';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/book/:id" element={<BookingPage />} />
                            <Route path="/u/:username" element={<UserProfile />} />
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/event-types" element={<ProtectedRoute><EventTypes /></ProtectedRoute>} />
                            <Route path="/event-types/new" element={<ProtectedRoute><CreateEventType /></ProtectedRoute>} />
                            <Route path="/event-types/:id/edit" element={<ProtectedRoute><CreateEventType /></ProtectedRoute>} />
                            <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                            <Route path="/availability" element={<Availability />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;