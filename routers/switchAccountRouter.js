const express = require('express');
const router = express.Router();

router.get('/change-account', (req, res) => {
    const user = req.session.user;
});