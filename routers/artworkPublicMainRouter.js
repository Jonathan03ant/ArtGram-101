
const express = require("express");
const router = express.Router();
const Artwork = require('../models/artworkModel');
const User = require('../models/usersModel');

/*
    *Public (Artwork Public Main)
*/

router.get('/public/artwork/:id', async (req, res, next) => {
    try {
        const artwork = await Artwork.findById(req.params.id).populate('artist').populate('reviews.user');
        /*
            *Account type
        */

        const user = await User.findById(req.session.userId);
        let accountType;
        if (user.accountType === 'artist') {
            accountType = 'artist';
        } else if (user.accountType === 'patron') {
            accountType = 'patron';
        }
        res.render('artworkPublicMain', { artwork: artwork, accountType: accountType });
    } catch (err) {
        next(err);
    }
});

module.exports = router;