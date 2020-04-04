getIndex = async (req, res, next) => {
    // Change the clubs to find the clubs from the database
    res.status(200).render('./leagues/index', {});
}

module.exports = {
    getIndex
}