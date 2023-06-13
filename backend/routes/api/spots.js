const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const {Spot, SpotImage, Review, User} = require('../../db/models')



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



router.get('/', async (req, res) => {

    const spots = await Spot.findAll({
        include: {
            model: Review,
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
        previewImageObj = previewImageObj.toJSON()
        const previewImage = previewImageObj.preview ? previewImageObj.url : null;

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
        previewImageObj = previewImageObj.toJSON()
        const previewImage = previewImageObj.preview ? previewImageObj.url : null;

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



router.post('/', createSpotChecker, async (req,res) => {
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







module.exports = router;
