const express = require('express');

const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
const {Spot, SpotImage, Review, User} = require('../../db/models')


// const validatePost = [
//     check('address')
//     .exists({ checkFalsy: true })
//     .withMessage('Street address is required'),
//     check('city')
//     .exists({ checkFalsy: true })
//     .withMessage('City is required'),
//     check('state')
//     .exists({ checkFalsy: true })
//     .withMessage('State is required'),
//     check('country')
//     .exists({ checkFalsy: true })
//     .withMessage('Country is required'),
//     check('lat')
//     .exists({ checkFalsy: true })
//     .withMessage('Latitude is not valid'),
//     check('lng')
//     .exists({ checkFalsy: true })
//     .withMessage('Longitude is not valid'),
//     check('name')
//     .exists({ checkFalsy: true })
//     .withMessage('Name must be less than 50 characters'),
//     check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Description is required'),
//     check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Price per day is required'),
//     handleValidationErrors
// ];



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
    const userId = req.user.dataValues.id
    const spots = await Spot.findAll({
        where: {
                ownerId: userId
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



router.post('/', async (req,res) => {

})







module.exports = router;
