const express = require('express');
const router = express.Router();
const UserController = require('../controllers/master/UserController');

router.post('/login', async (req, res) => {
    try {
        const user = await UserController.login(req.headers, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});