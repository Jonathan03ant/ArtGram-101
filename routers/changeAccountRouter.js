const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const Artwork = require('../models/artworkModel'); 


router.post('/change-account', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (user.accountType === 'artist') {
            user.accountType = 'patron';
        } else if (user.accountType === 'patron') {
            const artworks = await Artwork.find({ artist: user._id });
            console.log(artworks);
            if (artworks.length > 0) {
                user.accountType = 'artist';
            } else {
                return res.status(400).json({ message: 'No artworks found for this user.' });
            }
        }
        await user.save();
        res.json(user); 
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;