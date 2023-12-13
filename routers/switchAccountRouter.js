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

/*
    *Adding Workshop
*/

router.post('/add-workshop', async (req, res) => {
    // Get user ID and workshop title from request body
    const userId = req.body.userId;
    const title = req.body.title;

    try {
        // Find artist by user ID
        const artist = await Artist.findOne({ user: userId });

        // Create new workshop
        const workshop = {
            description: title,
            enrolled: []
        };

        // Add new workshop to artist's workshops array
        artist.workshops.push(workshop);

        // Save artist
        await artist.save();
        console.log("Artist saved With workshop");
        console.log(artist);

        // Send response
        res.status(200).json({ message: 'Workshop added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add workshop' });
    }
});

/*
    *Adding Artwork
*/

router.post('/add-more-artwork', async function(req, res) {
    const userId = req.body.userId;
    const artworkDetails = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send();
        }
        
        artworkDetails.artist = userId;
        console.log('Artworks User populated');


        const newArtwork = new Artwork(artworkDetails);
        await newArtwork.save();
        console.log("Artwork saved!");

        const artist = await Artist.findOne({ user: userId });
        if (!artist) {
            return res.status(404).send();
        }
        console.log("Artist found!");

        artist.Artworks.push(newArtwork._id);
        await artist.save();
        console.log("Artwork saved to artist's profile!");

        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});


module.exports = router;