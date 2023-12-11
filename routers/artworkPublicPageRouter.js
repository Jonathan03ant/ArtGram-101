const express = require('express');
const router = express.Router();
const Artwork = require('../models/artworkModel');
const Artist = require('../models/artistsModel');
const User = require('../models/usersModel');

router.get('/public/artwork', async (req, res, next) => {
    try {
        const artworks = await Artwork.find({}).populate('artist').lean();
        console.log(artworks);
        const user = await User.findById(req.session.userId);
        let accountType;
        if (user.accountType === 'artist') {
            accountType = 'artist';
        } else if (user.accountType === 'patron') {
            accountType = 'patron';
        }
        console.log('Account type:', accountType);
        res.render('artworkPublicPage', {accountType: accountType, artworks: artworks });
    } catch (err) {
        next(err);
    }
});




module.exports = router;