const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');

/*
    *Get route handler for the /createaccount end point
*/
router.get('/createaccount', (req, res, next) =>{
    res.render('createAccount')
});


/*
    *Router handler
    *New User is always a patron
*/
router.post('/createaccount', (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    const newUser = new User ({
        firstName,
        lastName,
        username,
        password,
        accountType: 'patron'
    });

    newUser.save() 
        .then(() => res.send("User Created!"))
        .catch( err => {
            console.error(err);
            res.status(500).send("Error creating user")
        });
});

module.exports = router;