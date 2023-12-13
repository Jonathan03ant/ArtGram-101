const express = require("express");
const router = express.Router();
const Artwork = require('../models/artworkModel');
const User = require('../models/usersModel');
const Notification = require('../models/notifModel');
const Artist = require('../models/artistsModel');

router.post('/notification', async (req, res) => {
    try {
        const artist = await Artist.findById(req.body.artistId).populate('notifications');
        res.render('artistsProfilePage', { artistId: artist._id });
        res.json(artist.notifications);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;