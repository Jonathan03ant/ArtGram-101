const mongoose = require('mongoose');
const Artwork = require ('../models/artworkModel');
const User = require ('../models/usersModel');
const artworksData = require('../public/gallery.json');
const Artist =require('../models/artistsModel');

mongoose.connect('mongodb://127.0.0.1/Open_Gallery');



/*
    *For each corresponding artist, we need to create an account
*/
async function loadArtwork() {
    for (const artworkData of artworksData) {
        /*
            *Check if the artwork already exists
        */
        
        try{
            const artistUser = await User.findOne({ username: artworkData.Artist.replace(/ /g, '_') });
            const existingArtwork = await Artwork.findOne({ title: artworkData.Title, artist: artistUser._id });
            if (existingArtwork) {
                console.log(`Artwork already exists: ${artworkData.Title}`);
                continue;
            }

            /*
                Create the new artwork
            */
            const artwork = new Artwork({
                title: artworkData.Title,
                artist: artistUser._id,
                artistName: artworkData.Artist,
                year: artworkData.Year,
                category: artworkData.Category,
                medium: artworkData.Medium,
                description: artworkData.Description || "No description Provided",
                poster: artworkData.Poster,
            });

            await artwork.save();
            console.log(`Artwork Created for ${artworkData.Title}`);

            const artist = await Artist.findOne({ user: artistUser._id });
            if (artist) {
                artist.Artworks.push(artwork._id);
                await artist.save();
                console.log(`Artwork added to artist: ${artworkData.Artist}`);
            }
        } catch (err) {
            console.log(`Error creating artwork for ${artworkData.Title}: ${err}`);
        }
    }
}

console.log("Loaded Artworks!")
loadArtwork();


