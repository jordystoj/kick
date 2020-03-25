const express = require("express");
const router = express.Router();
const controller = require('../../controllers/dashboard/playerController');


// Player route 
router.get('/players', controller.getPlayersRoute);

// Player route (edit or add) // Send in the id into this route of the players team
router.get('/players/:check', controller.checkPlayersGet);

// Add Player post route
router.post('/players/add', controller.addPlayersPost);

router.post("/editplayer", controller.editPlayersPost)

module.exports = router;