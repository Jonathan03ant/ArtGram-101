const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema ({
    title: {type: String, required: true},
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    year: {type: String, required: true},
    category: {type: String, required: true},
    medium: {type: String, required: true},
    description: {type: String, required: true},
    poster: {type: String, required: true},
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;