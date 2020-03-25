const ClubAdmin = require('../../models/ClubAdmin');
const Club = require('../../models/Club');
const User = require('../../models/User');


getIndexVerify = async (req, res, next) => {

    // Get the number of unverified club admins
    const clubAdmins = await ClubAdmin.countDocuments({ active: false })

    res.render('./dashboard/verify', { clubAdmins: clubAdmins });
}

getVerifyClubAdmin = async (req, res, next) => {

    const clubAdmin = await ClubAdmin.find({ active: false });
    let users = [];
    for(let i = 0; i < clubAdmin.length; i++){
        users.push(await User.findById(clubAdmin[i].userId));
    }

    res.render('./dashboard/verify/clubAdmin', { users: users, clubAdmin: clubAdmin })
}

postVerifyClubAdmin = async (req, res) => {
    // Get user id from body
    const userId = req.body.userId;

    // Update this club admin using userId to active true
    await ClubAdmin.updateOne({userId: userId}, {active: true}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.send('Success');
        }
    })
}


module.exports = {
    getIndexVerify,
    getVerifyClubAdmin,
    postVerifyClubAdmin
}