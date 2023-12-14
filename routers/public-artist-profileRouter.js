const express = require('express');
const router = express.Router();
const Artwork = require('../models/artworkModel');
const User = require('../models/usersModel');
const Artist = require('../models/artistsModel');


router.get('/public/artist/:id', async function(req, res) {
    // Get the artist ID from the request parameters
    const userId= req.params.id;
    console.log("userId", userId);

    // Find the artist with the given ID and populate their Artworks and workshops fields
    console.log("Finding Artist");
    const artist = await Artist.findOne({user: userId}).populate('Artworks').populate('workshops');
    //console.log(artist);

    console.log("Finding User");
    console.log("userId", userId);
    const user = await User.findById(userId);
    console.log(user);

    if (user.accountType === 'artist') {
        accountType = 'artist';
    } else if (user.accountType === 'patron') {
        accountType = 'patron';
    }

    console.log("accountType PUbCLI ID", accountType)
    // Render the artistPublicPage.pug template with the artist data
    res.render('artistPublicPage', { artist: artist, user: user, accountType: accountType });
});


// Follow artist endpoint
router.post('/follow-artist', async function(req, res) {
    const userId = req.session.userId;
    const artistId = req.body.artistId;

    const user = await User.findById(userId);
    const artist = await Artist.findById(artistId);

    // Check if the user is already following the artist
    if (user.following.map(id => id.toString()).includes(artistId)) {
        res.status(400).json({ message: 'You are already following this artist' });
    } else {
        user.following.push(artist);
        artist.followers.push(user);
        await user.save();
        await artist.save();
        res.sendStatus(200);
    }
});

// Unfollow artist endpoint
router.post('/unfollow-artist', async function(req, res) {
    const userId = req.session.userId;
    const artistId = req.body.artistId;

    const user = await User.findById(userId);
    const artist = await Artist.findById(artistId);

    const followIndex = user.following.map(id => id.toString()).indexOf(artistId);

    // Check if the user is following the artist
    if (followIndex !== -1) {
        user.following.splice(followIndex, 1);
        artist.followers = artist.followers.filter(id => id.toString() !== userId);
        await user.save();
        await artist.save();
        res.sendStatus(200);
    } else {
        res.status(400).json({ message: 'You are not following this artist.' });
    }
});



module.exports = router;