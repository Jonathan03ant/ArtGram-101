const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const Artwork = require('../models/artworkModel'); 
const Artist = require('../models/artistsModel');

router.post('/add-artwork', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findById(req.session.userId);
        let artist = await Artist.findOne({ user: user._id });
        if (!artist) {
            artist = new Artist({ user: user._id });
            await artist.save();
        }
        const artwork = new Artwork(req.body);
        artwork.artist = artist._id;
        await artwork.save();
        artist.Artworks.push(artwork._id);
        await artist.save();
        user.accountType = 'artist';
        await user.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;