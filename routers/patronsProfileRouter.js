const express = require("express")
const router = express.Router();
const User = require('../models/usersModel');

router.get("/patron/home", async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId).populate('following');
        res.render('patronsProfilePage', { following: user.following, accountType: 'patron'});
    } catch (err) {
        next(err);
    }
});

module.exports = router;