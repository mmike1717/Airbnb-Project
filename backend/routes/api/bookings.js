const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
const {Spot, SpotImage, Review, User, ReviewImage, Booking} = require('../../db/models')


const editingBookingChecker = (req, res, next) => {
    const {startDate, endDate} = req.body;

    const errors = {};

    if(!startDate) errors.review = " Start date is required";
    if(!endDate) errors.stars = "End date is required";

    if(Object.keys(errors).length){
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors
        })
    }

    next()
}


router.get('/current', requireAuth, async (req, res) => {
    const allBookings = await Booking.findAll({
        where: {
            userId: req.user.dataValues.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: [SpotImage]
        }
    })

    let previewImg = [];

    allBookings.forEach((eachBooking) => {
        eachBooking = eachBooking.toJSON()
        let spotImages = eachBooking.Spot.SpotImages
        for(let eachImage of spotImages){
            if(eachImage.preview){
                eachBooking.Spot.previewImage = eachImage.url
                break
            }

            eachBooking.Spot.previewImage = null;
        }
        delete eachBooking.Spot.SpotImages
        previewImg.push(eachBooking)
    })



    res.json({Bookings: previewImg})
})



router.delete('/:bookingId', requireAuth, async (req, res) => {
    const deleteBooking = await Booking.findByPk(req.params.bookingId, {
        include: [Spot]
    })
    let currUser = req.user.dataValues.id

    if(!deleteBooking || deleteBooking.userId !== currUser){
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }
    let usersStartDate = new Date(deleteBooking.startDate)
    let usersEndDate = new Date(deleteBooking.endDate)
    let today = new Date()

    if(usersStartDate <= today || usersEndDate >= today){
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    if(deleteBooking.userId === currUser || currUser === deleteBooking.Spot.ownerId){
        await deleteBooking.destroy()
        res.json({"message": "Successfully deleted"})
    }
})



router.put('/:bookingId', requireAuth, editingBookingChecker, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        },
        include: [Booking]
    })

    const currUser = req.user.dataValues.id
    const {startDate, endDate} = req.body


    if(startDate > endDate){
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {endDate: "endDate cannot come before startDate"}
        })
    }

    let errors = {}
    let bookings = spot.Bookings
    bookings.forEach((booking) => {
        let eachBooking = booking.toJSON()
        if(eachBooking.startDate <= startDate || eachBooking.endDate >= startDate || booking.userId !== currUser){
            errors.startDate = "Start date conflicts with an existing booking"
        }
        if(eachBooking.startDate <= endDate || eachBooking.endDate >= endDate || booking.userId !== currUser){
            errors.endDate = "End date conflicts with an existing booking"
        }
    })

    if(Object.keys(errors).length){
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors
        })
    }

    let usersStartDate = new Date(startDate)
    let usersEndDate = new Date(endDate)
    let today = new Date()

    if(today >= usersEndDate || today > usersStartDate){
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })

    }

    if(booking && booking.userId === currUser){
        const editBooking = await booking.set({
            startDate,
            endDate
        })

        await editBooking.save()

        res.json(editBooking)
    }

    res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })

})



module.exports = router;
