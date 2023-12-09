const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    workshops: [{
        description: { type: String, required: true },
        enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    }]
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;