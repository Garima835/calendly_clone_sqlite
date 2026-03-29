const express = require('express');
const { Op, fn, col } = require('sequelize');
const EventType = require('../models/EventType');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const eventTypes = await EventType.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        const eventTypeIds = eventTypes.map(et => et.id);
        let bookingCounts = [];
        if (eventTypeIds.length > 0) {
            bookingCounts = await Booking.findAll({
                where: {
                    eventTypeId: { [Op.in]: eventTypeIds },
                    status: { [Op.ne]: 'cancelled' }
                },
                attributes: ['eventTypeId', [fn('COUNT', '*'), 'count']],
                group: ['eventTypeId'],
                raw: true
            });
        }
        const countMap = {};
        bookingCounts.forEach(bc => { countMap[bc.eventTypeId] = parseInt(bc.count); });
        const result = eventTypes.map(et => ({
            ...et.toJSON(),
            bookingCount: countMap[et.id] || 0
        }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const eventType = await EventType.findOne({
            where: { id: req.params.id, isActive: true },
            include: [{ model: User, attributes: ['id', 'name', 'username'] }]
        });
        if (!eventType) return res.status(404).json({ message: 'Event type not found' });
        res.json(eventType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const eventTypes = await EventType.findAll({
            where: { userId: user.id, isActive: true },
            order: [['createdAt', 'DESC']]
        });
        res.json({ user: { name: user.name, username: user.username }, eventTypes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { title, description, duration, location, color, availableDays, startTime, endTime } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });
        const eventType = await EventType.create({
            userId: req.user.id, title, description: description || '',
            duration: duration || 30, location: location || 'Online Meeting',
            color: color || '#0D9488', availableDays: availableDays || [1, 2, 3, 4, 5],
            startTime: startTime || '09:00', endTime: endTime || '17:00'
        });
        res.status(201).json(eventType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const eventType = await EventType.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!eventType) return res.status(404).json({ message: 'Event type not found' });
        ['title', 'description', 'duration', 'location', 'color', 'availableDays', 'startTime', 'endTime', 'isActive'].forEach(f => {
            if (req.body[f] !== undefined) eventType[f] = req.body[f];
        });
        await eventType.save();
        res.json(eventType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const eventType = await EventType.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!eventType) return res.status(404).json({ message: 'Event type not found' });
        await Booking.destroy({ where: { eventTypeId: eventType.id } });
        await eventType.destroy();
        res.json({ message: 'Event type deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;