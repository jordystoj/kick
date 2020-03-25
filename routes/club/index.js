const express = require('express');
const router = express.Router();

// This route is not protected

router.get("/admin", (req, res, next) => {
    const query = req.query.authorized;

    if(query == 'no'){
        res.render('./notauthorized')
    } else if (query == 'yes'){
        res.redirect('/clubs')
    }
})

module.exports = router;