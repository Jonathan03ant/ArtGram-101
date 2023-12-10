const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    *Artworks have the pre-defined keys and
    *An array of likes-->referencing to users
    *An array of reviews where
        *A review is associated with a user
        *And a string of review
*/
const artworkSchema = new Schema ({
    title: {type: String, required: true},
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    artistName: {type: String, required: true},
    year: {type: String, required: true},
    category: {type: String, required: true},
    medium: {type: String, required: true},
    description: {type: String, required: true},
    poster: {type: String, required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    reviews: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        review: String
    }]
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;