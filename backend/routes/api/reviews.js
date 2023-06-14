const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
const {Spot, SpotImage, Review, User, ReviewImage} = require('../../db/models')


const addImageChecker = (req, res, next) => {
    let errors = {}

    const {url} = req.body

    if(!url) errors.url = "Image not added"

    if(Object.keys(errors).length){
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors
        })
    }

    next()
}


const editReviewChecker = (req, res, next) => {
    let errors = {}

    const {review, stars} = req.body

    if(!review) errors.review = "Review text is required";
    if(!stars || stars < 1 || stars > 6) errors.stars = "Stars must be an integer from 1 to 5"

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



router.post('/:reviewId/images', requireAuth, addImageChecker, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId, {
        include:[ReviewImage]

    })
    if(!review || review.userId !== req.user.dataValues.id){
        res.status(403)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    if(review.ReviewImages.length > 11){
        res.status(404)
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    else if (review && review.userId === req.user.dataValues.id){
        const {url} = req.body;
        const newImage = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url
        })

        res.json({id: newImage.id, url: newImage.url})
    }

})



router.put('/:reviewId', requireAuth, editReviewChecker, async(req, res) => {
    const editReview = await Review.findByPk(req.params.reviewId)
    const {review, stars} = req.body

    if(editReview && editReview.userId === req.user.dataValues.id){
        const editingRev = await editReview.set({
            spotId: editReview.spotId,
            userId: req.user.dataValues.id,
            review,
            stars
        })

        await editingRev.save()

        res.json( editingRev)

    } else{
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

})



router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewDeleting = await Review.findByPk(req.params.reviewId)

    if(reviewDeleting && reviewDeleting.userId === req.user.dataValues.id){
        await reviewDeleting.destroy()
        res.json({message: "Successfully deleted"})

    } else {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }
})







module.exports = router;
