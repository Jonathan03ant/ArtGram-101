/*
    *Importing important packages
*/
const mongoose = require('mongoose');
const session = require ('express-session');
const express = require('express');
const app = express();
const path = require('path')

/*
    *Models
*/
require('./models/artistsModel');
require('./models/artworkModel');
require('./models/usersModel');

/*
    *Importing Routers
*/

const homeRouter = require('./routers/homeRouter');
const createAccountRouter = require('./routers/createAccountRouter');
const loginRouter = require('./routers/loginRouter')
const artistsProfileRouter = require('./routers/artistProfileRouter');
const patronsProfileRouter = require('./routers/patronsProfileRouter')
//artworks
const artworkRouter = require('./routers/artworkRouter');
const artworkPublicMainRouter = require('./routers/artworkPublicMainRouter');
//Public Pages
const artworkPublicPage = require('./routers/artworkPublicPageRouter');
//change
const changeAccountRouter = require('./routers/changeAccountRouter');

const addArtworkRouter = require('./routers/addArtworkRouter');


/*
    *Setting important express setups
*/

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views', 'pages')); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
/*
    *Start the connection to the database
*/
mongoose.connect('mongodb://127.0.0.1/Open_Gallery');

/*
    *session related
*/

const gallerySession = require('connect-mongodb-session')(session);

const Open_Gallery = new gallerySession ({
    uri : 'mongodb://127.0.0.1/Open_Gallery',
    collection: 'SessionData'
})

/*
    *session middleware
*/
app.use(session({
    secret: "COMP@$)^TermPJ2406",
    resave: false,
    saveUninitialized: false,
    store: Open_Gallery,
    cookie: { maxAge: 60 * 60 * 1000}
}));

app.use(homeRouter);
app.use(createAccountRouter);
app.use(loginRouter);
/*
    Profiles
*/
app.use(artistsProfileRouter);
app.use(patronsProfileRouter);

app.use(artworkRouter);
app.use(artworkPublicMainRouter)
app.use(artworkPublicPage);
app.use(changeAccountRouter);
app.use(addArtworkRouter);

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});



