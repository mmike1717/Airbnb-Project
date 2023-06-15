const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const {Spot, SpotImage, Review, User, ReviewImage, Booking} = require('../../db/models')



const createSpotChecker = (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const errors = {}

    if(!address) errors.address = 'Street address is required';
    if(!city)errors.city = 'City is required';
    if(!state) errors.state ='State is required';
    if(!country) errors.country ='Country is required';
    if(!lat) errors.lat ='Latitude is not valid';
    if(!lng) errors.lng ='Longitude is not valid';
    if(!name || name.length > 50) errors.name='Name must be less than 50 characters';
    if(!description) errors.description='Description is required';
    if(!price) errors.price ='Price per day is required';

    if(Object.keys(errors).length){
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors
        })
    }

    next()
};


const createReviewChecker = (req, res, next) => {
    const {review, stars} = req.body;

    const errors = {};

    if(!review) errors.review = "Review text is required";
    if(!stars || Number.isNaN(stars) || stars < 1 || stars > 6) errors.stars = "Stars must be an integer from 1 to 5";

    if(Object.keys(errors).length){
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors
        })
    }

    next()

}


router.get('/', async (req, res) => {

    const spots = await Spot.findAll({
        include: {
            model:Review,
            attributes: ['stars']
        }
    })

    const previews = await SpotImage.findAll()
    // const reviews = await Review.findAll()

    const allSpots = spots.map((spot) => {

        let totalStars = 0
        const avgRatingArr = spot.Reviews.map((review) => {
            totalStars += review.stars
        })
        let avgRating = avgRatingArr.length > 0 ? totalStars / avgRatingArr.length : null




        let previewImageObj = previews.find((preview) => {
            return preview.spotId === spot.id
        })

        const previewImage = previewImageObj ? previewImageObj.toJSON().preview ? previewImageObj.toJSON().url : null :null


        const spotObj = spot.toJSON()
        delete spotObj.Reviews

        return {
            ...spotObj,
            avgRating,
            previewImage
        }
    })

    res.json({
        spots: allSpots
    })

});


router.get('/current', async (req, res) => {
    const spots = await Spot.findAll({
        where: {
                ownerId: req.user.dataValues.id
                },
        include: {
            model: Review,
            attributes: ['stars']
        }

    })
    const previews = await SpotImage.findAll()

    const allSpots = spots.map((spot) => {

        let totalStars = 0
        const avgRatingArr = spot.Reviews.map((review) => {
            totalStars += review.stars
        })
        let avgRating = avgRatingArr.length > 0 ? totalStars / avgRatingArr.length : null



        let previewImageObj = previews.find((preview) => {
            return preview.spotId === spot.id
        })

        const previewImage = previewImageObj ? previewImageObj.toJSON().preview ? previewImageObj.toJSON().url : null :null

        const spotObj = spot.toJSON()
        delete spotObj.Reviews

        return {
            ...spotObj,
            avgRating,
            previewImage
        }
    })
    res.json({
        Spots: allSpots
    })

})


router.get('/:spotId/reviews', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if(spot){
        const Reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: ReviewImage, attributes: ['id', 'url']}]
        })

        res.json({Reviews})
    }
    else{
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
})


router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const allBookings = await Booking.findAll({
        where:{
            spotId: req.params.spotId
        },
        include: {model: User, attributes: ['id', 'firstName', 'lastName']}
    })

    if(allBookings.length === 0){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    } else {
        let Bookings = allBookings.map((bookings) => {
            let booking = bookings.toJSON()

            return booking.userId !== req.user.dataValues.id ? {spotId: booking.spotId, startDate: booking.startDate, endDate: booking.endDate} : booking

        })

        res.json({Bookings: Bookings})
    }

})


router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId
    const spot = await Spot.findByPk(id, {
        // include: [Review, {model:SpotImage, attributes: ['id','url', 'preview']}, {model: User, attributes: ['id', 'firstName', 'lastName']}]
    })

    if(spot){
        let reviews = await Review.findAll({
            where: {
                spotId: id
            }
        })

        let numReviews = reviews.length
        let totalStars = 0
        let starRating = reviews.map((review) => {
            totalStars += review.stars
        })
        let avgStarRating = totalStars / numReviews

        let SpotImages = await SpotImage.findAll({
            where: {
                spotId: id
            },
            attributes: ['id', 'url', 'preview']
        })


        let Owner = await User.findAll({
            where: {id: spot.ownerId},
            attributes: ['id', 'firstName', 'lastName']
        })

        res.json({...spot.toJSON(), numReviews, avgStarRating, SpotImages, Owner})
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
})



router.post('/', requireAuth, createSpotChecker, async (req,res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.create({
        ownerId: req.user.dataValues.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(spot)
})


router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId,{
        include: [Booking]
    })

    const { startDate, endDate } = req.body

    if(!spot){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    if(startDate >= endDate){
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {endDate: "endDate cannot be on or before startDate"}
        })
    }

    let errors = {}
    let bookings = spot.Bookings
    bookings.forEach((booking) => {
        let eachBooking = booking.toJSON()
        if(eachBooking.startDate <= startDate && eachBooking.endDate >= startDate){
            errors.startDate = "Start date conflicts with an existing booking"
        }
        if(eachBooking.startDate <= endDate && eachBooking.endDate >= endDate){
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
    else{
        const newBooking = await Booking.create({
            spotId: spot.id,
            userId: req.user.dataValues.id,
            startDate,
            endDate
        })

        res.json(newBooking)
    }

})



router.post('/:spotId/images', requireAuth, async (req, res) => {
    const user = req.user.dataValues.id
    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: SpotImage,

        }
    })

    let {url, preview} = req.body

    if(spot.ownerId === user){
        let addImage = await SpotImage.create({
            spotId: req.params.spotId,
            url,
            preview
        })


        res.json({
            id: addImage.id,
            url: addImage.url,
            preview: addImage.preview
        })
    } else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
})



router.post('/:spotId/reviews', requireAuth, createReviewChecker, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review,

        }
    })

    if(spot){

        let {review, stars} = req.body

        let allReviews = await Review.findAll()

        let reviewsMade = allReviews.find((review) => {
        return review.userId === req.user.dataValues.id && spot.id === review.spotId
        })

        if(reviewsMade){
            res.status(403)
            return res.json({
                message: "User already has a review for this spot"
            })
        }

        if(!reviewsMade){
            let newReview = await Review.create({
                spotId: spot.id,
                userId: req.user.dataValues.id,
                review,
                stars
            })

            res.json(newReview)
        }
    }
    else {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
})




router.put('/:spotId', requireAuth, createSpotChecker, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    const {address, city, state, country, lat, lng, name, description, price} = req.body

    if(!spot || spot.ownerId !== req.user.dataValues.id){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    if(spot && spot.ownerId === req.user.dataValues.id){
        let editSpot = await spot.set({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        await editSpot.save()

        res.json(editSpot)
    }
})



router.delete('/:spotId', requireAuth, async (req, res) => {
    const deleteSpot = await Spot.findByPk(req.params.spotId)

    if(!deleteSpot || deleteSpot.ownerId !== req.user.dataValues.id){
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    if( deleteSpot && deleteSpot.ownerId === req.user.dataValues.id){
        await deleteSpot.destroy()

        res.json({message: "Successfully deleted"})
    }
})


module.exports = router;
