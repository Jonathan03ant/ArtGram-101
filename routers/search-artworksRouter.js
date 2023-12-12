const express = require('express');
const router = express.Router();
const Artwork = require('../models/artworkModel');
const User = require('../models/usersModel');

router.get('/search-artworks', async (req, res) => {
    // Get search query from request
    const query = req.query.query;

    // Search database for artworks that match the query
    const artworks = await Artwork.find({
        $or: [
            { title: new RegExp(query, 'i') },
            { artistName: new RegExp(query, 'i') },
            { category: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') },
            { medium: new RegExp(query, 'i') },
            { year: new RegExp(query, 'i')}
        ]
    });

    console.log("Matching artworks");
    // Send matching artworks in response
    res.json(artworks);
    //console.log(res.json(artworks));
});

module.exports = router;