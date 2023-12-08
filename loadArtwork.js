const mongoose = require('mongoose');
const User = require ('./models/usersModel');
const Artwork = require ('./models/artworkModel');
const artworksData = require('./public/gallery.json');

mongoose.connect('mongodb://127.0.0.1/Open_Gallery');



/*
    *For each corresponding artist, we need to create an account
*/
async function loadArtwork() {
    for (const artworkData of artworksData) {
    /*
        *Check if the user exists (prevents duplicate accounts)
        *If it doesnt exist, create new User
    */
    const username = artworkData.Artist.replace(/ /g, '_');
    let artistUser = await User.findOne({ username: username });
    if (!artistUser) {
        const nameParts = artworkData.Artist.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        artistUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: '0000',
        accountType: 'artist',
        });
        try {
            await artistUser.save();
        } catch (err) {
            console.error(`Error creating user for ${artworkData.Artist}: ${err}`);
            continue; 
        }
    }

    /*
        *Create or Load the ArtWork
    */

    const artwork = new Artwork({
        title: artworkData.Title,
        artist: artistUser._id,
        year: artworkData.Year,
        category: artworkData.Category,
        medium: artworkData.Medium,
        description: artworkData.Description || "No description Provided",
        poster: artworkData.Poster,
    });
    artwork.save()
        .then(() => console.log(`Artwork Created for ${artworkData.Title}`))
        .catch (err => console.log(`Error creating artwork for ${artworkData.Title}: ${err}`));
    }
}
loadArtwork();


  