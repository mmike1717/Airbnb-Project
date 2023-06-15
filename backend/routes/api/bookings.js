const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
const {Spot, SpotImage, Review, User, ReviewImage, Booking} = require('../../db/models')


router.get('/current', requireAuth, async (req, res) => {
    const allBookings = await Booking.findAll({
        where: {
            userId: req.user.dataValues.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }
    })

    res.json({Bookings: allBookings})
})






module.exports = router;
