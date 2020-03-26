const teamsList = require("../../public/scripts/teams");
const Club = require('../../models/Club');

getIndexClub = async (req, res, next) => {
    const clubsNumber = await Club.countDocuments({})
    const newClubs = await Club.find({}).sort({ createdAt: -1 }).limit(4);
    res.render('./dashboard/clubs', { clubsNumber: clubsNumber, newClubs: newClubs });
}

getClubsCheck = async (req, res, next) => {
    const check = req.params.check;
    const clubs = await Club.find({}).sort({"clubName": -1});
    const results = res.paginatedResults;
    res.render('./dashboard/clubs', {check: check, teamsList: teamsList, clubs: clubs, results: results});
}

// Middleware pagination
paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if(endIndex < await model.countDocuments().exec()){
            results.next = {
                page: page+1,
                limit: limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page-1,
                limit: limit
            }
        }

        try {
            results.result = await model.find().sort({"clubName": 1}).limit(limit).skip(startIndex).exec();
        } catch (e){
            console.log(e);
        }

        res.paginatedResults = results;

        next();
    }
}

postCreateClub = (req, res, next) => {
    //Get all the data from the form
    var clubName = req.body.clubName;
    var homeGround = req.body.homeGround;
    var stadiumCapacity = req.body.stadiumCapacity;
    var logo = req.body.logo;
    var primaryColor = req.body.primaryColor;
    var secondaryColor = req.body.secondaryColor;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var contactName = req.body.contactName;
    var officeAddress = req.body.officeAddress;

    //build the new club object
    var newClub = {
        clubName: clubName,
        venueName: homeGround,
        venueCapacity: stadiumCapacity,
        logo: logo,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        email: email,
        phoneNumber: phoneNumber,
        contactName: contactName,
        officeAddress: officeAddress
    };
    //Create a new club and save to DB
    Club.create(newClub, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect to index page
            res.redirect("/dashboard/clubs");
        }
    });
}

getEditClub = async (req, res, next) => {
    const club = await Club.findById(req.params.id)
    res.render('./dashboard/clubsEdit', { club: club });
}

postEditClub = async (req, res, next) => {
    const updateQuery = { _id: req.params.id };

    const updateData = {
            clubName: req.body.clubName,
            venueName: req.body.homeGround,
            venueCapacity: req.body.stadiumCapacity,
            logo: req.body.logo,
            primaryColor: req.body.primaryColor,
            secondaryColor: req.body.secondaryColor,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            contactName: req.body.contactName,
            officeAddress: req.body.officeAddress
    }

    Club.updateOne(updateQuery, updateData, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/dashboard/clubs/edit');
    })
}

getAllClubs = async (req, res) => {
    const clubs = await Club.find({}).sort({'clubName': -1});
    res.render('./dashboard/allClubs', {clubs: clubs});
}

module.exports = {
    getIndexClub,
    getClubsCheck,
    postCreateClub,
    getEditClub,
    postEditClub,
    paginatedResults
}