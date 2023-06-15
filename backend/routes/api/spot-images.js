const express = require('express');

const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
const {Spot, SpotImage} = require('../../db/models')


router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot,
            where: {
                ownerId: req.user.dataValues.id
            }
        }
    })

    if(image){
        await image.destroy()
        res.json({message: "Successfully deleted"})
    } else{
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }

    res.json(image)
})







module.exports = router;
