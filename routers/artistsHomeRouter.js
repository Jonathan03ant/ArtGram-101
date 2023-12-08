const express = require("express")
const router = express.Router();

router.get("/artist/home", (req, res, next) => {
    res.render('artistsHomePage', {accountType: 'artist'});
});

module.exports = router;