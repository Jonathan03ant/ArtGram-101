const express = require('express');
const router = express.Router();
const Artwork = require('../models/artworkModel');
const Artist = require('../models/artistsModel');
const User = require('../models/usersModel');

router.get('/public/artwork', async (req, res, next) => {
    try {
        const artworks = await Artwork.find({}).populate('artist');
        res.render('artworkPublicPage', { accountType:"Patron", artworks: artworks });
    } catch (err) {
        next(err);
    }
});




module.exports = router;