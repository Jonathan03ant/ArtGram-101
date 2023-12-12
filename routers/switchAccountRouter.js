const express = require('express');
const router = express.Router();
const Artwork = require('../models/artworkModel');
const User = require('../models/usersModel');
const Artist = require('../models/artistsModel');

router.post('/change-account-pa', async (req, res) => {
    const userId = req.body.userId;

    const artworkCount = await Artwork.countDocuments({ artist: userId });

    if (artworkCount > 0) {
        console.log("User has more than one art work")
        await User.findByIdAndUpdate(userId, { accountType: 'artist' });
        res.sendStatus(200);
    } else {
        console.log("user doesnt have an artwork, he needs to add")
        res.sendStatus(400);
    }
});


router.post('/change-account-ap', async (req, res) => {
    const userId = req.body.userId;

    await User.findByIdAndUpdate(userId, { accountType: 'patron' });
    res.sendStatus(200);
});

router.post('/change-account-paw', async (req, res) =>  {
    const { userId, title, artistName, year, category, medium, description, poster} = req.body;
    const artwork = new Artwork({
        title,
        artist: userId,
        artistName,
        year,
        category,
        medium,
        description,
        poster
    });
    await artwork.save();

    /*
        *Create new artist
    */
    let artist = await Artist.findOne({user: userId});
    
    if (artist) {
        artist.Artworks.push(artwork._id);
    } else {
        artist = new Artist({user: userId, Artworks: [artwork._id]});
    }

    await artist.save();
    console.log("Artist created");
    console.log(artist);

    await User.findByIdAndUpdate(userId, { accountType: 'artist' });
    res.sendStatus(200);
    console.log("User updated");

});

module.exports = router;