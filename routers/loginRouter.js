const express = require ('express')
const router = express.Router();
const User = require('../models/usersModel')

router.get('/login', (req, res, next) =>{
    res.render("login")
});

router.post('/login', async (req, res, next) =>{
    const { username, password } = req.body;
    /*
        *Find the user name from the Database
        *If it is not found, send error message
    */
    const user = await User.findOne({username: username});
    if (!user){
        return res.status(400).json({ message: "User does not exist"});
    }
    if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password"});
    }

    req.session.userId = user._id;
    /*
        *This is being sent back to client.js
    */
    res.json({ message: "success", username: username, accountType: user.accountType});

})

module.exports = router;