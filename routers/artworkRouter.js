const express = require("express");
const router = express.Router();
const Artwork = require('../models/artworkModel');

router.get('/artwork/:id', async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new Error('Invalid ObjectId'));
    }

    const artwork = await Artwork.findById(req.params.id).populate('artist');
    res.render('artworkDetail', { artwork: artwork });
});

module.exports = router;