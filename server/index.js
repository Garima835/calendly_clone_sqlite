require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');
const User = require('./models/User');
const EventType = require('./models/EventType');
const Booking = require('./models/Booking');

const authRoutes = require('./routes/auth');
const eventTypeRoutes = require('./routes/eventTypes');
const bookingRoutes = require('./routes/bookings');

const app = express(); // ✅ CREATE APP FIRST
app.post('/api/auth/register', (req, res) => {
    console.log('🔥 REGISTER ROUTE HIT');
    res.json({ success: true });
});

/* =====================================================
   ✅ CLEAN & WORKING CORS CONFIG
===================================================== */
app.use(cors({
    origin: ['https://calendlybackend.netlify.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ✅ HANDLE PREFLIGHT (VERY IMPORTANT)
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');

//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }

//     next();
// });

/* =====================================================
   ✅ BODY PARSER
===================================================== */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* =====================================================
   ✅ OPTIONAL LOGGING (DEBUG)
===================================================== */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

/* =====================================================
   ✅ ROUTES
===================================================== */
app.use('/api/auth', authRoutes);
app.use('/api/event-types', eventTypeRoutes);
app.use('/api/bookings', bookingRoutes);

/* =====================================================
   ✅ HEALTH CHECK
===================================================== */
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

/* =====================================================
   ✅ ERROR HANDLER
===================================================== */
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

/* =====================================================
   ✅ START SERVER
===================================================== */
const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to SQLite database');

        // Relations
        EventType.belongsTo(User, { foreignKey: 'userId' });
        User.hasMany(EventType, { foreignKey: 'userId' });
        Booking.belongsTo(EventType, { foreignKey: 'eventTypeId' });
        EventType.hasMany(Booking, { foreignKey: 'eventTypeId' });

        await sequelize.sync({ alter: true });
        console.log('✅ Database synced');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📍 Frontend should connect to http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Database error:', error.message);
        process.exit(1);
    }
}

start();