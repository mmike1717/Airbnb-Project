const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
const {Spot, SpotImage, Review, User, ReviewImage} = require('../../db/models')



router.get('/current', requireAuth, async (req, res) => {
    const currUser = req.user.dataValues.id

    const Reviews = await Review.findAll({
        where: {
            userId: currUser
        },
        include: [
            {model:User,attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: {exclude: ['description','createdAt', 'updatedAt']}, include: {model: SpotImage}},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    })

    let previewImg = [];

    Reviews.forEach(eachReview => {
        eachReview = eachReview.toJSON()
        let spotImages = eachReview.Spot.SpotImages
        for(let eachImage of spotImages){
            if(eachImage.preview){
                eachReview.Spot.previewImage = eachImage.url
                break
            }

            eachReview.Spot.previewImage = null;
        }

        delete eachReview.Spot.SpotImages
        previewImg.push(eachReview)
    });
    res.json ({Reviews: previewImg});

})



router.post('/:reviewId/images', requireAuth, async (req, res) => {

})






module.exports = router;
