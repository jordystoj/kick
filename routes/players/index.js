const express = require("express");
const router = express.Router();
const controller = require('../../controllers/players/playerController');

// router.get('/');

// Profile Page - GET
router.get('/:id', controller.getPlayerProfile);

module.exports = router;