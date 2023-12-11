const express = require("express");
const router = express.Router();
const Artwork = require('../models/artworkModel');
/*
    *When artist viewing its work
    *ArtworkMain (Artwork Main page)
*/
router.get('/artwork/:id', async (req, res, next) => {
    console.log(req.params.id);
    try {
        const artwork = await Artwork.findById(req.params.id)
            .populate('artist')
            .populate('reviews');
        console.log(artwork);
        res.render('artworkMain', { artwork: artwork });
    } catch (err) {
        next(err);
    }
});


module.exports = router;