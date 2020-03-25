const teamsList = require("../../public/scripts/teams");
const Club = require('../../models/Club');

getIndexClub = async (req, res, next) => {
    const clubsNumber = await Club.countDocuments({})
    const newClubs = await Club.find({}).sort({ createdAt: -1 }).limit(4);
    res.render('./dashboard/clubs', { clubsNumber: clubsNumber, newClubs: newClubs });
}

getClubsCheck = (req, res, next) => {
    const check = req.params.check;
    res.render('./dashboard/clubs', {check: check, teamsList: teamsList});
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

module.exports = {
    getIndexClub,
    getClubsCheck,
    postCreateClub,
    getEditClub,
    postEditClub
}