const express = require('express');

const { Op } = require('sequelize');

const router = express.Router();
const {Spot, SpotImage, Review} = require('../../db/models')


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

})









module.exports = router;
