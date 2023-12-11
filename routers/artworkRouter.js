const express = require("express");
const router = express.Router();
const Artwork = require('../models/artworkModel');
const User = require('../models/usersModel')
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
        res.render('artworkMain', { artwork: artwork, accountType: accountType });
    } catch (err) {
        next(err);
    }
});


module.exports = router;