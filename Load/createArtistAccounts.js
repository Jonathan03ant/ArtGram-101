const mongoose = require('mongoose');
const User = require ('../models/usersModel');
const artworksData = require('../public/gallery.json');
const Artist = require('../models/artistsModel');

mongoose.connect('mongodb://127.0.0.1/Open_Gallery');



/*
    *For each corresponding artist, we need to create an account
*/
async function createArtistAccounts() {
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
                /*
                    *Populate the Artists Schema at the same time
                */
                await artistUser.save();

                const artist = new Artist ({ user: artistUser._id});
                await artist.save();
            } catch (err) {
                console.error(`Error creating user for ${artworkData.Artist}: ${err}`);
                continue; 
            }
        }
    }
}
console.log("Artists account created");
createArtistAccounts();