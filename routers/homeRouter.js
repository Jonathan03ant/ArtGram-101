const express = require('express');
const router = express.Router();

router.get(['/', '/home'], (req, res, next) => {
    res.render('initialHomePage');
});

module.exports = router;
