const express = require('express');
const router = express.Router();
const Artwork = require('../models/artworkModel');
const Artist = require('../models/artistsModel');
const User = require('../models/usersModel');

/*
    *Like Functionality
*/
router.post('/like-artwork', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.body.artworkId);
        if (!artwork.likes.map(id => id.toString()).includes(req.session.userId.toString())) {
            artwork.likes.push(req.session.userId);
            await artwork.save();
            res.sendStatus(200);
        } else {
            res.status(400).json({ message: 'You have already liked this artwork.' });
        }
    } catch (err) {
        res.sendStatus(500);
    }
});


/*
    *Unlike Functionality
*/
router.post('/unlike-artwork', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.body.artworkId);
        const likeIndex = artwork.likes.map(id => id.toString()).indexOf(req.session.userId.toString());
        if (likeIndex !== -1) {
            artwork.likes.splice(likeIndex, 1);
            await artwork.save();
            res.sendStatus(200);
        } else {
            res.status(400).json({ message: 'You have not liked this artwork yet.' });
        }
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/add-review', async (req, res) => {
    try {
        console.log(req.session.userId);
        const artwork = await Artwork.findById(req.body.artworkId);
        const review = { user: req.session.userId, review: req.body.review };
        console.log('review:', review);
        artwork.reviews.push(review);
        await artwork.save();

        // Populate the user field in the reviews array
        const populatedArtwork = await Artwork.findById(artwork._id).populate('reviews.user');
        //console.log('Populated artwork:');
        //console.log(populatedArtwork);
        // Find the review in the populated artwork
        // Find the last review in the populated artwork
        const populatedReview = populatedArtwork.reviews[populatedArtwork.reviews.length - 1];

        //console.log('Populated review:');
        //console.log(populatedReview);
        res.json(populatedReview);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    *Delete Review Functionality
*/
router.post('/delete-review', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.body.artworkId);
        //console.log('artwork from delete review');
        //console.log(artwork);
        const artworkId = req.body.artworkId;
        const reviewId = req.body.reviewId;
        //console.log('Sending delete request for reviewId:', reviewId, 'and artworkId:', artworkId);
        //console.log('artwork.reviews:', artwork.reviews);
        const reviewIndex = artwork.reviews.findIndex(review => review._id.toString() === req.body.reviewId.toString() && review.user.toString() === req.session.userId.toString());
        //console.log('reviewIndex:', reviewIndex);
        if (reviewIndex !== -1) {
            artwork.reviews.splice(reviewIndex, 1);
            await artwork.save();
            res.sendStatus(200);
        } else {
            res.status(400).json({ message: 'You are not authorized to delete this review.' });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/edit-review', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.body.artworkId);
        const artworkId = req.body.artworkId;
        const reviewId = req.body.reviewId;
        const reviewIndex = artwork.reviews.findIndex(review => review._id.toString() === req.body.reviewId.toString() && review.user.toString() === req.session.userId.toString());
        if (reviewIndex !== -1) {
            artwork.reviews[reviewIndex].review = req.body.review;
            await artwork.save();
            res.sendStatus(200);
        } else {
            res.status(400).json({ message: 'You are not authorized to edit this review.' });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;