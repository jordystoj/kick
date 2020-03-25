const express = require('express');
const router = express.Router();
const controller = require('../../controllers/clubAdminDashboard/indexController');

// This is the dashboard for club admins

router.get("/dashboard", controller.getIndexPage)

module.exports = router;