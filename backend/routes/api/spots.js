const express = require('express');

const { Op } = require('sequelize');

const router = express.Router();
const {Spot} = require('../../db/models')


router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    return res.json(spots)
})










module.exports = router;
