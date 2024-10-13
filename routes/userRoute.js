const express = require('express');
const router = express.Router();
const UserController = require('../controllers/master/UserController');
const logService = require('../utils/logsUtils')

router.post('/auth/login', async (req, res) => {
    try {
        const user = await UserController.login(req.headers, req.body);
        res.status(200).json(user);
    } catch (error) {
        logService.apiErrorLogsSendTelegram('/auth/login',500, error.message)
        res.status(500).json({ message: error.message });
    }
});


module.exports = router; 