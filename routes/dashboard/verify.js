const express = require('express');
const router = express.Router();
const controller = require('../../controllers/dashboard/verifyController');

router.get('/verify', controller.getIndexVerify);

router.get('/verify/clubadmin', controller.getVerifyClubAdmin);

router.post('/verify/clubadmin', controller.postVerifyClubAdmin);

module.exports = router;