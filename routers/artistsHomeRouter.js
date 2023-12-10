const express = require("express")
const router = express.Router();
const Artist = require('../models/artistsModel');

router.get("/artist/home", async (req, res, next) => {
    const artist = await Artist.findOne({ user: req.session.userId }).populate({ path: 'Artworks', populate: { path: 'artist' } }).populate('workshops');
    console.log(artist);
    res.render('artistsHomePage', {accountType: 'artist', artworks: artist.Artworks, workshops: artist.workshops});
});

module.exports = router;