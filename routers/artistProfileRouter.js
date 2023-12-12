const express = require("express")
const router = express.Router();
const Artist = require('../models/artistsModel');
const User = require('../models/usersModel');

router.get("/artist/home", async (req, res, next) => {
    const artist = await Artist.findOne({ user: req.session.userId }).populate({ path: 'Artworks', populate: { path: 'artist' } }).populate('workshops');
    //console.log(artist);
    const user = await User.findById(req.session.userId);
    console.log(user);
    res.render('artistsProfilePage', {accountType: 'artist', artworks: artist.Artworks, workshops: artist.workshops, user: user});
});

module.exports = router;