const express = require('express');
const router = express.Router();

router.get('/clubadmin', (req, res, next) => {
    res.render('./info/clubAdmin');
})

module.exports = router;