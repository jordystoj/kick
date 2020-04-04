const express = require("express");
const router = express.Router();
const controller = require('../../controllers/dashboard/inboxController');

router.get('/inbox', controller.getInbox);

router.post('/inbox/complete', controller.messageComplete);

module.exports = router;