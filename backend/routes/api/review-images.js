const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
const {Spot, SpotImage, Review, User, ReviewImage, Booking} = require('../../db/models')


router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review,
            where: {
                userId: req.user.dataValues.id
            }
        }
    })

    if(image){
        await image.destroy()
        res.json({message: "Successfully deleted"})
    } else{
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    }

})









module.exports = router;
