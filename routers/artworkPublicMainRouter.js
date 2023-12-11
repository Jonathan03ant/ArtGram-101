
const express = require("express");
const router = express.Router();
const Artwork = require('../models/artworkModel');
/*
    *Public (Artwork Public Main)
*/

router.get('/public/artwork/:id', async (req, res, next) => {
    try {
        const artwork = await Artwork.findById(req.params.id).populate('artist').populate('reviews.user');
        res.render('artworkPublicMain', { artwork: artwork });
    } catch (err) {
        next(err);
    }
});

module.exports = router;